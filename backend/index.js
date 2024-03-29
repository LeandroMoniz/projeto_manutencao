require('dotenv').config();

const express = require('express');
const cors = require('cors');
const conn = require('./db/conn');
const bcrypt = require('bcrypt');
//models
const User = require('./models/user');
const Office = require('./models/office');

const models = [User, Office];

const app = express();
// Config JSON response
app.use(express.json());

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

// Public folder for images
app.use(express.static('public'));

// Função para criar o primeiro administrador se não existir
const createFirstAdmin = async () => {
  try {
    const adminExists = await User.findOne({ where: { isAdmin: true } });

    if (!adminExists) {
      await Office.create({
        cargo: process.env.CARGO,
        valorHora: process.env.VALOR_HORA,
        idUser: process.env.ID_USER,
        isAdmin: true,
        bit: true,
      })
      const officeNum = await Office.findOne({ where: { cargo: process.env.CARGO } })
      const idOffice = officeNum.id
      const hashedPassword = bcrypt.hashSync(process.env.FIRST_PASSWORD, 10);
      await User.create({
        name: process.env.FIRST_NAME,
        email: process.env.FIRST_EMAIL,
        password: hashedPassword,
        cargo: idOffice,
        isAdmin: true,
        bit: true,
      });
      console.log('Primeiro administrador criado com sucesso');
    } else {
      console.log('O administrador já existe');
    }
  } catch (error) {
    console.error('Erro ao criar o primeiro administrador:', error);
  }
};

// Routes
const UserRoutes = require('./routes/UserRoutes');

app.use('/users', UserRoutes);


conn
  .sync()
  //.sync({ force: true })
  .then(async () => {
    for (const model of models) {
      await model.sync();
    }
    // Função para criar o primeiro administrador se não existir
    await createFirstAdmin();

    app.listen(5000, () => {
      console.log('O servidor está rodando na porta 5000');
    });
  })
  .catch((err) => console.log(err));
