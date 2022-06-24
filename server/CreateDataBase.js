//WARNING THIS IS ONLY FOR SETING UP ON OTHER MYSQL ACCOUNT

const express = require('express')
const mysql = require('mysql')

const MYSQL_PASSWORD = ""
const MYSQL_USER = ""
const MYSQL_HOST = ""

//create mysql connection
const db = mysql.createConnection({
    host : MYSQL_HOST,
    user : MYSQL_USER,
    password : MYSQL_PASSWORD,
})

db.connect(function(err) {
    if (err) {
        throw err
    }
    console.log("mySQL connected")
})

const sqluser = 'create table user(userID int auto_increment, userName varchar(255), dateOfCreation varchar(255), userPassword varchar(255), mail varchar(255));'
const sqlconv = 'create table conversation(conversationID int auto_increment, conversationName varchar(255));'
const sqllinker = 'create table userConvLink (userID int,conversationID int)'
const sqlmessage = 'create table message (conversationID int, userID int, content text, messageOrder int)'

db.query(sqluser, function(err, res) {
    if (err) throw err
    console.log(res)
    res.send('user table created')
})

db.query(sqlconv, function(err, res) {
    if (err) throw err
    console.log(res)
    res.send('conv table created')
})

db.query(sqllinker, function(err, res) {
    if (err) throw err
    console.log(res)
    res.send('linker table created')
})

db.query(sqlmessage, function(err, res) {
    if (err) throw err
    console.log(res)
    res.send('message table created')
})