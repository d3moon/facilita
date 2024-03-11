const {Cliente, nearestNeighbor} = require('../models/clienteModel');

const clienteController = {
  
  listarClientes: async (req, res) => {
    try {
      const clientes = await Cliente.listarTodos();

      // Mapeie a resposta para enviar apenas os dados relevantes dos clientes
      const clientesFormatados = clientes.map((cliente) => ({
        id: cliente.id,
        nome: cliente.nome,
        email: cliente.email,
        telefone: cliente.telefone,
        coordenada_x: cliente.coordenada_x,
        coordenada_y: cliente.coordenada_y,
      }));

      res.json(clientesFormatados);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao listar clientes.' });
    }
  },


  cadastrarCliente: async (req, res) => {
    try {
      const novoCliente = await Cliente.cadastrarCliente(req.body);

      res.json({
        id: novoCliente.id,
        nome: novoCliente.nome,
        email: novoCliente.email,
        telefone: novoCliente.telefone,
        coordenada_x: novoCliente.x,
        coordenada_y: novoCliente.y,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao cadastrar cliente.' });
    }
    
  },

   calcularRota: async (req, res)  =>{
    try {
      const clientes = await Cliente.listarTodos();
  
      const rotaOtimizada = nearestNeighbor(clientes);
  
      res.json({ rota: rotaOtimizada });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao calcular a rota otimizada' });
    }
  }  
};

module.exports = clienteController;
