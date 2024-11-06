const express = require('express');
const fs = require('fs');
const app = express();
const port = 8000;

// app.get("/", (req, res)=>{
//     res.status(200).send("Hello from the server side!!!")
// })

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours.json`, 'utf-8'))

app.get("/api/v1/tours", (req, res)=>{
    res.status(200).json({
        status: 'success',
        result: tours.length,
        data: {
            tours
        }
    })
})

app.listen(port, ()=>{
    console.log("App is running on port:"+port);
})