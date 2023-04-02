#!/usr/bin/env node
import app from './app.mjs'

const port = process.env.PORT || 3000 // the port to listen to for incoming requests

// call express's listen function to start listening to the port
const listener = app.listen(port, () => {
    console.log(`Server running on port: ${port}`)
})

// a function to stop listening to the port
const close = () => {
    listener.close()
}

export default close
