const express = require('express');
const fs = require('fs');
const app = express();
const port = 8000;

// app.get("/", (req, res)=>{
//     res.status(200).send("Hello from the server side!!!")
// })

app.use(express.json());

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8'))

const getAllTours = (req, res)=>{
    res.status(200).json({
        status: 'success',
        result: tours.length,
        data: {
            tours
        }
    })
};

const getTour = (req, res)=>{
    
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
}

const createTour = (req, res)=>{
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
};

const updateTour = (req, res)=>{
    
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
}

const deleteTour = (req, res)=>{ 
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
}

// app.get("/api/v1/tours", getAllTours)
// app.get("/api/v1/tours/:id", getTour)
// app.post("/api/v1/tours", createTour)
// app.patch("/api/v1/tours/:id", updateTour)
// app.delete("/api/v1/tours/:id", deleteTour)

app.route("/api/v1/tours")
    .get(getAllTours)
    .post(createTour)

app.route("/api/v1/tours/:id")
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour)

app.listen(port, ()=>{
    console.log("App is running on port:"+port);
})