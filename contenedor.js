const fs = require('fs');

class Contenedor {
  constructor(file) {
    this.file = file;
  }

  async save(obj) {
    try {
      let arr = await fs.promises.readFile(this.file, 'utf-8');
      let newArr = [];
      if (arr === '') {
        obj.id = 1;
        newArr.push(obj);
        await fs.promises.writeFile(this.file, JSON.stringify(newArr));
        return obj.id;
      } else {
        newArr = JSON.parse(arr);
        let lenght = newArr.length;
        obj.id = lenght + 1;
        newArr.push(obj);
        await fs.promises.writeFile(this.file, JSON.stringify(newArr));
        return obj.id;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    try {
      const arr = await fs.promises.readFile(this.file, 'utf-8');
      let parseArr = JSON.parse(arr);
      let result = parseArr.find((x) => x.id === id);
      if (result) {
        return result;
      } else {
        return null;
      }
    } catch (error) {
      console.log('ERROR!!!!!', error);
    }
  }
  async getAll() {
    try {
      const arr = await fs.promises.readFile(this.file, 'utf-8');
      const parseArr = JSON.parse(arr);
      return parseArr;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteById(id) {
    try {
      const arr = await fs.promises.readFile(this.file, 'utf-8');
      const parseArr = JSON.parse(arr);
      const idFinded = parseArr.findIndex((x) => x.id === id);
      if (idFinded === -1) {
        console.log('no hay producto con ese id');
      } else {
        parseArr.splice(idFinded, 1);
        await fs.promises.writeFile(this.file, JSON.stringify(parseArr));
      }
    } catch (error) {
      console.log('ERROR!!!!!', error);
    }
  }
  async deleteAll() {
    try {
      let empty = '';
      await fs.promises.writeFile(this.file, empty);
    } catch (error) {
      console.log('ERROR!!!!!', error);
    }
  }
}

module.exports = Contenedor;
