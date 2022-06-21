const html = require("html")
const port = 8000


const server = html.createServer(function(req,res) {
    
})

server.listen(port, function(error) {
    if (error) {
        console.log('unable to connect to port')
    } else {
        console.log('server loaded')
    }
})