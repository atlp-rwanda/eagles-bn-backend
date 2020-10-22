import userAuthentication from "../validators/user"

export default class UserValidation{

    static userAuth(req,res,next){
        const auth = userAuthentication(req.body);
        if (auth.error){
          res.send({error:auth.error.details[0].message});
       }
     next();
    }

}