const express = require('express');
const clienteController = require('../controllers/clienteController');

const router = express.Router();

router.get('/clientes', clienteController.listarClientes);
router.get('/clientes/rota', clienteController.calcularRota);
router.post('/clientes/cadastrar', clienteController.cadastrarCliente);
module.exports = router;
