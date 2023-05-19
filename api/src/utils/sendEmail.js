const nodemailer = require("nodemailer");
const html = './mailprueba.html'

const confirmPurchase = async(req,res)=> {
    let {user, email , order, products, total} = req.body;
    let array = products.map((p)=> {
        return `<div>
        <h4>${p.quantity}  ${p.name}   ${p.price}</h4>
        </div>`
    })
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: "587",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_KEY
        }
    })

    const options = {
        from: `"Marbella Arg" <${process.env.EMAIL}>`, // sender address
        to: email, // list of receivers
        subject: `Compra confirmada N°${order}`, // Subject line
        text: `Hello ${user.name}`, // plain text body
        html: 
        `
         <img src='https://firebasestorage.googleapis.com/v0/b/marbelladb-ee6df.appspot.com/o/Logo.png?alt=media&token=af753207-9ec2-404f-9912-3aa776192663' alt="logo" style="width: 300px; heigth:700px">
            <h2>Hola ${user.name} ${user.lastname}! Gracias por comprar en Marbella</h2>
            <h3>Tu pedido: #${order}</h3>
            <div>
            ${array}
            </div>
            <h3>Costo de envio: $1511,00</h3>
            <h3>Descuento: $500</h3>
            <br>
            <h2>Total: $15011,00</h2>
            <h3>Direccion de envio</h3>
            <h3>Direccion: ${user.address.street} ${user.address.number}</h3>
            <h3>Departamento: ${user.address.department}</h3>
            <h3>Localidad: ${user.address.locality}</h3>
            <h3>Provincia: ${user.address.province}</h3>
            <h3>Codigo Postal: ${user.address.zipCode}</h3>
            <h3>Pais: Argentina</h3>
        <h3>Segui el estado de tu pedido en este link: <a href="http://www.instagram.com" target="_blank" rel="noopener noreferrer">www.instagram.com</a></h3>
    `, // html body
    }

    // Send Email

    let mail = await transporter.sendMail(options);
    res.status(200).send(`${mail.messageId} enviado correctamente`)
}

module.exports={confirmPurchase}