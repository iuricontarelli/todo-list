"use strict"; // Habilita o modo estrito do JavaScript para garantir boas práticas de codificação.

// Array para armazenar as tarefas
let banco = [];

// Função para obter o banco de dados do armazenamento local
const getBanco = () => JSON.parse(localStorage.getItem("todoList")) ?? [];

// Função para definir o banco de dados no armazenamento local
const setBanco = (banco) =>
	localStorage.setItem("todoList", JSON.stringify(banco));

// Função para criar um item de tarefa na interface
const criarItem = (tarefa, status, indice) => {
	const item = document.createElement("label"); // Cria um elemento <label>
	item.classList.add("todo__item"); // Adiciona a classe "todo__item" ao elemento
	item.innerHTML = `
        <input type="checkbox" ${status} data-indice=${indice}>
        <div>${tarefa}</div>
        <input type="button" value="X" data-indice=${indice}>
    `; // Define o conteúdo HTML do elemento
	document.getElementById("todoList").appendChild(item); // Adiciona o elemento à lista de tarefas
};

// Função para limpar todas as tarefas da interface
const limparTarefas = () => {
	const todoList = document.getElementById("todoList"); // Obtém a lista de tarefas
	while (todoList.firstChild) {
		todoList.removeChild(todoList.lastChild); // Remove todos os filhos da lista de tarefas
	}
};

// Função para atualizar a tela com base no banco de dados
const atualizarTela = () => {
	limparTarefas(); // Limpa a tela
	const banco = getBanco(); // Obtém o banco de dados
	banco.forEach((item, indice) =>
		criarItem(item.tarefa, item.status, indice)
	); // Cria um item na interface para cada tarefa no banco de dados
};

// Função para inserir um item de tarefa
const inserirItem = (evento) => {
	const tecla = evento.key; // Obtém a tecla pressionada
	const texto = evento.target.value; // Obtém o texto do campo de entrada
	if (tecla === "Enter") {
		// Se a tecla pressionada for Enter
		const banco = getBanco(); // Obtém o banco de dados
		banco.push({ tarefa: texto, status: "" }); // Adiciona uma nova tarefa ao banco de dados
		setBanco(banco); // Atualiza o banco de dados no armazenamento local
		atualizarTela(); // Atualiza a tela com as novas tarefas
		evento.target.value = ""; // Limpa o campo de entrada
	}
};

// Função para remover um item de tarefa
const removerItem = (indice) => {
	const banco = getBanco(); // Obtém o banco de dados
	banco.splice(indice, 1); // Remove o item com o índice especificado do banco de dados
	setBanco(banco); // Atualiza o banco de dados no armazenamento local
	atualizarTela(); // Atualiza a tela após a remoção
};

// Função para atualizar o status de um item de tarefa (concluir/desconcluir)
const atualizarItem = (indice) => {
	const banco = getBanco(); // Obtém o banco de dados
	banco[indice].status = banco[indice].status === "" ? "checked" : ""; // Alterna o status do item
	setBanco(banco); // Atualiza o banco de dados no armazenamento local
	atualizarTela(); // Atualiza a tela após a alteração do status
};

// Função para lidar com cliques nos itens de tarefa
const clickItem = (evento) => {
	const elemento = evento.target; // Obtém o elemento clicado
	if (elemento.type === "button") {
		// Se o elemento for um botão
		const indice = elemento.dataset.indice; // Obtém o índice do item
		removerItem(indice); // Remove o item do banco de dados
	} else if (elemento.type === "checkbox") {
		// Se o elemento for uma caixa de seleção
		const indice = elemento.dataset.indice; // Obtém o índice do item
		atualizarItem(indice); // Atualiza o status do item no banco de dados
	}
};

// Adiciona ouvintes de eventos para inserção e clique de itens
document.getElementById("newItem").addEventListener("keypress", inserirItem);
document.getElementById("todoList").addEventListener("click", clickItem);

// Inicializa a tela com base no banco de dados
atualizarTela();
