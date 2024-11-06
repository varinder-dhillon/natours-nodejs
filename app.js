const express = require('express');

const app = express();
const port = 8000;

app.get("/", (req, res)=>{
    res.status(200).send("Hello from the server side!!!")
})

app.listen(port, ()=>{
    console.log("App is running on port:"+port);
})