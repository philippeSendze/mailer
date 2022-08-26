const express = require("express");
const app = express();
const port = 5000;

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = (clientEmail, clientName) => {
  return {
    to: clientEmail, // Change to your recipient
    from: "monsieurphilippes@gmail.com", // Change to your verified sender
    subject: `Bienvenue ${clientName}`,
    text: "Bienvenue dans notre newsletter!",
  };
};

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded());

app.post("/", (req, res) => {
  const clientName = req.body.clientName;
  const clientEmail = req.body.clientEmail;
  console.log(req.body);
  sgMail
    .send(msg(clientEmail, clientName))
    .then(() => {
      console.log("Email sent");
      res.sendFile("confirmation.html", { root: __dirname });
    })
    .catch((error) => {
      console.error(error);
    });
});

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});
