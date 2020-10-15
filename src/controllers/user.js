import { User as _user } from "../database/models/index"
import userValidation from "../validators/user"
import { signToken } from '../helpers';
import bcrypt from 'bcrypt'

export default class UserController{

static async userSignUp(req,res,next)
{
    const auth = userValidation(req.body);
    if (auth.error){
      res.send({error:auth.error.details[0].message});
   }
   let { first_name,last_name,email,password,confirmPassword } = auth.value;

   let foundUser = await _user.findOne({where: { email:email }});
   if (foundUser) { 
     return res.status(403).json({ error: 'Email is already in use'});
   }
   else
    {
      try 
      {
            const user= await _user.create({
                first_name:first_name,
                last_name:last_name,
                email: email,
               password: bcrypt.hashSync(password, 8)
            })
           // res.status(200).json(signToken(user))
             res.status(201).send({ data: user })  
    }
    catch (err) 
      {
        res.status(500).send({ error: err });
      }
    }
}


}