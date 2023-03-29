import express from 'express'
import axios from 'axios'

const app = express()

app.get('/', (req, res) => {
    res.send('Hello!')
})

app.post("/newtask", async(req, res)=>{ 
    
})

app.post("/edittask", async(req, res)=>{ 
    
})

app.post("/newtask", async(req, res)=>{ 
    
})

app.post("/edittask", async(req, res)=>{ 
    
})

export default app
