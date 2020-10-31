export const NewError = (res, status, message) => res.status(status).send({ message });
