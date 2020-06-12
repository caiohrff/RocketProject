//importar a dependecia sql3
const sqlite3 = require("sqlite3").verbose()

//criar objetos que ira fazero operações do banco
const db = new sqlite3.Database("./src/database/database.db") //new sqlite3.Database -> construtor da classe
module.exports = db
//utilizar o banco para operações
db.serialize(() =>{

//     // //criar uma tabela
//     // db.run(`
//     //     CREATE TABLE IF NOT EXISTS places (
//     //         id INTEGER PRIMARY KEY AUTOINCREMENT,
//     //         image TEXT,
//     //         name TEXT,
//     //         adress TEXT,
//     //         adress2 TEXT,
//     //         state TEXT,
//     //         city TEXT,
//     //         items TEXT
//     //     );
//     // `)

//     // //Insert
//     // const query = `
//     //     INSERT INTO PLACES(
//     //         image,
//     //         name,
//     //         adress,
//     //         adress2,
//     //         state,
//     //         city,
//     //         items
//     //     ) VALUES (?,?,?,?,?,?,?);
//     //     `

//     //     values  = [
//     //     "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
//     //     "Papersider",
//     //     "Guilherme Gemballa, Jardim América",
//     //     "Número 260",
//     //     "Santa Catarina",
//     //     "Rio do Sul",
//     //     "Resíduos eletrônicos e lâmpadas"
//     // ]


//     // function afterInsertData(err){

//     //     if(err){
//     //         return  console.log(err)
//     //     }
//     //     console.log("Cadastrado com sucesso")
//     //     console.log(this)

//     // }       

//     // db.run(query, values, afterInsertData)

    //Select
    // db.all(`SELECT * FROM places`, function(err, rows){
    //     if(err){
    //         return  console.log(err)
    //     }
    //     console.log("Registros")
    //     console.log(rows)
    // })

   // Delete

    // db.run(`DELETE FROM places WHERE id = ?`,[4], function(err){
    //     if(err){
    //         return  console.log(err)
    //     }
    //     console.log("Deletado com sucesso")
    // })
})