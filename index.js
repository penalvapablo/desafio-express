const fs = require('fs');
const Contenedor = require('./contenedor');
const express = require('express');
const PORT = 8080;
let app = express();

const archivo1 = new Contenedor('productos.txt');

// async function test() {
//   console.log(await archivo1.save(producto5));
//   console.log(await archivo1.getById(2));
//   console.log(await archivo1.getAll());
//   let algo = await archivo1.getAll();
//   return algo;
//   await archivo1.deleteById(2);
//   await archivo1.deleteAll();
// }

function getproductos(archivo) {
  const arr = fs.readFileSync(archivo.file, 'utf-8');
  const parseArr = JSON.parse(arr);
  return parseArr;
}
const productos = getproductos(archivo1);

app.get('/productos', (req, res) => {
  res.send(productos);
});

function getRandomProduct(archivo) {
  const arr = fs.readFileSync(archivo.file, 'utf-8');
  const parseArr = JSON.parse(arr);
  return parseArr[Math.floor(Math.random() * parseArr.length)];
}

app.get('/productoRandom', (req, res) => {
  const randomProduct = getRandomProduct(archivo1);
  res.send(randomProduct);
});

app.listen(PORT, () => {
  console.log(`conectado al puerto http://localhost:${PORT}`);
});
