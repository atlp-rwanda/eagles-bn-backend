/* eslint-disable linebreak-style */
/* eslint-disable no-empty */

// import mailer from '@sendgrid/mail';
// import dotenv from 'dotenv';
// import Mailgen from 'mailgen';

// dotenv.config();

// const mailGenerator = new Mailgen({
//   theme: 'salted',
//   product: {
//     name: 'Barefoot Nomad',
//     link: '#'
//   }
// });
// const generateEmail = (name, intro, instructions, buttonText, link) => ({
//   body: {
//     name,
//     intro,
//     action: {
//       instructions,
//       button: {
//         color: '#33b5e5',
//         text: buttonText,
//         link
//       }
//     },
//     outro: 'Need help, or have questions? Just reply to this email, we would love to help.'
//   }
// });

// const messageGenerator = async (email, name, intro, action, buttonText, link, subject, text) => {
//   try {
//     const emailBody = generateEmail(name, intro, action, buttonText, link);
//     const emailTemplate = mailGenerator.generate(emailBody);
//     mailer.setApiKey(process.env.SENDGRID_API_KEY);
//     const message = {
//       to: `${email}`,
//       from: 'gilbeltelnino@gmail.com',
//       subject,
//       text,
//       html: emailTemplate
//     };
//     await mailer.send(message);
//     console.log('email sent');
//   } catch (error) { }
// };

// const eventNotification = async (email, name, url, description) => {
//   messageGenerator(
//     email,
//     name,
//     `${description}`,
//     'For More Details Click Button Below',
//     'Click Me',
//     `${url}`,
//     'REQUEST STATUS',
//     'Thank You',
//   );
// };

// export default eventNotification;

import mailgun from 'mailgun-js';
import dotenv from 'dotenv';

dotenv.config();

const { DOMAIN_NAME, MAILGUN_API_KEY } = process.env;
const mg = mailgun({
  apiKey: 'key-4568ee59075b0057f85527facc5bffb9',
  domain: 'sandbox8a628e9a4135447d86459ba9ef96bb7a.mailgun.org',
});

const eventNotification = (email, name, url, description) => {
  const data = {
    from: 'noreply@borefoot.com',
    to: email,
    subject: 'Trip request notification',
    html: `<p>${description} click the link to view ${url} </p>`
  };
  mg.messages().send(data, (error, body) => {
    if (error) {
      return error;
    }
    return body;
  });
};

export default eventNotification;
