//server
var express = require('express')
var cors = require('cors')
const mysql = require('mysql')
var port_number = process.env.PORT || 3000
const database = 'n078766yizzhxg00'
var server = express()
server.use(cors())
server.use(express.json())
server.listen(port_number)

const connection = mysql.createConnection({
  host: 'XXX',
  port: 'XXX',
  user: 'XXX',
  password: 'XXX',
  database: 'XXX',
})

server.post('/addtodos', (req, res) => {
  const input = req.body.input
  if (input != '') {
    connection.query(
      `INSERT INTO ${database}.todotask (tasks) VALUES (?);`,
      [input],
      (err, result) => {
        if (err) {
          console.log(err)
        } else {
          res.send('complelete')
        }
      }
    )
  } else return
})

server.get('/', (req, res) => {
  connection.query(`SELECT * FROM ${database}.todotask;`, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
})

server.put('/complete/:taskid', (req, res) => {
  const taskid = req.params.taskid
  connection.query(
    `UPDATE ${database}.todotask SET complete = complete +1 WHERE taskid = ?`,
    taskid,
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    }
  )
})

server.delete('/deletetodos/:taskid', (req, res) => {
  const taskid = req.params.taskid
  connection.query(
    `DELETE FROM ${database}.todotask WHERE (taskid = ?)`,
    taskid,
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    }
  )
})

server.put('/editsumbit/:taskid', (req, res) => {
  const taskid = req.params.taskid
  const editTodos = req.body.editTodos
  if (editTodos !== '') {
    connection.query(
      `UPDATE ${database}.todotask SET tasks = ?, editON = editON +1 WHERE taskid = ?;`,
      [editTodos, taskid],
      (err, result) => {
        if (err) {
          console.log(err)
        } else {
          res.send(result)
        }
      }
    )
  }
})

server.put('/editclick/:taskid', (req, res) => {
  const taskid = req.params.taskid
  connection.query(
    `UPDATE ${database}.todotask SET editON = editON +1 WHERE taskid = ?;`,
    taskid,
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    }
  )
})
