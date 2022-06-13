
const fs = require('fs')

class Contenedor {
    constructor(fileName) {
        this.fileName = fileName
        fs.promises.writeFile(`./${fileName}`, '')
    }
    async save(objeto) {
        let data = await fs.promises.readFile(`./${this.fileName}`, 'utf-8')
        if(!data) {
            objeto.id = 1
            const arr = [objeto]
            await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify(arr))
            return objeto.id
        } else {
            data = JSON.parse(data);
            objeto.id = data.length + 1
            data.push(objeto)
            await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify(data))
            return objeto.id
        }
    }
    async getById(id) {
        const data = JSON.parse(await fs.promises.readFile(`./${this.fileName}`, 'utf-8'))
        return data[id - 1]
    }
    async getAll() {
        const data = JSON.parse(await fs.promises.readFile(`./${this.fileName}`, 'utf-8'))
        return data
    }
}
const productos = new Contenedor('productos.txt')

const Main = async () => {
    try{
        await productos.save({ nombre: "Laptop", precio: 12000, imagen: "https://m.media-amazon.com/images/I/71p-M3sPhhL._AC_SY450_.jpg" })
        await productos.save({ nombre: "Mouse", precio: 12000, imagen: "https://s3-sa-east-1.amazonaws.com/saasargentina/oaPmQNJPQeMZynN9AOk5/imagen" })
        await productos.save({ nombre: "Teclado", precio: 12000, imagen: "https://resource.logitechg.com/w_1000,c_limit,q_auto,f_auto,dpr_auto/d_transparent.gif/content/dam/gaming/en/products/pro-x-keyboard/pro-x-keyboard-gallery-1.png?v=1" })
        await productos.save({ nombre: "Monitor", precio: 12000, imagen: "https://www.logitech.com/assets/images/products/logitech-g-series-gaming-laptop-monitor-1.jpg" })
        const response = await productos.getById("")
       
    }catch(error) {
        console.log(error)
    }

}

Main()


const express = require('express');
const app = express();
const port = 8090;
   

app.listen(port, err => {
    if (err) {
        console.log (`Error al iniciar el servidor: ${err}`);
    } else{
        console.log(`Tomando datos desde el puerto ${port}`);
    }
  
})

app.get("/", (req, res) => {
    res.send("Hola mundo")

})

app.get("/productos", (req, res) => {

    res.json(JSON.parse(fs.readFileSync('./productos.txt', 'utf-8')))
    
})

app.get("/productosRandom", (req, res) => {
    const productos = JSON.parse(fs.readFileSync('./productos.txt', 'utf-8'))
    const random = Math.floor(Math.random() * productos.length)
    res.json(productos[random])
    
})