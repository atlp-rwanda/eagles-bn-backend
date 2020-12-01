import fetch from 'node-fetch';
import { signToken2 } from './auth';

const { PAYMENT_URL, PAYMENT_SECRET_KEY, BASE_URL, PORT } = process.env;

export default async (customer, booking_data, amount="1500") => {
  const token = signToken2(booking_data);
  const body = {
    amount,
    customer,
    currency: "RWF",
    tx_ref: Date.now(),
    payment_options: "card",
    redirect_url: `${BASE_URL}:${PORT}/api/rooms/${booking_data.room_id}/booking?token=${token}`,
  };
  const res = await fetch(PAYMENT_URL, {
    method: 'post',
    body: JSON.stringify(body),
    headers: {'Content-Type': 'application/json', authorization: `Bearer ${PAYMENT_SECRET_KEY}`},
  });
  const data = await res.json();
  return data;
};
