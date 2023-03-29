const express = require("express")
const axios=require('axios')
const app = express()

app.get("/", (req, res) => {
    res.send("Hello!")
})

app.post("/newtask", async(req, res)=>{ 
    
})

app.post("/edittask", async(req, res)=>{ 
    
})

module.exports = app