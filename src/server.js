const express = require("express") //instanciando o express para criação do servidor
const server = express()

//PEGAR O BANCO
const db = require("./database/db")



//configurando pasta publica(assets, scripts, styles)
server.use(express.static("public")) //arquivos estaticos(express.static)para arquivos estaticos, css, imagens e etc

//Habilitar o uso do req.body
server.use(express.urlencoded({extended: true}))

//usando template engine - nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})


//configurando caminho da aplicação para página inicial - req: requisição / res: resposta - CONFIGURAÇÃO DE ROTA
//IR NO HTML E CONFIGURAR A ROTA PARA BUSCAR ESSE CAMINHO <a href="/"> O BARRA É O CAMINHO QUE FOI CONFIGURADO ABAIXO
server.get("/", (req, res) => {
   return res.render("index.html", {tittle: "Um titulo"})
})

//USANDO RENDER PARA NUNJUCKS
server.get("/create-point", (req, res) => {

    //console.log(req.query)

    //req.query são as strings que vem da URL quando submetemos o formulário

    return res.render("create-point.html")
})


server.post("/savepoint", (req, res) => {
    
    //req.body é o corpo do formulário
    console.log(req.body)
  
      // console.log(req.query) -> ele recebe todos os dados brutos em forma de objeto
    

      const query = `
      INSERT INTO PLACES(
          image,
          name,
          adress,
          adress2,
          state,
          city,
          items
      ) VALUES (?,?,?,?,?,?,?);
      `

      values  = [
      req.body.image,
      req.body.name,
      req.body.address,
      req.body.address2,
      req.body.state,
      req.body.city,
      req.body.items
  ]
   
  
  function afterInsertData(err){

    if(err){
        console.log(err)
        return res.send("Erro no cadastro")
    }
    console.log("Cadastrado com sucesso")
    console.log(this)
    return res.render("create-point.html", {saved: true})
}  

    db.run(query, values, afterInsertData)
})



//USANDO RENDER PARA NUNJUCKS
server.get("/search", (req, res) => {
    
    const search = req.query.search

    if(search == ""){
        //pesquisa vazia
        return res.render("search-results.html", {total: 0})
    }


    //pegar dados do banco de dados e mostrar
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){
        if(err){
            return console.log(err)
        }
        const total = rows.length

        //mostrar na tela o resultado
        return res.render("search-results.html", {places: rows, total: total})

    })

})


//ligar o servidor
server.listen(3000)