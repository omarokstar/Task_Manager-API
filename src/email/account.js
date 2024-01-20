const nodemailer=require('nodemailer')
const trasporter= nodemailer.createTransport({
    service: 'Gmail',
    port:465,
    secure:true,
    auth:{
        user:'taskktaskk45@gmail.com',
        pass:process.env.PASS
        
                                
    }, tls: {
        // This is set to false to avoid self-signed certificate issues
        rejectUnauthorized: false
    }
})


const sendWelcomeEmail= (email,name)=>{

 trasporter.sendMail({
    from:'"task" taskktaskk45@gmail.com',
    to:email,
    subject:'Thanks for joining in!',
    text:`welcome to the app,${name}.Let me know how you go along with the app.`,

})}
const sendCancellationEmail= (email,name)=>{

    trasporter.sendMail({
       from:'"taskaty" taskktaskk45@gmail.com',
       to:email,
       subject:'Sorry to see you go !',
       text:`Good By,${name}.I hope to see you back sometime soon.`,
   
   })
}
module.exports={

    sendWelcomeEmail,
    sendCancellationEmail
}
