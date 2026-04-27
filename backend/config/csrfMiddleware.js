import crypto from 'crypto';
import { redisClient } from '../index.js';


export const generateCSRFToken = async(userId, res) => {
  const csrfToken = crypto.randomBytes(32).toString('hex');

  const csrfKey = `csrf_${userId}`;

  await redisClient.set(csrfKey,3600,csrfToken);

  res.cookie('csrfToken',csrfToken,{
    httpOnly: false,
    secure: true,
    sameSite: 'none',
    maxAge: 3600 * 1000
  });


  return csrfToken;
};

export const verifyCSRFToken = async(req, res, next) => {
  try{
    if(req.method === 'GET'){
      return next();
    }

    const userId = req.user?._id;

    if(!userId){
      return res.status(401).json({ message: 'User not Authenticated' });
    }

    const clientToken = 
    req.headers['x-csrf-token'] || 
    req.headers['x-xsrf-token'] ||
    req.headers['csrf-token'];
    
    if(!clientToken){
      return res.status(403).json({ 
        message: 'CSRF token missing. please refresh the page', 
        code: "CSRF_TOKEN_MISSING",
      });
    }

    const csrfKey = `csrf_${userId}`;
    const storedToken = await redisClient.get(csrfKey);

    if(!storedToken){
      return res.status(403).json({ 
        message: 'CSRF token expired. please try again', 
        code: "CSRF_TOKEN_EXPIRED",
      });
    }

    if(storedToken !== clientToken){
      return res.status(403).json({ 
        message: 'Invalid CSRF token. please refresh the page', 
        code: "CSRF_TOKEN_INVALID",
      });
    }

    next();

  }catch(err){
    console.log("CSRF verification error:", err);
    return res.status(500).json({ 
        message: 'CSRF VERFICATION FAILED. please try again', 
        code: "CSRF_VERIFICATION_ERROR",
      });
  }
};


export const revokeCSRFTOKEN = async(userId) => {
  const csrfKey = `csrf_${userId}`;
  await redisClient.del(csrfKey);
};

export const refreshCSRFTOKEN = async(userId, res) => {
  await revokeCSRFTOKEN(userId);
  return await generateCSRFToken(userId, res);
};