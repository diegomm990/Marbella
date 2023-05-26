const Sales = require("../Models/Sales");

const getAllSales = async (req, res) => {
  try {
    const sales = await Sales.find().populate({
      path: "user",
      select: ["name", "lastname", "email"],
    });
    res.status(200).send(sales);
  } catch (error) {
    console.log(error);
  }
};
const getSaleById = async (req, res) => {
  let { id } = req.params;
  try {
    const sale = await Sales.findById(id);
    res.status(200).send(sale);
  } catch (error) {
    console.log(error);
  }
};

const getSalesByUser = async (req, res) => {
  let { id } = req.params;
  try {
    // `ObjectId('${id}')`
    const sale = await Sales.find({ user: id });
    res.status(200).send(sale);
  } catch (error) {
    console.log(error);
  }
};

const createSale = async (req, res) => {
  let sales = await Sales.find();
  let totalSales = sales.length;
  let { user, address, products, paymentMethod } = req.body;
  try {
    const sale = await Sales.create({
      orderNumber: totalSales,
      user,
      address,
      products,
      paymentMethod,
      approved: false,
      delivered: false,
    });
    res.status(200).send(sale);
  } catch (error) {
    console.log(error);
  }
};
const approveSale = async (req, res) => {
  let { id } = req.params;
  try {
    let saleApproved = await Sales.findByIdAndUpdate(id, {
      approved: true,
    });
    res.status(200).send(saleApproved);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllSales,
  createSale,
  approveSale,
  getSaleById,
  getSalesByUser,
};
