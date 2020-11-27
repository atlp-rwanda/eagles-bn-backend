import superagent from 'superagent'

export const flutterPayment = (phone_number,name,email,amount) => {
    return new Promise((resolve,reject)=>{
    const tx_ref= Date.now()
    superagent.post('https://api.flutterwave.com/v3/payments')
            .send({
                public_key: process.env.FLUTTER_PUBLIC_KEY,
                tx_ref,
                amount,
                currency:'RWF',
                country:'RW',
                payment_options:"card",
                customer: {
                    phone_number,
                    email,
                    name,
                },
                customizations: {
                    title: `${name}'s Payment`,
                    description: "Payment for items in cart",
                    logo: "https://assets.piedpiper.com/logo.png",
                },
                redirect_url: process.env.FLUTTER_REDIRECTION_URL,
            })
            .set('Authorization',`Bearer ${process.env.FLUTTER_SECRET_KEY}`)
            .then(response=>{

                resolve({Transaction:tx_ref,payment_link:response.text})
            })
            .catch(error=>{
                reject(error);
                })
    })
    
    }
   