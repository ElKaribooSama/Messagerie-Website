'use strict'

const { readFile } = require('fs')
const { pomisify, promisify } = require('util')
const readFileAsync = promisify(readFile)

const READ_OPTION = { encoding: 'UTF-8' }

module.exports = async function(route) {
    //get back html content
    const content = await readFileAsync('C:/Users/tsuna/Desktop/Messagerie-Website/api/pages/' + route, READ_OPTION)
    //return html page
    return content
}