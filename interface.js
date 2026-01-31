function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
} // Chat GPT

function renderizarCabecalho() {
    const nomeEl = document.getElementById("nome-usuario");
    const saldoEl = document.getElementById("saldo");

    nomeEl.textContent =
        `${cliente.identificacao.tratamento} ${cliente.identificacao.nomeEscolhido}`;

    const saldoAtual = calcularSaldoAtual();
    saldoEl.textContent = formatarMoeda(saldoAtual);
}


function renderizarExtrato(lista = transacoes) {
    const tbody = document.getElementById("lista-transacoes");
    tbody.innerHTML = "";

    if (lista.length === 0) {
        const tr = document.createElement("tr");
        const td = document.createElement("td");
        td.colSpan = 3;
        td.textContent = "Nenhuma transação registrada.";
        tr.appendChild(td);
        tbody.appendChild(tr);
        return;
    }

    for (const t of lista) {
        const tr = document.createElement("tr");

        const tdData = document.createElement("td");
        tdData.textContent = t.data;

        const tdDesc = document.createElement("td");
        tdDesc.textContent = t.descricao;

        const tdValor = document.createElement("td");
        const sinal = (t.tipo === "entrada") ? "+" : "-";
        tdValor.textContent = `${sinal} R$ ${formatarMoeda(t.valor)}`;

        // CSS
        tdValor.classList.add(t.tipo);

        tr.appendChild(tdData);
        tr.appendChild(tdDesc);
        tr.appendChild(tdValor);

        tbody.appendChild(tr);
    }
}

function filtrarExtrato() {
    const filtro = document.getElementById("filtro-tipo").value;
    const lista = filtrarTransacoes(filtro);
    renderizarExtrato(lista);
}

function novaTransacao(tipo) {
    try {
        let valorStr = prompt("Digite o valor (ex: 50,00):");
        if (valorStr === null) return;

        valorStr = valorStr.trim().replace(",", ".");
        const valor = Number(valorStr);

        if (!Number.isFinite(valor)) {
        alert("Valor inválido! Digite apenas números. Ex: 10,50");
        return;
        }
        if (valor <= 0) {
        alert("O valor deve ser maior que zero.");
        return;
        }

        let descricao = prompt("Digite a descrição:");
        if (descricao === null) return;

        descricao = descricao.trim();
        if (descricao.length === 0) {
        alert("A descrição não pode ficar vazia.");
        return;
        }

        const transacao = criarTransacao(tipo, valor, descricao);
        adicionarTransacao(transacao);

        renderizarCabecalho();
        filtrarExtrato();

    } catch (erro) {
        alert(`Transação não realizada.\nMotivo: ${erro.message}`);
        console.error(erro);
    }
}

renderizarCabecalho();
renderizarExtrato();