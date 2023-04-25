const Sales = require('../Models/Sales');

const getAllSales = async (req,res) => {
    try {
        const sales = await Sales.find();
        res.status(200).send(sales)
    } catch (error) {
        console.log(error);
    }
}
const getSaleById = async(req,res)=> {
    let {id} = req.params
    try {
        const sale = await Sales.findById(id)
        res.status(200).send(sale)
    } catch (error) {
        console.log(error);
    }
} 
const createSale = async(req,res)=> {
    let sales = await Sales.find();
    let totalSales = sales.length;
    console.log(totalSales);
    let {user, address, products} = req.body;
    try {
        const sale = await Sales.create({
            orderNumber: totalSales,
            user,
            address,
            products,
            approved: false
        })
        res.status(200).send(sale)
    } catch (error) {
        console.log(error);
    }
}
const approveSale = async(req,res) => {
    let {id} = req.params;
    console.log(id);
    try {
        let saleApproved = await Sales.findByIdAndUpdate(id, {
            approved: true
        });
        res.status(200).send(saleApproved)
    } catch (error) {
        console.log(error);
    }
}

module.exports={getAllSales, createSale, approveSale, getSaleById}