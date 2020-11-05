import { onError } from "./response";

export default (fun) => (req, res, next) => {
  Promise.resolve(fun(req, res, next)).catch((err) => {
    console.log(err);
    return onError(res, 500, err);
  });
};
