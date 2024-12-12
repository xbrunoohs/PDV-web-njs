// Importa as funções do Firestore para manipular o banco de dados
const { collection, getDocs, query, where, setDoc, doc } = require('firebase/firestore');
const db = require('../../db/firebase'); 

// Lista de 10 produtos para popular a coleção "Produtos"
const produtosSeed = [
  { Nome: "Arroz", Preco: 5.99 },
  { Nome: "Feijão", Preco: 7.49 },
  { Nome: "Açúcar", Preco: 3.89 },
  { Nome: "Sal", Preco: 1.99 },
  { Nome: "Óleo", Preco: 8.5 },
  { Nome: "Café", Preco: 10.5 },
  { Nome: "Farinha", Preco: 4.75 },
  { Nome: "Macarrão", Preco: 2.5 },
  { Nome: "Leite", Preco: 4.99 },
  { Nome: "Pão", Preco: 3.99 }
];

// Função para atualizar ou inserir produtos
async function upsertProdutos() {
  const produtosCollection = collection(db, 'produtos');

  for (const produto of produtosSeed) {
    // Cria uma query para verificar se o produto já existe com base no Nome
    const q = query(produtosCollection, where("Nome", "==", produto.Nome));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      // Produto não existe, cria um novo documento com ID gerado automaticamente
      const newDocRef = doc(produtosCollection); // Cria uma referência com ID automático
      await setDoc(newDocRef, produto);
      console.log(`Produto ${produto.Nome} adicionado.`);
    } else {
      // Produto já existe, atualiza o documento
      const existingDoc = snapshot.docs[0].ref; // Obtém a referência do documento existente
      await setDoc(existingDoc, produto, { merge: true }); // Atualiza com merge para manter campos existentes
      console.log(`Produto ${produto.Nome} atualizado.`);
    }
  }
}

// Exporta a função para ser utilizada em outros arquivos
module.exports = { upsertProdutos };
