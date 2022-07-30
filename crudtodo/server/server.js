//server
var express = require('express')
var cors = require('cors')
var mysql = require('mysql')
const e = require('express')
var server = express()
server.use(cors())
server.use(express.json())
server.listen(3000,()=>{console.log('Running on port 3000')})

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root6669',
    database:'todosystem'
})

server.post('/addtodos',(req,res)=>{
    const input = req.body.input;
    if (input != "") {
    connection.query("INSERT INTO todosystem.todotask (tasks) VALUES (?);",[input],
    (err,result)=>{
        if(err) {
            console.log(err)
        } else {
            res.send("complelete")
        }
    }
    )    
    } else return
    
})

server.get('/',(req,res)=>{
    connection.query("SELECT * FROM todosystem.todotask;",(err,result)=>{
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

server.put('/complete/:taskid',(req,res)=>{
    const taskid = req.params.taskid;
    connection.query("UPDATE todosystem.todotask SET complete = complete +1 WHERE taskid = ?",taskid,
    (err,result)=>{
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
})

server.delete('/deletetodos/:taskid',(req,res)=>{
    const taskid = req.params.taskid;
    connection.query("DELETE FROM todosystem.todotask WHERE (taskid = ?) ", taskid ,
    (err,result)=>{
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
})

server.put('/editsumbit/:taskid',(req,res)=>{
    const taskid = req.params.taskid;
    const editTodos = req.body.editTodos;
    if (editTodos !== "") {
        connection.query("UPDATE todosystem.todotask SET tasks = ?, editON = editON +1 WHERE taskid = ?;",
        [editTodos,taskid],
        (err,result)=>{
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        })
    }
})

server.put('/editclick/:taskid',(req,res)=>{
    const taskid = req.params.taskid
    connection.query("UPDATE todosystem.todotask SET editON = editON +1 WHERE taskid = ?;",taskid,
    (err,result)=>{
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    }
    )
}
)