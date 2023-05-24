const path = require("path");
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");

const confirmPurchase = async (req, res) => {
  let { user, order, products, shipping, discount, total } = req.body;
  let array = products.map((p) => {
    return `${p.quantity} - ${p.name}   $${p.price},00`;
  });
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: "587",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_KEY,
    },
  });

  const handleBarOptions = {
    viewEngine: {
      extName: ".handlebars",
      partialsDir: path.resolve("./src/utils/views"),
      defaultLayout: false,
    },
    viewPath: path.resolve("./src/utils/views"),
    extName: ".handlebars",
  };

  transporter.use("compile", hbs(handleBarOptions));

  var mailOptions = {
    from: `"Marbella Arg" <${process.env.EMAIL}>`, // sender address
    to: user.email, // list of receivers
    subject: `Compra confirmada N° de orden: ${order}`, // Subject line
    template: "confirmPurchase",
    context: {
      user: {
        name: user.name,
        lastname: user.lastname,
        address: {
          street: user.address.street,
          number: user.address.number,
          department: user.address.department,
          province: user.address.province,
          locality: user.address.locality,
          zipCode: user.address.zipCode,
        },
      },
      products: array,
      discount,
      order,
      shipping,
      total,
    },
  };

  const sale = {
    from: `"Marbella Arg" <${process.env.EMAIL}>`, // sender address
    to: [
      "marbelladress@gmail.com",
      "diegomm990@gmail.com",
      "eduardobellagamba@gmail.com",
      "juanma.soto.tonini@hotmail.com",
    ], // list of receivers
    subject: `Realizaste una venta - N°${order}`, // Subject line
    template: "saleConfirmed",
    context: {
      user: {
        name: user.name,
        lastname: user.lastname,
        address: {
          street: user.address.street,
          number: user.address.number,
          department: user.address.department,
          province: user.address.province,
          locality: user.address.locality,
          zipCode: user.address.zipCode,
        },
      },
      products: array,
      discount,
      order,
      shipping,
      total,
    },
  };
  // Send Email

  let mail = await transporter.sendMail(mailOptions);
  let saleMail = await transporter.sendMail(sale);
  res
    .status(200)
    .send(`${mail.messageId} y ${saleMail.messageId} enviados correctamente `);
};

const contactForm = async (req, res) => {
  let { name, lastname, email, comment } = req.body;
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: "587",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_KEY,
    },
  });

  const handleBarOptions = {
    viewEngine: {
      extName: ".handlebars",
      partialsDir: path.resolve("./src/utils/views"),
      defaultLayout: false,
    },
    viewPath: path.resolve("./src/utils/views"),
    extName: ".handlebars",
  };

  transporter.use("compile", hbs(handleBarOptions));

  var mailOptions = {
    from: `"Marbella Arg" <${process.env.EMAIL}>`, // sender address
    to: user.email, // list of receivers
    subject: `Comentario recibido - Marbella Arg`, // Subject line
    template: "contactForm",
    context: {
      name,
      lastname,
    },
  };
  var mailForm = {
    from: `"Marbella Arg" <${process.env.EMAIL}>`, // sender address
    to: [
      "marbelladress@gmail.com",
      "diegomm990@gmail.com",
      "eduardobellagamba@gmail.com",
      "juanma.soto.tonini@hotmail.com",
    ], // list of receivers
    subject: `Comentario recibido - Marbella Arg`, // Subject line
    template: "contact",
    context: {
      name,
      lastname,
      comment,
    },
  };
  let mail = await transporter.sendMail(mailOptions);
  let userMail = await transporter.sendMail(mailForm);
  res
    .status(200)
    .send(`${mail.messageId} y ${userMail.messageId} enviados correctamente`);
};
module.exports = { confirmPurchase, contactForm };
