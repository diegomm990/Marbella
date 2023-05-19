const Stock = require("../Models/Stock.js");

const getStock = async(req,res)=> {
    try {
        const stock = await Stock.find()
        res.status(200).json(stock)
    } catch (error) {
        console.log(error);
    }
}
const createStock = async(req,res) => {
    let {size, quantity, name} = req.body;
    try {
        await Stock.create({
            size,
            quantity,
            name
        });
        res.status(200).send("Stock updated")
    } catch (error) {
        console.log(error);
    }
}
const manageStock = async(req,res)=> {
    let products = req.body;
    try {
        for (let i = 0; i < products.length; i++) {
            let oldStock = await Stock.findOne({name: products[i].name,size: products[i].sizes})
            let oldQuan = oldStock.quantity;
            await Stock.findOneAndUpdate({name: products[i].name, size: products[i].sizes}, {
                quantity: oldQuan - products[i].quantity
            })
        }
        res.status(200).send("Stock actualizado")
    } catch (error){
        console.log(error);
    }
}

module.exports= {
    getStock,
    createStock,
    manageStock
}
