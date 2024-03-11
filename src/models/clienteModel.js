const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'tate',
  host: 'localhost',
  database: 'nodejs',
  password: '1234',
  port: 5432,
});

const Cliente = sequelize.define('Cliente', {
  nome: DataTypes.STRING,
  email: DataTypes.STRING,
  telefone: DataTypes.STRING,
  coordenada_x: { type: DataTypes.INTEGER, field: 'coordenada_x' },
  coordenada_y: { type: DataTypes.INTEGER, field: 'coordenada_y' },
});

function gerarPermutacoes(array) {
  const result = [];
  const permutacaoAtual = [];

  function permutar() {
    if (permutacaoAtual.length === array.length) {
      result.push([...permutacaoAtual]);
      return;
    }

    for (const elemento of array) {
      if (!permutacaoAtual.includes(elemento)) {
        permutacaoAtual.push(elemento);
        permutar();
        permutacaoAtual.pop();
      }
    }
  }

  permutar();
  return result;
}

async function calcularRota() {
  // Obter coordenadas dos clientes do PostgreSQL
  const clientes = await Cliente.listarTodos();

  // Restante do código permanece igual

  // Encontrar a rota com a menor distância
  const todasRotas = gerarPermutacoes(clientes);
  let menorDistancia = Infinity;
  let rotaOtimizada = [];

  todasRotas.forEach((rota) => {
    const distanciaAtual = calcularDistancia(rota);
    if (distanciaAtual < menorDistancia) {
      menorDistancia = distanciaAtual;
      rotaOtimizada = rota;
    }
  });

  return rotaOtimizada;
}

function nearestNeighbor(clientes) {
  const n = clientes.length;
  const visitados = Array(n).fill(false);
  const rota = [];
  let distanciaTotal = 0;

  // Começa na primeira cidade (cliente)
  let atual = 0;
  visitados[atual] = true;
  rota.push(clientes[atual]);

  for (let i = 1; i < n; i++) {
    let indiceMaisProximo = -1;
    let menorDistancia = Infinity;

    // Encontrar o cliente mais próximo
    for (let j = 0; j < n; j++) {
      if (!visitados[j]) {
        const distancia = calcularDistancia(rota[rota.length - 1], clientes[j]);
        if (distancia < menorDistancia) {
          menorDistancia = distancia;
          indiceMaisProximo = j;
        }
      }
    }

    // Adicionar o cliente mais próximo à rota
    visitados[indiceMaisProximo] = true;
    rota.push(clientes[indiceMaisProximo]);
    distanciaTotal += menorDistancia;
  }

  // Volta para a cidade inicial
  distanciaTotal += calcularDistancia(rota[rota.length - 1], rota[0]);

  console.log(`Distância total da rota otimizada: ${distanciaTotal.toFixed(2)}`);
  return rota;
}

// Função para calcular a distância entre dois clientes
function calcularDistancia(cliente1, cliente2) {
  return Math.sqrt(
    Math.pow(cliente2.coordenada_x - cliente1.coordenada_x, 2) +
    Math.pow(cliente2.coordenada_y - cliente1.coordenada_y, 2)
  );
}



Cliente.listarTodos = async () => {
  const client = await pool.connect();

  try {
    const result = await client.query('SELECT * FROM clientes');
    return result.rows;
  } finally {
    client.release();
  }
};



Cliente.cadastrarCliente = async (dadosCliente) => {
  const client = await pool.connect();

  try {
    const result = await client.query(
      'INSERT INTO clientes (nome, email, telefone, coordenada_x, coordenada_y) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [dadosCliente.nome, dadosCliente.email, dadosCliente.telefone, dadosCliente.coordenada_x, dadosCliente.coordenada_y]
    );

    return result.rows[0];
  } finally {
    client.release();
  }
};

module.exports = {
  Cliente,
  nearestNeighbor
};
