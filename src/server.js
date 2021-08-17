require('dotenv').config()
const express = require("express");
const path = require("path");
const cors = require('cors')
const nodemailer = require("nodemailer");
const nodemailerSendgrid = require("nodemailer-sendgrid");

const app = express();

app.use(cors())

app.set("view engine", "pug");
app.set("views", "views");

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));


app.use(express.static(path.join(__dirname, "public")));


app.get('/', (req, res) => {
  res.render('index')
})

let name;

app.post('/forms', async (req, res) => {
  name = req.body.name
  let tester = req.body.email

  
  try {
    const transporter = nodemailer.createTransport(
      nodemailerSendgrid({
        apiKey: process.env.SENDGRID_API_KEY,
      })
    );

    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: `"${req.body.name} 👻" <${req.body.email}> udofia.herokuapp.com`, // sender address
      to: ["enalsy22@gmail.com", tester], // list of receivers
      subject: req.body.subject, // Subject line
      html: req.body.message, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    res.redirect("/success");
  } catch (error) {
    console.log(error);
    res.status(500).json({
      Error: "message not sent",
      message: "Please try again, with a good network connection or you clear your cache"
    });
  }
});

app.get('/success', (req, res) => {
  res.render('success', {name})
})


const PORT = process.env.PORT

app.listen(PORT, () => console.log(`Server is running on ${process.env.URL}:${PORT}`));