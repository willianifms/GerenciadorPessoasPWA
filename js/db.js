import { openDB } from "idb";

let db;
let nome;
let idade;

async function createDB() { 
    try {
        db = await openDB( 'banco', 1, {
        upgrade(db, oldVersion, newVersion, transaction) { 
            switch (oldVersion) {
            case 0:
            case 1:
            const store = db.createObjectStore('pessoas', { 
                keyPath: 'nome'
            });
            store.createIndex('id', 'id');
            showResult("Banco de dados criado.");
            }
        }
        });
        showResult("Banco de dados aberto."); 
    } catch (e) {
    showResult("Erro ao criar o banco de dados: " + e.message)
    }
}

window.addEventListener("DOMContentLoaded", async event => { 
    createDB(); 
    document.getElementById("btnSalvar").addEventListener("click", addData); 
    document.getElementById("btnListar").addEventListener("click", getData); 
});

async function addData() {
    nome = document.getElementById("inputnome").value;
    idade = document.getElementById("inputidade").value;
    const tx = await db.transaction('pessoas', 'readwrite');
    const store = tx.objectStore('pessoas');
    store.add({ nome: nome, idade: idade   }); 
    await tx.done;

    document.getElementById("inputnome").value = "";
    document.getElementById("inputidade").value = "";
}

async function getData() {
    if (db == undefined) {
        showResult("O banco de dados está fechado"); return;
    }
    const tx = await db.transaction('pessoas', 'readonly') 
    const store = tx.objectStore('pessoas');
    const values = await store.getAll();

    if (values.length > 0) {
        clearResult();
        values.forEach((value) => {
            createCard(value);
        });
    } else {
        showResult("Não há nenhum dado no banco!");
    }
}

function createCard(value) {
    const card = document.createElement('div');
    card.className = 'card';
    
    const content = document.createElement('p');
    content.textContent = `Nome: ${value.nome}, Idade: ${value.idade}`;
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Deletar';
    deleteButton.addEventListener('click', () => deleteData(value.nome));
    
    const updateButton = document.createElement('button');
    updateButton.textContent = 'Atualizar';
    updateButton.addEventListener('click', () => updateData(value.nome));
    
    card.appendChild(content);
    card.appendChild(deleteButton);
    card.appendChild(updateButton);
    
    document.querySelector("output").appendChild(card);
}

async function deleteData(nome) {
    const tx = await db.transaction('pessoas', 'readwrite');
    const store = tx.objectStore('pessoas');
    
    await store.delete(nome);
    
    await tx.done;
    
    clearResult();
}

async function updateData(nome) {
    const newIdade = prompt("Digite a nova idade");
    
    const tx = await db.transaction('pessoas', 'readwrite');
    const store = tx.objectStore('pessoas');
    
    let data = await store.get(nome);
    
    data.idade = newIdade;
    
    await store.put(data);
    
    await tx.done;
    
    clearResult();
}

function clearResult() {
  const output = document.querySelector("output");
  while (output.firstChild) {
      output.removeChild(output.firstChild);
  }
}

function showResult(text) {
  document.querySelector("output").innerHTML = text;
}
