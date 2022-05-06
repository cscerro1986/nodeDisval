const express = require("express")

require("dotenv").config()
const port = process.env.port || 3030

const server = express()

//setting
server.use(express.json());

//route
server.get("/",(req,res)=>{
    res.send(`
    <h1>Bienvenidos a mi app<H/>
    `)
})

// server.use("/comprobantes",require("./elementos/comprobantes/comprobantesController"));
server.use("/user",require("./elementos/users/userRoutes"));
server.use("/rol",require("./elementos/rol/rolRoute"));
server.use("/categoriaProducto",require("./elementos/categoriaProducto/catProdRoutes"))
server.use("/estadoProducto",require("./elementos/estadoProducto/estadoProductoRoute"));
// server.use("/productos",require("./elementos/productos/ProductosRoutes"));
server.use("/comprobanteAfip", require("./elementos/compAfip/compAfipRoute"));
//start server

server.listen(port, (err) => {
    err ? console.log(`Error: ${err}`) : console.log(`Servidor en http://localhost:${port}`)
})