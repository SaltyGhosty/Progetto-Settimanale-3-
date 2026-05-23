let videogiochi = [
    { id: 0, nome: "Soulframe", developer: "Digital Extremes", anno: "2026", stato: "giocato" },
    { id: 1, nome: "Subnautica 2", developer: "Unknown Worlds Entertainment", anno: "2026", stato: "da giocare" },
    { id: 2, nome: "Dune: Awakening", developer: "Funcom", anno: "2025", stato: "giocato" },
    { id: 3, nome: "Pragmata", developer: "Capcom", anno: "2026", stato: "giocato" },
    { id: 4, nome: "Final Fantasy VII", developer: "Square", anno: "1997", stato: "da giocare" }
];

let bottoneTema = document.getElementById("button-tema");
if (bottoneTema) {
    bottoneTema.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        if (document.body.classList.contains("dark-mode")) {
            bottoneTema.textContent = "Tema chiaro";
        } else {
            bottoneTema.textContent = "Tema scuro";
        }
    });
}

function renderVideogiochi() {
    let contenitoreLista = document.getElementById("lista-videogiochi");
    if (!contenitoreLista) return;
    contenitoreLista.innerHTML = "";

    let valoreRicerca = document.getElementById("titoloVideogioco_o_autore").value.toLowerCase();
    let valoreFiltro = document.getElementById("statoLista").value;
    let valoreOrdine = document.getElementById("annata").value;

    let lista = [];
    for (let i = 0; i < videogiochi.length; i++) {
        let g = videogiochi[i];

        let corrispondeRicerca =
            g.nome.toLowerCase().includes(valoreRicerca) ||
            g.developer.toLowerCase().includes(valoreRicerca);

        let corrispondeFiltro =
            valoreFiltro === "giocatiTutti" ||
            (valoreFiltro === "videogiochiGiaGiocati" && g.stato === "giocato") ||
            (valoreFiltro === "videogiochiDaGiocare" && g.stato === "da giocare");

        if (corrispondeRicerca && corrispondeFiltro) {
            lista.push(g);
        }
    }

    lista.sort(function (a, b) {
        if (valoreOrdine === "annoCrescente") {
            return Number(a.anno) - Number(b.anno);
        } else {
            return Number(b.anno) - Number(a.anno);
        }
    });

    for (let i = 0; i < lista.length; i++) {
        let gioco = lista[i];

        let riga = document.createElement("div");
        riga.className = "gioco-item";
        if (gioco.stato === "giocato") {
            riga.classList.add("stato-giocato");
        } else {
            riga.classList.add("stato-da-giocare");
        }

        let bloccoTesto = document.createElement("div");
        bloccoTesto.className = "gioco-testi";

        let titolo = document.createElement("strong");
        titolo.className = "gioco-titolo";
        titolo.textContent = gioco.nome;

        let meta = document.createElement("span");
        meta.className = "gioco-meta";
        meta.textContent = gioco.developer + " — " + gioco.anno;

        bloccoTesto.appendChild(titolo);
        bloccoTesto.appendChild(meta);

        let badge = document.createElement("span");
        if (gioco.stato === "giocato") {
            badge.className = "gioco-badge badge-giocato";
            badge.textContent = "Giocato";
        } else {
            badge.className = "gioco-badge badge-da-giocare";
            badge.textContent = "Da giocare";
        }

        let bottoneStato = document.createElement("button");
        bottoneStato.type = "button";
        bottoneStato.className = "bottone-azione bottone-stato";
        if (gioco.stato === "giocato") {
            bottoneStato.textContent = "Segna da giocare";
        } else {
            bottoneStato.textContent = "Segna giocato";
        }
        bottoneStato.addEventListener("click", function () {
            for (let j = 0; j < videogiochi.length; j++) {
                if (videogiochi[j].id === gioco.id) {
                    if (videogiochi[j].stato === "giocato") {
                        videogiochi[j].stato = "da giocare";
                    } else {
                        videogiochi[j].stato = "giocato";
                    }
                    break;
                }
            }
            renderVideogiochi();
        });

        let bottoneModifica = document.createElement("button");
        bottoneModifica.type = "button";
        bottoneModifica.className = "bottone-azione bottone-modifica";
        bottoneModifica.textContent = "Modifica";
        bottoneModifica.addEventListener("click", function () {
            let nuovoNome = prompt("Nuovo titolo:", gioco.nome);
            if (nuovoNome && nuovoNome.trim() !== "") {
                for (let j = 0; j < videogiochi.length; j++) {
                    if (videogiochi[j].id === gioco.id) {
                        videogiochi[j].nome = nuovoNome.trim();
                        break;
                    }
                }
                renderVideogiochi();
            }
        });

        let bottoneElimina = document.createElement("button");
        bottoneElimina.type = "button";
        bottoneElimina.className = "bottone-azione bottone-elimina";
        bottoneElimina.textContent = "Elimina";
        bottoneElimina.addEventListener("click", function () {
            videogiochi = videogiochi.filter(function (g) {
                return g.id !== gioco.id;
            });
            renderVideogiochi();
        });

        riga.appendChild(bloccoTesto);
        riga.appendChild(badge);
        riga.appendChild(bottoneStato);
        riga.appendChild(bottoneModifica);
        riga.appendChild(bottoneElimina);
        contenitoreLista.appendChild(riga);
    }

    // Statistiche
    let giocati = videogiochi.filter(function (g) { return g.stato === "giocato"; }).length;
    let daGiocare = videogiochi.filter(function (g) { return g.stato === "da giocare"; }).length;
    let totali = videogiochi.length;

    document.getElementById("stat-totali").textContent = totali;
    document.getElementById("stat-giocati").textContent = giocati;
    document.getElementById("stat-daGiocare").textContent = daGiocare;

    let percentuale = totali > 0 ? (giocati / totali) * 100 : 0;
    let barra = document.getElementById("stat-barra");
    if (barra) {
        barra.style.width = percentuale + "%";
    }
}

// Form aggiunta
let formInserimento = document.getElementById("primoForm");
if (formInserimento) {
    formInserimento.addEventListener("submit", function (event) {
        event.preventDefault();

        let inputTitolo = document.getElementById("titoloVideogioco");
        let inputDeveloper = document.getElementById("aggiungiDeveloper");
        let inputAnno = document.getElementById("aggiungiAnno");
        let selectStato = document.getElementById("statoVideogioco");

        if (inputTitolo.value.trim() === "") {
            alert("Inserisci almeno il titolo del videogioco!");
            return;
        }

        let statoSelezionato = "";
        if (selectStato.value === "da-giocare") {
            statoSelezionato = "da giocare";
        } else {
            statoSelezionato = "giocato";
        }

        let nuovoGioco = {
            id: Date.now(),
            nome: inputTitolo.value.trim(),
            developer: inputDeveloper.value.trim() || "Sconosciuto",
            anno: inputAnno.value || "—",
            stato: statoSelezionato
        };

        videogiochi.push(nuovoGioco);
        formInserimento.reset();
        renderVideogiochi();
    });
}
setTimeout(() => {
    document.querySelector("#notifica").style.display = "none";
  }, 3000);
function notifica(testo) {
  document.querySelector("#notifica").textContent = testo;
  document.querySelector("#notifica").style.display = "block";
}
document.getElementById("titoloVideogioco_o_autore").addEventListener("input", renderVideogiochi);
document.getElementById("statoLista").addEventListener("input", renderVideogiochi);
document.getElementById("annata").addEventListener("input", renderVideogiochi);

renderVideogiochi();
