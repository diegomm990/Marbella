const path = require("path");
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const { EMAIL } = process.env;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  //   port: "587",
  auth: {
    // user: process.env.EMAIL,
    // pass: process.env.EMAIL_KEY,
    user: "marbelladress@gmail.com",
    pass: "fzaxekkldoxltsxh",
  },
});
const handleBarOptions = {
  viewEngine: {
    extName: ".handlebars",
    partialsDir: path.resolve("./views"),
    defaultLayout: false,
  },
  viewPath: path.resolve("./views"),
  extName: ".handlebars",
};

transporter.use("compile", hbs(handleBarOptions));

var mailOptions = {
  from: `"Marbella Arg" <${process.env.EMAIL}>`, // sender address
  to: "diegomm990@gmail.com", // list of receivers
  subject: `Compra confirmada N°150`, // Subject line
  template: "confirmPurchase",
  context: {
    user: {
      name: "Diego",
      lastname: "Martinez",
      address: {
        street: "Juncal",
        number: 1396,
        department: "5B",
        province: "Capital Federal",
        locality: "Recoleta",
        zipCode: 1062,
      },
    },
    order: 150,
    shipping: 1500,
    total: 16500,
  },
};

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log(`Email sent:` + info.response);
  }
});
