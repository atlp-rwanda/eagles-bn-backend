import { paymentRequest } from "../helpers/payment";

class Payment {
  static async pay(req, res) {
    try {
      const response = await paymentRequest(1000, "http://localhost:4000/api/payment/response", "Alain", "0785253349", "alainmucyo3@gmail.com");
      return res.send({ response });
    } catch (e) {
      console.log("Error:", e);
    }
  }
}

export default Payment;
