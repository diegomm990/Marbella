const Carts = require("../Models/Cart");

const getCarts = async (req, res) => {
  try {
    let carts = await Carts.find().populate({
      path: "user",
      select: ["name", "lastname", "email"],
    });
    res.status(200).send(carts);
  } catch (error) {
    console.log(error);
  }
};
const getCartByUser = async (req, res) => {
  let { id } = req.params;
  try {
    let cart = await Carts.find({
      user: id,
      saleFinished: false,
    });
    res.status(200).send(cart);
  } catch (error) {
    console.log(error);
  }
};

const getCartById = async (req, res) => {
  let { id } = req.params;
  try {
    let cart = await Carts.findById(id);
    res.status(200).send(cart);
  } catch (error) {
    console.log(error);
  }
};

const replaceCart = async (req, res) => {
  let { id, products } = req.body;
  try {
    await Carts.findByIdAndUpdate(id, { products });
    let cart = await Carts.findById(id);
    res.status(200).send(cart);
  } catch (error) {
    console.log(error);
  }
};

let addInfoToCart = async (req, res) => {
  let { id, user, buyerData } = req.body;
  let cart;
  if (user) {
    if (buyerData.address.province === "Capital Federal") {
      await Carts.findOneAndUpdate(
        { user, saleFinished: false },
        {
          buyerData: buyerData,
          shippingPrice: 1500,
        }
      );
    } else {
      await Carts.findOneAndUpdate(
        { user, saleFinished: false },
        {
          buyerData: buyerData,
          shippingPrice: 2500,
        }
      );
    }
    cart = await Carts.findOne({ user, saleFinished: false });
    res.status(200).send(cart);
  } else {
    if (buyerData.address.province === "Capital Federal") {
      await Carts.findByIdAndUpdate(id, {
        buyerData: buyerData,
        shippingPrice: 1500,
      });
    } else {
      await Carts.findByIdAndUpdate(id, {
        buyerData: buyerData,
        shippingPrice: 2500,
      });
    }
    cart = await Carts.findById(id);
    res.status(200).send(cart);
  }
};

const createCart = async (req, res) => {
  let { user, products, id } = req.body;
  let date = new Date();
  try {
    if (!user) {
      if (id) {
        const cart = await Carts.findById(id);
        if (!cart) {
          let newCart = await Carts.create({
            date,
            products,
          });
          res.status(200).send(newCart);
        } else {
          let oldProducts = cart.products;
          for (let i = 0; i < products.length; i++) {
            if (
              oldProducts.find(
                (p) =>
                  p.name === products[i].name && p.sizes === products[i].sizes
              )
            ) {
              let productToChange = oldProducts.find(
                (p) =>
                  p.name === products[i].name && p.sizes === products[i].sizes
              );
              let index = oldProducts.indexOf(productToChange);
              let newQuantity =
                oldProducts[index].quantity + products[i].quantity;
              if (newQuantity <= products[i].stock) {
                oldProducts[index] = {
                  ...oldProducts[index],
                  quantity: oldProducts[index].quantity + products[i].quantity,
                };
              }
            } else {
              oldProducts.push(products[i]);
            }
          }
          await Carts.findByIdAndUpdate(id, {
            date,
            products: oldProducts,
          });
          let newCart = await Carts.findById(id);
          res.status(200).send(newCart);
        }
      } else {
        const newCart = await Carts.create({
          date,
          products,
        });
        res.status(201).send(newCart);
      }
    } else {
      const exists = await Carts.find({ user, saleFinished: false });
      if (!exists.length) {
        await Carts.create({
          user,
          date,
          products,
        });
        let createdCart = await Carts.findOne({ user, saleFinished: false });
        res.status(200).send(createdCart);
      } else {
        let oldCart = await Carts.findOne({ user, saleFinished: false });
        let oldProducts = oldCart.products;
        for (let i = 0; i < products.length; i++) {
          if (
            oldProducts.find(
              (p) =>
                p.name === products[i].name && p.sizes === products[i].sizes
            )
          ) {
            let productToChange = oldProducts.find(
              (p) =>
                p.name === products[i].name && p.sizes === products[i].sizes
            );
            let index = oldProducts.indexOf(productToChange);
            let newQuantity =
              oldProducts[index].quantity + products[i].quantity;
            if (newQuantity <= products[i].stock) {
              oldProducts[index] = {
                ...oldProducts[index],
                quantity: oldProducts[index].quantity + products[i].quantity,
              };
            } else {
              oldProducts[index] = {
                ...oldProducts[index],
                quantity: products[i].stock,
              };
            }
          } else {
            oldProducts.push(products[i]);
          }
        }
        await Carts.findOneAndUpdate(
          { user, saleFinished: false },
          {
            date,
            products: oldProducts,
          }
        );
        let newCart = await Carts.findOne({ user, saleFinished: false });
        res.status(200).send(newCart);
      }
    }
  } catch (error) {
    console.log(error);
  }
};
const logIn = async (req, res) => {
  let { user, products } = req.body;
  let date = new Date();
  try {
    const alreadyExists = await Carts.findOne({ user, saleFinished: false });
    if (alreadyExists) {
      if (products[0]) {
        const cart = await Carts.findOneAndUpdate(
          { user, saleFinished: false },
          { products }
        );
      }
      const newCart = await Carts.findOne({ user, saleFinished: false });
      res.status(200).send(newCart);
    } else {
      const newCart = await Carts.create({
        user,
        date,
        products,
      });
      res.status(200).send(newCart);
    }
  } catch (error) {
    console.log(error);
  }
};
const deleteFromCart = async (req, res) => {
  let { user, id, name, sizes } = req.body;
  try {
    if (user) {
      let oldCart = await Carts.findOne({ user, saleFinished: false });
      if (oldCart) {
        let products = oldCart.products;
        let newProd = products.filter(
          (p) =>
            (p.name !== name && p.sizes !== sizes) ||
            (p.sizes !== sizes && p.name === name) ||
            (p.name !== name && p.sizes === sizes)
        );
        await Carts.findOneAndUpdate(
          { user, saleFinished: false },
          { products: newProd }
        );
        let updated = await Carts.findOne({ user, saleFinished: false });
        res.status(200).send(updated);
      }
    } else {
      let oldCart = await Carts.findById(id);
      if (oldCart) {
        let products = oldCart.products;
        let newProd = products.filter(
          (p) =>
            (p.name !== name && p.sizes !== sizes) ||
            (p.sizes !== sizes && p.name === name) ||
            (p.name !== name && p.sizes === sizes)
        );
        await Carts.findByIdAndUpdate(id, { products: newProd });
        let updated = await Carts.findById(id);
        res.status(200).send(updated);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const manageCart = async (req, res) => {
  let { user, id, name, sizes, sign, stock } = req.body;
  try {
    if (user) {
      let oldCart = await Carts.findOne({ user, saleFinished: false });
      if (oldCart) {
        let products = oldCart.products;
        let index = products.find((p) => p.name === name && p.sizes === sizes);
        let i = products.indexOf(index);
        if (sign === "+") {
          if (stock >= products[i].quantity) {
            products[i] = {
              ...products[i],
              quantity: products[i].quantity + 1,
            };
          }
        }
        if (sign === "-") {
          if (products[i].quantity > 1) {
            products[i] = {
              ...products[i],
              quantity: products[i].quantity - 1,
            };
          }
        }
        let newCart = await Carts.findOneAndUpdate(
          { user, saleFinished: false },
          {
            products: products,
          }
        );

        let actualizado = await Carts.findOne({ user, saleFinished: false });
        res.status(200).send(actualizado);
      }
    } else {
      let oldCart = await Carts.findById(id);
      if (oldCart) {
        let products = oldCart.products;
        let index = products.find((p) => p.name === name && p.sizes === sizes);
        let i = products.indexOf(index);
        if (sign === "+") {
          if (stock >= products[i].quantity) {
            products[i] = {
              ...products[i],
              quantity: products[i].quantity + 1,
            };
          }
        }
        if (sign === "-") {
          if (products[i].quantity > 1) {
            products[i] = {
              ...products[i],
              quantity: products[i].quantity - 1,
            };
          }
        }
        await Carts.findByIdAndUpdate(id, {
          products: products,
        });

        let actualizado = await Carts.findById(id);
        res.status(200).send(actualizado);
      }
    }
  } catch (error) {
    console.log(error);
  }
};
const checkSale = async (req, res) => {
  let { id } = req.params;
  try {
    const cart = await Carts.findByIdAndUpdate(id, {
      saleFinished: true,
    });
    res.status(200).send(cart);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createCart,
  checkSale,
  getCarts,
  getCartByUser,
  manageCart,
  deleteFromCart,
  logIn,
  getCartById,
  replaceCart,
  addInfoToCart,
};
