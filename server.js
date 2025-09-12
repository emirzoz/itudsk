const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (your HTML/CSS/JS)
app.use(express.static("public")); // put your index.html in "public" folder

// Contact form endpoint
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Configure transporter (use Gmail SMTP here)
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "emirmctr22@gmail.com", // sender email
        pass: "YOUR_APP_PASSWORD"     // ⚠️ not Gmail password, use App Password
      }
    });

    // Mail content
    let mailOptions = {
      from: email,
      to: "emirmctr22@gmail.com",
      subject: "Yeni İletişim Mesajı - Bize Yazın",
      text: `Ad Soyad: ${name}\nEmail: ${email}\n\nMesaj:\n${message}`
    };

    await transporter.sendMail(mailOptions);
    res.send("Mesaj başarıyla gönderildi ✅");
  } catch (error) {
    console.error(error);
    res.status(500).send("Mesaj gönderilemedi ❌");
  }
});

// Start server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
