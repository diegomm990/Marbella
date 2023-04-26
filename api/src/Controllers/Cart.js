const Carts = require('../Models/Cart');

const getCarts = async(req,res)=> {
    try {
        let carts = await Carts.find().populate({path: 'user', select: ["name", "lastname", "email"]});
        res.status(200).send(carts)
    } catch (error) {
        console.log(error);
    }
}
const getCartByUser = async(req,res)=> {
    let {id} = req.params;
    try {
        let cart = await Carts.find({
            user: id,
            saleFinished: false
        })
        res.status(200).send(cart)
    } catch (error) {
        console.log(error);
    }
}
const createCart = async(req,res)=> {
    let {user, date, products} = req.body;
    try {
        const exists = await Carts.find({user, saleFinished:false})
        if(!exists){
            const cart = await Carts.create({
                user,
                date,
                products
            })
            res.status(200).send(cart)
        }else {
            const cart = await Carts.findOneAndUpdate({user, saleFinished:false}, {
                date, 
                products
            })
            res.status(200).send(cart)
        }
    } catch (error) {
        console.log(error);
    }
}

const manageCart = async(req,res)=> {
    let { user, name , size, sign } = req.body;
    try {
        let oldCart = await Carts.findOne({user, saleFinished: false});
        if(oldCart){
            let products = oldCart.products;
            let index = products.find((p)=> p.name === name
            || p.size === size);
            console.log(index);
            let i = products.indexOf(index)
            console.log(i);
            if(sign === "+"){
                products[i] = {...products[i],
                quantity: products[i].quantity + 1} 
            }
            if(sign === "-"){
                products[i] = {...products[i],
                quantity: products[i].quantity - 1} 
            }
            let newCart = await Carts.findOneAndUpdate({user, saleFinished:false},
                {
                    products: products
                })
            res.status(200).send(newCart);
        }
    } catch (error) {
        console.log(error);
    }
}

const checkSale = async(req,res) => {
    let {id} = req.params;
    try {
        const cart = await Carts.findByIdAndUpdate(id, {
            saleFinished: true
        })
        res.status(200).send(cart)
    } catch (error) {
        console.log(error);
    }
}


module.exports = {createCart, checkSale, getCarts, getCartByUser, manageCart}