
/* ========================================
   CONFIGURAÇÕES
======================================== */

const reduzirMovimento = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

const esperar = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));


/* ========================================
   MENSAGENS DINÂMICAS
======================================== */

const mensagens = [
  "Desenvolvimento Full Stack",
  "Engenharia de Software",
  "Transformando ideias em código",
  "Construindo soluções reais",
  "HTML · CSS · JavaScript",
  "Node.js · React · Firebase"
];

const elemento = document.getElementById("texto-dinamico");

async function animarMensagens() {
  if (!elemento) return;

  if (reduzirMovimento) {
    elemento.textContent = mensagens[0];
    return;
  }

  let indiceMensagem = 0;

  while (true) {
    const mensagem = mensagens[indiceMensagem];

    // Digita a mensagem
    for (let i = 1; i <= mensagem.length; i++) {
      elemento.textContent = mensagem.slice(0, i);
      await esperar(75);
    }

    // Aguarda antes de apagar
    await esperar(2200);

    // Apaga a mensagem
    for (let i = mensagem.length; i >= 0; i--) {
      elemento.textContent = mensagem.slice(0, i);
      await esperar(40);
    }

    await esperar(400);

    indiceMensagem =
      (indiceMensagem + 1) % mensagens.length;
  }
}


/* ========================================
   TERMINAL ANIMADO
======================================== */

const terminalSaida = document.getElementById("terminal-saida");

const comandos = [
  {
    comando: "whoami",
    resposta:
      "victor-hugo · desenvolvedor de software\n" +
      "engenharia de software (em andamento)"
  },
  {
    comando: "ls projetos/",
    resposta:
      "ecommerce-platform/  Firebase · Vite · Admin\n" +
      "projetos-web/  HTML · CSS · JavaScript\n" +
      "portfolio-pessoal/  HTML · CSS · JavaScript"
  },
  {
    comando: "cat stack.txt",
    resposta:
      "Node.js · Next.js · React\n" +
      "Firebase · MySQL · Firestore"
  },
  {
    comando: "uname -s",
    resposta: "Linux · Windows"
  },
  {
    comando: "echo $STATUS",
    resposta: "Construindo soluções reais..."
  }
];

async function digitar(elementoDestino, texto, velocidade = 65) {
  for (const letra of texto) {
    elementoDestino.textContent += letra;
    await esperar(velocidade);
  }
}

async function animarTerminal() {
  if (!terminalSaida) return;

  if (reduzirMovimento) {
    terminalSaida.textContent =
      "$ whoami\n" +
      comandos[0].resposta +
      "\n\n$ ls projetos/\n" +
      comandos[1].resposta;

    return;
  }

  while (true) {
    terminalSaida.replaceChildren();

    for (const item of comandos) {
      // Linha do comando
      const linha = document.createElement("div");
      linha.className = "terminal-linha terminal-comando";

      const prompt = document.createElement("span");
      prompt.className = "terminal-prompt";
      prompt.textContent = "$";

      const textoComando = document.createElement("span");

      linha.append(prompt, textoComando);
      terminalSaida.appendChild(linha);

      // Digita o comando
      await digitar(textoComando, item.comando);

      await esperar(350);

      // Mostra a resposta
      const resposta = document.createElement("div");
      resposta.className =
        "terminal-linha terminal-resposta-animada";

      resposta.textContent = item.resposta;
      terminalSaida.appendChild(resposta);

      await esperar(1500);

      // Evita excesso de linhas no terminal
      while (terminalSaida.children.length > 6) {
        terminalSaida.firstElementChild.remove();
      }
    }

    await esperar(2500);
  }
}


/* ========================================
   INICIALIZAÇÃO
======================================== */

animarMensagens();
animarTerminal();
