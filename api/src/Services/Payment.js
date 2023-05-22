const axios = require("axios");
const mercadopago = require("mercadopago");
require("dotenv").config();

class PaymentService {
  async createPayment(req, res) {
    const url = "https://api.mercadopago.com/checkout/preferences";
    const { products, shipping } = req.body;
    const body = {
      items: [],
      back_urls: {
        failure: "http://192.168.1.39:3000/failure",
        pending: "http://192.168.1.39:3000/pending",
        success: `${process.env.URL}/approvingSale`,
      },
      auto_return: "approved",
    };
    products?.map((p) => {
      body.items.push({
        picture_url: p.image,
        title: `${p.name} ${p.size}`,
        quantity: p.quantity,
        unit_price: p.price,
      });
    });
    if (shipping !== 0) {
      body.items.push({
        title: "Envio",
        quantity: 1,
        unit_price: shipping,
      });
    }
    const payment = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
    });

    return payment.data.init_point;
  }
}

module.exports = PaymentService;
