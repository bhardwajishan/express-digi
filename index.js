import express from "express";
const app = express();
const port = 3000;

app.use(express.json())

let teaData = [];
let nextId= 1;

// Add new tea
app.post("/teas",(req,res)=>{
    const {name,price}= req.body;

    const newTea={id:nextId++,name,price};
    teaData.push(newTea);
    res.status(201).send(newTea);
})

// Get all tea
app.get("/teas",(req,res)=>{
    res.status(200).send(teaData);
})

// Get a tea by id
app.get("/teas/:id",(req,res)=>{
    const tea = teaData.find(t=>t.id===parseInt(req.params.id));
    if(!tea){
        res.status(404).send("Not Found");
    }
    res.status(200).send(tea);
})

// Update a tea by id
app.put("/teas/:id",(req,res)=>{
    const tea = teaData.find(t=>t.id===parseInt(req.params.id));
    if(!tea){
        res.status(404).send("Not Found");
    }
    const {name,price} = req.body;
    tea.name = name;
    tea.price = price;
    res.status(200).send(tea);
})

// Delete a tea by id
app.delete("/teas/:id",(req,res)=>{
    const index = teaData.findIndex(t=>t.id===parseInt(req.params.id));
    if(index===-1){
        return res.status(404).send("Not Found");
    }
    teaData.splice(index,1);
    res.status(200).send("Deleted");
})

app.listen(port,()=>{
    console.log("Server is listening...")
});