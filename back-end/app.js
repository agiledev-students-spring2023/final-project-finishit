const express = require("express")
const axios=require('axios')
const app = express()

app.get("/", (req, res) => {
    res.send("Hello!")
})

app.post("/newtask", async(req, res)=>{ 
    
    const data={
      new_task:{
        new_task:req.body
        
        




      }



    }



})

module.exports = app