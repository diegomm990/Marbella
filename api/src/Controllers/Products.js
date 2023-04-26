const Products = require("../Models/Products");

const getAll = async (req,res) => {
  let {search} = req.query;
  try {
    if(search && search.length > 3){
      const products = await Products.find({name : {$regex: search, $options : "i"}})
      res.status(200).json(products)
    } else {
      const products = await Products.find().populate({path:"stockM", select: ['quantity']}).populate({path:"stockL", select: ['quantity']}).populate({path:"stockXL", select: ['quantity']});
      res.status(200).json(products);
    }
  } catch (error) {
    console.log(error);
  }
}

const getById = async (req, res) => {
  const id = req.params
  console.log(id.id);
  try {
    let product = await Products.findById(id.id).populate({path:"stockM", select: ['quantity']}).populate({path:"stockL", select: ['quantity']}).populate({path:"stockXL", select: ['quantity']})
    res.status(200).json(product)
  } catch (error) {
    console.log(error);
  }
}

const createProduct = async (req, res) => {
  const { name, price, sizes, images,  category } = req.body;
  console.log(name);
  try {
    const exist = await Products.findOne({ name });
    if (!exist) {
      await Products.create({
        name,
        price,
        sizes,
        images,
        category,
      });
      res.status(200).send(`Product ${name} created`);
    } else {
      res.status(404).send(`The product with name: ${name} already exists`);
    }
  } catch (err) {
    console.log(err);
  }
};
const deleteProduct = async (req, res) => {
  const { _id } = req.params;
  try {
    const products = await Products.findByIdAndDelete(_id);
    res.status(200).send(`El producto ${products.name} fue eliminado con exito`);
  } catch (err) {
    console.log(err);
  }
};
// const substractStock = async(req,res)=> {

// }

module.exports = {
    getAll,
    createProduct,
    deleteProduct,
    getById
}