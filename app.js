const express = require('express');
const fs = require('fs');
const app = express();
const port = 8000;

// app.get("/", (req, res)=>{
//     res.status(200).send("Hello from the server side!!!")
// })

app.use(express.json());

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8'))

app.get("/api/v1/tours", (req, res)=>{
    res.status(200).json({
        status: 'success',
        result: tours.length,
        data: {
            tours
        }
    })
})

app.get("/api/v1/tours/:id", (req, res)=>{
    
    const id = req.params.id * 1;
    const tour = tours.find(item => item.id === id);

    if(!tour){
        res.status(404).json({
            status: "fail",
            message: "Tour not found!!!"
        })
    }
    
    res.status(200).json({
        status: 'success',
        result: tours.length,
        data: {
            tour
        }
    })
})

app.post("/api/v1/tours", (req, res)=>{
    // console.log(req.body)
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({id: newId}, req.body);

    tours.push(newTour);

    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status: "success",
            data:{
                tour: newTour
            }
        })
    })
})

app.patch("/api/v1/tours/:id", (req, res)=>{
    
    const id = req.params.id * 1;
    const tour = tours.find(item => item.id === id);

    if(!tour){
        res.status(404).json({
            status: "fail",
            message: "Tour not found!!!"
        })
    }
    
    res.status(200).json({
        status: 'Tour updated!!!',
        result: tours.length,
        data: {
            tour
        }
    })
})

app.delete("/api/v1/tours/:id", (req, res)=>{
    
    const id = req.params.id * 1;
    const tour = tours.find(item => item.id === id);

    if(!tour){
        res.status(404).json({
            status: "fail",
            message: "Tour not found!!!"
        })
    }
    
    res.status(200).json({
        status: 'Tour Deleted!!!',
        result: tours.length,
        data: {
            tour : null
        }
    })
})

app.listen(port, ()=>{
    console.log("App is running on port:"+port);
})