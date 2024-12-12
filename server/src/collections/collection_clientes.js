// Importa as funções do Firestore para manipular o banco de dados
const { collection, getDocs, query, where, setDoc, doc } = require('firebase/firestore');
const db = require('../../db/firebase'); 

// Lista de 10 clientes para popular a coleção "Clientes"
const clientesSeed = [
  { nome: "Alice Silva", cpf: "12345678901" },
  { nome: "Bruno Costa", cpf: "23456789012" },
  { nome: "Carla Souza", cpf: "34567890123" },
  { nome: "Daniel Santos", cpf: "45678901234" },
  { nome: "Elaine Pereira", cpf: "56789012345" },
  { nome: "Fernando Lima", cpf: "67890123456" },
  { nome: "Gustavo Nunes", cpf: "78901234567" },
  { nome: "Heloísa Alves", cpf: "89012345678" },
  { nome: "Igor Cardoso", cpf: "90123456789" },
  { nome: "Julia Ramos", cpf: "01234567890" }
];

// Função para atualizar ou inserir clientes
async function upsertClientes() {
  const clientesCollection = collection(db, 'clientes');

  for (const cliente of clientesSeed) {
    // Verifica se já existe um cliente com o mesmo CPF
    const q = query(clientesCollection, where("cpf", "==", cliente.cpf));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      // Cliente não existe, então insere com um ID gerado automaticamente
      const newDocRef = doc(clientesCollection); // Cria uma referência com ID automático
      await setDoc(newDocRef, cliente);
      console.log(`Cliente ${cliente.nome} adicionado.`);
    } else {
      // Cliente já existe, então atualiza
      const existingDoc = snapshot.docs[0].ref; // Obtém a referência do documento existente
      await setDoc(existingDoc, cliente, { merge: true }); // Atualiza o documento
      console.log(`Cliente ${cliente.nome} atualizado.`);
    }
  }
}

module.exports = { upsertClientes };
