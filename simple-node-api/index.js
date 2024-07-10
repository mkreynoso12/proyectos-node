import express from "express";
import fs from "fs";
import bodyParser from "body-parser";


const app = express();
app.use(bodyParser.json());


// FUNCION PARA LEER UN ARCHIVO JSON
const readData = () => {
    try {
        const data = fs.readFileSync("./db.json");
        return JSON.parse(data)        
    } catch (error) {
        console.log(error)
    }
};


// FUNCION PARA ESCRIBIR EN UN ARCHIVO JSON
const writeData = (data) => {
    try {
        fs.writeFileSync("./db.json",JSON.stringify(data));
    }catch(error){
        console.log(error);
    }
};


// PETICION GET PAGINA RAIZ
app.get("/",(req, res) =>{
    res.send("Welcome to my first API with NodeJS")
})

// PETICION GET PARA MOSTRAR INFORMACION DEL ARCHIVO JSON
app.get("/books",(req, res) =>{
    const data = readData();
    res.json(data.books);
});


// PETICION GET PARA MOSTRAR UN LIBRO POR SU ID
app.get("/books/:id",(req, res) =>{
    const data = readData();
    const id = parseInt(req.params.id);
    const books = data.books.find((books) => books.id === id);
    res.json(books)
});


// PETICION POST PARA AGREGAR UN REGISTRO AL ARCHIVO JSON
app.post("/books", (req, res) =>{
     const data = readData();
     const body = req.body;
     const newBook = {
        id: data.books.length +1,
        ...body,
     };
     data.books.push(newBook);
     writeData(data);
     res.json(newBook);
});


// PETICION PUT PARA ACTUALIAR EL ARCHIVO JSON
app.put("/books/:id",(req, res) =>{
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const bookIndex = data.books.findIndex((book) => book.id === id );
    data.books[bookIndex] = {
        ...data.books[bookIndex],
        ...body,
    };
    writeData(data);
    res.json({message: "Book update successfully"});
});


// PETICION DETELE PARA ELIMINAR REGISTRO EN BASE A SU ID
app.delete("/books/:id", (req, res) =>{
    const data = readData();
    const id = parseInt(req.params.id);
    const bookIndex = data.books.findIndex((book) => book.id === id );
    data.books.splice(bookIndex,1);
    writeData(data);
    res.json({message: "Book delete successfully"});    
});
 
// MENSAJE PARA MOSTRAR QUE EL SERVIDOR NODE ESTA EN LINEA Y FUNCIONANDO EN EL PUERTO 3000
app.listen(3000, ()=>{
    console.log('Server listenning on port 3000!!')
})