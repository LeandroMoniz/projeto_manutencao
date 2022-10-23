const mongoose = require('mongoose') // Exportando a função mongoose

async function main() {
    await mongoose.connect('mongodb://localhost:27017/getmanut') 
    console.log('Conectou ao Mongoose!')
} // Conexão com o banco noslq

main().catch((err) => console.log(err)) // erro 

module.exports = mongoose 
