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
    let {user, products} = req.body;
    let date = new Date();
    try {
        const exists = await Carts.find({user, saleFinished:false})
        if(!exists.length){
            await Carts.create({
                user,
                date ,
                products
            })
            let createdCart = await Carts.findOne({user, saleFinished:false})
            res.status(200).send(createdCart)
        }else {
            let oldCart = await Carts.findOne({user, saleFinished:false});
            let oldProducts = oldCart.products;
            console.log(products);
            for (let i = 0; i < products.length; i++) {
                if(oldProducts.find((p)=> p.name === products[i].name && p.sizes === products[i].sizes)){
                    let productToChange = oldProducts.find((p)=> p.name === products[i].name && p.sizes === products[i].sizes);
                    let index = oldProducts.indexOf(productToChange);
                    oldProducts[index] = {...oldProducts[index],
                    quantity: oldProducts[index].quantity + products[i].quantity
                    }
                } else {
                    oldProducts.push(products[i])
                }
            }
            await Carts.findOneAndUpdate({user, saleFinished:false}, {
                date, 
                products: oldProducts
            })
            let newCart = await Carts.findOne({user, saleFinished:false})
            res.status(200).send(newCart)
        }
    } catch (error) {
        console.log(error);
    }
}
const logIn = async(req,res)=> {
    let {user, products} = req.body;
    try {
        if(products[0]){
            const cart = await Carts.findOneAndUpdate({user, saleFinished:false}, 
                {products})
        }
        const newCart = await Carts.findOne({user, saleFinished:false});
        res.status(200).send(newCart)
    } catch (error) {
     console.log(error);
    }
}
const deleteFromCart = async(req,res) => {
    let {user, name, sizes} = req.body;
    try {
        let oldCart = await Carts.findOne({user, saleFinished: false});
        if(oldCart){
            let products = oldCart.products;
            let newProd = products.filter((p)=> p.name !== name && p.sizes !== sizes || p.sizes !== sizes && p.name === name || p.name !== name && p.sizes === sizes)
            await Carts.findOneAndUpdate({user, saleFinished:false},
                {products: newProd})
                let updated = await Carts.findOne({user, saleFinished:false})
            res.status(200).send(updated)
        }
    } catch (error) {
        console.log(error);
    }
}

const manageCart = async(req,res)=> {
    let { user, name , sizes, sign, stock } = req.body;
    try {
        let oldCart = await Carts.findOne({user, saleFinished: false});
        if(oldCart){
            let products = oldCart.products;
            let index = products.find((p)=> p.name === name
            && p.sizes === sizes);
            let i = products.indexOf(index)
            if(sign === "+"){
                if(stock >= products[i].quantity){
                    products[i] = {...products[i],
                    quantity: products[i].quantity + 1} 
                }
            }
            if(sign === "-"){
                if(products[i].quantity > 1){
                    products[i] = {...products[i],
                    quantity: products[i].quantity - 1} 
                }
            }
            let newCart = await Carts.findOneAndUpdate({user, saleFinished:false},
                {
                    products: products
                })
            
            let actualizado = await Carts.findOne({user, saleFinished:false})
            res.status(200).send(actualizado);
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


module.exports = {createCart, checkSale, getCarts, getCartByUser, manageCart ,deleteFromCart, logIn}