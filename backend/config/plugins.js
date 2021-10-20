module.exports = ({ env }) => ({
  email: {
    provider: "smtp",
    providerOptions: {
      host: "smtp.gmail.com", //SMTP Host
      port: 465, //SMTP Port
      secure: true,
      username: process.env.MAIL_USER,
      password: process.env.MAIL_PASSWORD,
      rejectUnauthorized: true,
      requireTLS: true,
      connectionTimeout: 1,
    },
    settings: {
      from: process.env.MAIL_USER,
      replyTo: process.env.MAIL_USER,
    },
  },
});
