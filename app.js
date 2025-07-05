
let token = "";
const userId = "user@example.com";

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("https://salusopp-backend.railway.internal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.token) {
      token = data.token;
      document.getElementById("login").style.display = "none";
      document.getElementById("painel").style.display = "block";
      carregarNFTs();
      carregarObra();
      carregarDocumentos();
    } else {
      document.getElementById("loginError").innerText = "Login inválido.";
    }
  } catch (error) {
    console.error("Erro ao conectar com o backend:", error);
    document.getElementById("loginError").innerText = "Erro ao conectar com o servidor.";
  }
}

async function carregarNFTs() {
  const res = await fetch("http://localhost:5000/nfts");
  const nfts = await res.json();
  const div = document.getElementById("nfts");
  nfts.forEach(nft => {
    div.innerHTML += `<div class="card"><div>NFT #${nft.tokenId}<br>Participação: ${nft.participacao}</div></div>`;
  });
}

async function carregarObra() {
  const res = await fetch("http://localhost:5000/obra");
  const etapas = await res.json();
  const div = document.getElementById("obra");
  etapas.forEach(etapa => {
    div.innerHTML += `
      <div class="card">
        <div>
          <strong>${etapa.titulo}</strong><br>${etapa.descricao}
        </div>
        ${etapa.imagem ? `<img src="${etapa.imagem}">` : ""}
      </div>`;
  });
}

async function carregarDocumentos() {
  const res = await fetch(`http://localhost:5000/documentos/${userId}`);
  const docs = await res.json();
  const div = document.getElementById("docs");
  if (docs.length === 0) {
    div.innerHTML += "<p>Nenhum documento disponível.</p>";
    return;
  }
  docs.forEach(doc => {
    div.innerHTML += `<div class="card"><a href="${doc.url}" target="_blank">${doc.nome}</a></div>`;
  });
}

<script src="app.js"></script>
