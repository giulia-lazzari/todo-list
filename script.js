let inputTesto = document.getElementById("todo-input");
let bottoneAggiungi = document.getElementById("add-btn");
let lista = document.getElementById("todo-list");

let listaAttivita = JSON.parse(localStorage.getItem("attivita")) || [];

// Mostra lista
function mostraLista() {
  lista.innerHTML = "";

  if (listaAttivita.length === 0) {
    lista.innerHTML = "<p class='empty'>Nessuna attività</p>";
    return;
  }

  listaAttivita.forEach(function(attivita) {
    let elemento = document.createElement("li");

    let testo = document.createElement("span");
    testo.textContent = attivita.testo;

    if (attivita.fatta) {
      testo.classList.add("completed");
    }

    let contenitore = document.createElement("div");

    let bottoneFatto = document.createElement("button");
    bottoneFatto.textContent = "✔";
    bottoneFatto.addEventListener("click", function() {
      cambiaStato(attivita.id);
    });

    let bottoneCancella = document.createElement("button");
    bottoneCancella.textContent = "❌";
    bottoneCancella.addEventListener("click", function() {
      elimina(attivita.id);
    });

    contenitore.appendChild(bottoneFatto);
    contenitore.appendChild(bottoneCancella);

    elemento.appendChild(testo);
    elemento.appendChild(contenitore);

    lista.appendChild(elemento);
  });

  salva();
}

// Aggiungi attività
function aggiungi() {
  let testo = inputTesto.value.trim();

  if (testo === "") return;

  let nuova = {
    id: Date.now(),
    testo: testo,
    fatta: false
  };

  listaAttivita.push(nuova);
  inputTesto.value = "";

  mostraLista();
}

// Eventi
bottoneAggiungi.addEventListener("click", aggiungi);

inputTesto.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    aggiungi();
  }
});

// Cambia stato
function cambiaStato(id) {
  listaAttivita = listaAttivita.map(function(el) {
    if (el.id === id) {
      return {
        id: el.id,
        testo: el.testo,
        fatta: !el.fatta
      };
    }
    return el;
  });

  mostraLista();
}

// Elimina
function elimina(id) {
  listaAttivita = listaAttivita.filter(function(el) {
    return el.id !== id;
  });

  mostraLista();
}

// Salva
function salva() {
  localStorage.setItem("attivita", JSON.stringify(listaAttivita));
}

// Avvio
mostraLista();