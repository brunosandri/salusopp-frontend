/* ---------- CONFIG ---------- */
const BASE_URL = "https://salusopp-backend-production.up.railway.app";

/* ---------- FUNÇÃO DE LOGIN ---------- */
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch(BASE_URL + "/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();

    if (data.token) {
      // grava token + email para o painel
      localStorage.setItem("token", data.token);
      localStorage.setItem("email", email);

      // redireciona para o painel
      window.location.href = "painel.html";
    } else {
      document.getElementById("loginError").innerText = "Login inválido.";
    }
  } catch (error) {
    console.error("Erro ao conectar com o backend:", error);
    document.getElementById("loginError").innerText =
      "Erro ao conectar com o servidor.";
  }
}

/* ---------- FUNÇÕES DO PAINEL ---------- */
async function carregarNFTs() {
  const res = await fetch(BASE_URL + "/nfts");
  const nfts = await res.json();
  const div = document.getElementById("nfts");
  div.innerHTML = "";                          // limpa antes de inserir
  nfts.forEach(nft => {
    div.innerHTML += `
      <div class="card">
        NFT #${nft.tokenId}<br>
        Participação: ${nft.participacao}
      </div>`;
  });
}

async function carregarObra() {
  const res = await fetch(BASE_URL + "/obra");
  const etapas = await res.json();
  const div = document.getElementById("obra");
  div.innerHTML = "";
  etapas.forEach(etapa => {
    div.innerHTML += `
      <div class="card">
        <strong>${etapa.titulo}</strong><br>
        ${etapa.descricao}
        ${etapa.imagem ? `<img src="${etapa.imagem}">` : ""}
      </div>`;
  });
}

async function carregarDocumentos() {
  const email = localStorage.getItem("email");  // usa o email salvo
  const res = await fetch(BASE_URL + "/documentos/" + encodeURIComponent(email));
  const docs = await res.json();
  const div = document.getElementById("docs");
  div.innerHTML = "";
  if (docs.length === 0) {
    div.innerHTML = "<p>Nenhum documento disponível.</p>";
    return;
  }
  docs.forEach(doc => {
    div.innerHTML += `
      <div class="card">
        <a href="${doc.url}" target="_blank">${doc.nome}</a>
      </div>`;
  });
}