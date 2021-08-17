require('dotenv').config()
const express = require("express");
const path = require("path");
var url = require('url');


const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));


app.get('/', (req, res) => {

  res.send({
    myName: 'ABASIODIONG UDOFIA'
  })
})

const PORT = process.env.PORT

app.listen(PORT, () => console.log(`Server is running on ${process.env.URL}:${PORT}`));
