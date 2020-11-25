import superagent from "superagent";

export const paymentRequest = async (amount, redirect_url, customername, customerphone, customeremail, tx_ref) => {
  const { body } = await superagent.post("https://api.flutterwave.com/v3/payments")
    .send({
      tx_ref,
      amount,
      currency: "RWF",
      redirect_url,
      payment_options: "card",
      customer: {
        email: customeremail,
        phonenumber: customerphone,
        name: customername
      },
      customizations: {
        title: "Barefoot Nomad",
        description: "Paying booking"
      }
    })
    .set('Authorization', `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`);

  return body;
};
