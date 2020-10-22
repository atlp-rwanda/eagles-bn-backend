// import  config from 'dotenv';
// import  sign  from 'jsonwebtoken';

// config();
// const { JWT_SECRET } = process.env;

// export const signToken = ({ name, email, id: userId }, secret = JWT_SECRET, duration = null) => {
//     const tokenOptions = duration ? { expiresIn: duration } : undefined;
//     const token = sign({ name, email, userId }, secret, tokenOptions);
//     return token;
// };