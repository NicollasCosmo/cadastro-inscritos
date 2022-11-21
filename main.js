const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => {
    limpaCampos()
    document.getElementById('modal').classList.remove('active')
    
}




const getLocalStorage = () => JSON.parse(localStorage.getItem('dbClient')) ?? []
const setLocalStorage = (dbClient) => localStorage.setItem("dbClient", JSON.stringify(dbClient))




//CRUD - DELETE
const deleteClient = (index) => {
    const dbClient = readClient()  // faz a leitura do banco (localStorage)
    dbClient.splice(index, 1) // exclui do banco na posição 1 (uma casa) do index
    setLocalStorage(dbClient) // atualiza o banco de dados (mandando o banco novo)
}

//CRUD - UPDATE
const updateClient = (index, client) => { // index (posição)
    const dbClient = readClient() // ler os dados do localStorage e colocar em uma variável
    dbClient[index] = client // o localStorage na posição index recebe client (dados atualizados)
    setLocalStorage(dbClient) // manda para o banco de dados (localStorage)
}


//CRUD - READ
const readClient = () => getLocalStorage()



//CRUD - CREATE
const createClient = (client) => {
    const dbClient = getLocalStorage()
    dbClient.push (client)
    setLocalStorage(dbClient)
}

const validarDados = () => {
    return document.getElementById('form').reportValidity() //reporta se dados do html foram válidos
}


//NTERAÇÃO COM LAYOUT (USUÁRIO)
const limpaCampos = () => {
    const campos = document.querySelectorAll('.modal-field') // busca todos os campos pela classe
    campos.forEach(campos => campos.value = "") // varre todos os campos, pega cada um e retorna vazio
}


const saveClient = () => {
    if(validarDados()) {        //verifica se os campos são válidos
        const client = {        // constroi um novo cliente (criando um JSON) usando id's
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        celular: document.getElementById('celular').value,
        cidade: document.getElementById('cidade').value
        }
        createClient(client)    //cria um novo cliente (envia para o LocalStorage)
        updateTable()       //atualiza a tabela 
        closeModal() // limpa os campos e fecha o moldal (janela)
    }  
}

// FUNÇÃO PARA CRIAR UMA NOVA LINHA VAZIA E PREENCHER COM OS TD'S
const createRow = (client, index) => {
    const newRow = document.createElement('tr') //criA elemento tr e depois joga no html (innerhtml)
    newRow.innerHTML = `      
        <td>${client.nome}</td>
        <td>${client.email}</td> 
        <td>${client.celular}</td>
        <td>${client.cidade}</td>
        <td>
            <button type="button" class="button green" id="edit-${index}">Editar</button>
            <button type="button" class="button red" id="delete-${index}" >Excluir</button>
        </td>
    `
    document.querySelector('#tableClient>tbody').appendChild(newRow)
}


//FUNÇÃO PARA LIMPAR LINHAS
const clearTable = () => {
    const rows = document.querySelectorAll('#tableClient>tbody tr') // recebe a seleção de todas as linhas
    rows.forEach(row => row.parentNode.removeChild(row)) //pega todas as linhas e remove o filho do pai
}


//FUNÇÃO PARA ATUALIZAR A TABELA NA TELA INICIAL
const updateTable = () => {
    const dbClient = readClient() // lê o banco de dados (localStorage)
    clearTable()        //limpa a tabela
    dbClient.forEach(createRow)     //cria nova linha
}



//EVENTOS
document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

document.getElementById('salvar')
.addEventListener('click', saveClient)