// Cadastro de Clientes
const cliente = {
    identificacao: {
        nome: "Lívia Arruda",
        tratamento: "Sra.",
        nomeEscolhido: "Lívia",
    },
    saldo: "100.00"
};

// Array de objetos com transações
const transacoes = []

// mostrar Saldo
function saldoInicialNumero() {
    return Number(cliente.saldo.replace(",", ".")); //Chat GPT
}


function calcularSaldoAtual() {
    let saldo = saldoInicialNumero();

    for (const t of transacoes) {
        if (t.tipo === "entrada") saldo += t.valor;
        else saldo -= t.valor;
    }

    return saldo;
}


function criarTransacao(tipoBotao, valor, descricao) {
    const tipoMovimento = (tipoBotao === "deposito") ? "entrada" : "saida";

    return {
        id: Date.now(),
        data: new Date().toLocaleDateString("pt-BR"),
        descricao,
        tipo: tipoMovimento, // "entrada" ou "saida"
        valor
    };
}

function adicionarTransacao(transacao) {
  if (transacao.tipo === "saida") {
    const saldoAtual = calcularSaldoAtual();

    if (transacao.valor > saldoAtual) {
      throw new Error(
        `Saldo insuficiente. Saldo atual: R$ ${saldoAtual.toFixed(2)}`
      );
    }
  }

  transacoes.push(transacao);
}

function novaTransacao(tipo) {
    try {
        let valorStr = prompt("Digite o valor:");
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

        // Cria e adiciona Transação
        const transacao = criarTransacao(tipo, valor, descricao);
        adicionarTransacao(transacao);

        renderizarCabecalho();
        filtrarExtrato();

    } catch (erro) {
        alert(`Transação não realizada.\n${erro.message}`);
        console.error(erro);
    }
}

function filtrarTransacoes(filtro) {
  if (filtro === "todos") return transacoes;
  return transacoes.filter(t => t.tipo === filtro);
}