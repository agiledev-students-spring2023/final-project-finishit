// #!/usr/bin/env node
const app = require('./app').app

const port = process.env.PORT || 3000 // the port to listen to for incoming requests

// call express's listen function to start listening to the port
const listener = app.listen(port, () => {
    console.log(`Server running on port: ${port}`)
})

// a function to stop listening to the port
const close = () => {
    listener.close()
}

module.exports = {
    close,
    default: close
}
