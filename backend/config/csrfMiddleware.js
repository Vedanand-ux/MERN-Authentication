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

  }catch(err){
    console.error('CSRF verification error:', err);
  }
};