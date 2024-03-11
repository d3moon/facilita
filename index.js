const express = require('express');
const clienteRoutes = require('./src/routes/clienteRoutes');
const sequelize = require('./src/config/database');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use(clienteRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  sequelize.sync();
});
