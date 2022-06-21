'use strict'
/* eslint-env node, es6 */

const PORT = 8000
const express = require('express')
const mysql = require('mysql')

const MYSQL_PASSWORD = "localhost"
const MYSQL_USER = "root"
const MYSQL_HOST = "01123581321"
const MYSQL_DATABASE = "test"

//create mysql connection
const db = mysql.createConnection({
    host : MYSQL_HOST,
    user : MYSQL_USER,
    password : MYSQL_PASSWORD,
    database : MYSQL_DATABASE
})

//connect
db.connect(function(err) {
    if (err) {
        throw err
    }
    console.log("mySQL connected")
})

//create express app
const app = express()

//home page import
const generateHomePage = require('./pages/index-get.js')


//send data when the get method is used on root
app.get('/', async function(req,res) {
    const indexHTML = await generateHomePage('root.html')
    res.send(indexHTML)
})

app.get('/user', async function(req,res) {
    const indexHTML = await generateHomePage('user.html')
    res.send(indexHTML)
})

app.get('/conversation',async function(req,res) {
    const indexHTML = await generateHomePage('conversation.html')
    res.send(indexHTML)
})

app.use('/styles', express.static('C:/Users/tsuna/Desktop/Messagerie-Website/api/styles'))
app.use('/images', express.static('C:/Users/tsuna/Desktop/Messagerie-Website/api/images'))

//create server on port
app.listen(PORT , function() {
    console.log(`Server started on : http://localhost:${PORT}`)
})