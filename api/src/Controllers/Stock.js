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
    let {name, size, quantity} = req.body;
    try {
        let oldStock = await Stock.findOne({name,size})
        let oldQuan = oldStock.quantity;
        let stockUpdt = await Stock.findOneAndUpdate({name, size}, {
            quantity: oldQuan - quantity
        })
        res.status(200).send(stockUpdt)
    } catch (error){
        console.log(error);
    }
}

module.exports= {
    getStock,
    createStock,
    manageStock
}
