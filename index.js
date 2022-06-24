'use strict'
/* eslint-env node, es6 */

const PORT = 8000
const express = require('express')
const mysql = require('mysql')
const bcrypt = require('bcrypt')

const MYSQL_HOST = "localhost"
const MYSQL_USER = "root"
const MYSQL_PASSWORD = "01123581321"
const MYSQL_DATABASE = "test"

//create mysql connection
const db = mysql.createConnection({
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE
})

//connect
db.connect(function (err) {
    if (err) {
        throw err
    }
    console.log("mySQL connected")
})

//create express app
const app = express()

//page import
const generatePage = require('./pages/scripts/index-get.js')

//send data when the get method is used on root
app.get('/', async function (req, res) {
    const indexHTML = await generatePage('root.html')
    res.send(indexHTML)
})

app.get('/user', async function (req, res) {
    const indexHTML = await generatePage('user.html')
    res.send(indexHTML)
})

app.get('/conversation', async function (req, res) {
    const indexHTML = await generatePage('conversation.html')
    res.send(indexHTML)
})

app.get('/test', async function (req, res) {
    let user = await findUserID("brigite")
    console.log(user)
})

// app.use('/scripts', express.static('./pages/scripts'))
// app.use('/images', express.static('./images'))

//create server on port
app.listen(PORT, function () {
    console.log(`Server started on : http://localhost:${PORT}`)
    console.log(`test on : http://localhost:${PORT}/test`)
})

//function start
{
function createConversation(convName) {
    let sql = "insert into conversation (conversationName) values ('" + convName + "')"
    execSQL(sql)
}

function findConvID(convName) {
    let sql = "select conversationID from conversation where conversationName = '" + convName + "'"
    let convIDs = execSQL(sql)
    return convIDs
}

function createUser(userName,password,mail) {
    let sql = "insert into user (userName, userPassword,mail) values ('" + userName + "','" + hashPassword(password) + "','"+ mail +"')"
    execSQL(sql)
}

async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(password,salt)
    return hashed
}

function CheckPassword(userID,hashedPassword) {
    let sql = "select * from user where userID = " + userID + " and userPassword = '" + hashedPassword + "'"
    let user = execSQL(sql)
    return user
}

function findUserID(userName) {
    let sql = "select userID from user where userName = '" + userName + "'"
    let userIDs = execSQL(sql)
    return userIDs
}

function createLinker(userID,convID) {
    let sql = "insert into userconvlink (userID, conversationID) values (" + userID + "," + convID +")"
    execSQL(sql)
}

function createMessage(userID,convID,content) {
    let messageOrder = (execSQL("select * from message where conversationID = " + convID)).length + 1
    let sql = "insert into message (conversationID, userID, content, messageOrder) values ("+ convID + "," + userID + "," + content + ", " + messageOrder +")"
    execSQL(sql)
}

function getMessage(convID) {
    let sql = "select * from message where conversationID = " + convID + " order by messageOrder asc"
    let messages = execSQL(sql)
    return messages
}

async function execSQL(sql) {
    return new Promise(function (resolve, reject) {
        db.query(sql, function (err, res) {
            if (err) { console.log(sql, " could not be executed properly"); return }
            return err ? reject(err) : resolve(res)
        })
    })
}

function test() {
    console.log("it work fine")
}

}