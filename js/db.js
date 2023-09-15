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
        const ul = document.createElement('ul');
        values.forEach((value) => {
            const li = document.createElement('li');
            li.textContent = `Nome: ${value.nome}, Idade: ${value.idade}`;
            ul.appendChild(li);
        });
        document.querySelector("output").appendChild(ul);
    } else {
        showResult("Não há nenhum dado no banco!");
    }
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