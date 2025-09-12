const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;

  let transporter = nodemailer.createTransport({
    service: "gmail", // or your SMTP server
    auth: {
      user: "yourgmail@gmail.com",
      pass: "yourpassword"
    }
  });

  let mailOptions = {
    from: email,
    to: "itudsk@itu.edu.tr",
    subject: "Yeni İletişim Mesajı",
    text: `Ad: ${name}\nEmail: ${email}\n\nMesaj:\n${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.send("Hata oluştu.");
    }
    res.send("Mesaj gönderildi!");
  });
});

app.listen(3000, () => console.log("Server running on port 3000"));
