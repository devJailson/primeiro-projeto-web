const http = require("http");
const fs = require("fs");
const path = require("path");

const servidor = http.createServer((req, res) => {
  let arquivo = req.url;

  if (arquivo === "/") {
    arquivo = "/index.html";
  }

  const caminho = path.join(__dirname, "..", arquivo);

  const extensao = path.extname(caminho);

  let tipo = "text/html";

  if (extensao === ".css") {
    tipo = "text/css";
  } else if (extensao === ".js") {
    tipo = "text/javascript";
  }

  fs.readFile(caminho, (erro, conteudo) => {
    if (erro) {
      res.writeHead(404);
      res.end("Arquivo não encontrado");
      return;
    }

    res.writeHead(200, { "Content-Type": tipo });
    res.end(conteudo);
  });
});

servidor.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});