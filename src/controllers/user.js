import { User as _user } from "../database/models/index"
import { signToken } from '../helpers/auth'
import bcrypt from 'bcrypt'


export default class UserController{

static async userSignUp(req,res,next)
{


  let { first_name,last_name,email,password} = req.body;
  let foundUser = await _user.findOne({where: { email:email }});
  if (foundUser) { 
    return res.status(403).json({ error: 'Email is already in use'});
   }
   else
    {
      try {
        const user= await _user.create({
          first_name:first_name,
          last_name:last_name,
          email: email,
          password: bcrypt.hashSync(password, 8)
        })
       const tokObj={
         id:user.id,
         name:user.first_name,
         email:user.email,
       }
   
       const token = signToken(tokObj);
       res.status(201).json(signToken(tokObj));
      }
      catch (err) 
      {
        res.status(500).send({ error: err });
      }
    }
}


}