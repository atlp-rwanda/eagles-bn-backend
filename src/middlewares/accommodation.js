/* eslint-disable linebreak-style */
import accommodationValidation from '../validators/accomodation';

const accommodationValidator = (req, res, next) => {
  const auth = accommodationValidation(req.body);

  if (auth.error) {
    return res.status(400).json({ error: auth.error.details[0].message });
  }
  next();
};

export default accommodationValidator;
