import 'dotenv/config'
import express from 'express'
const app = express()

const port = process.env.PORT ||3000

app.use(express.json())
let teaData = []
let nextId = 1

/// this is the method for add a new tea in the array
app.post('/teas', (req, res) => {
    
    const { name, price } = req.body;
    const newTea = { id: nextId++, name, price }
    teaData.push(newTea)
    res.status(201).send(newTea)
})

/// this is the method to get the list of the array
app.get('/teas', (req, res) => {
    res.status(200).send(teaData);
})

/// this is the method for finding the single element from the array
app.get('/teas/:id', (req, res) => {
    teaData.find(t => t.id === parseInt(req.params.id))
    if (!tea) {
        return res.status(404).send("Tea not found");
    }
    res.status(200).send(tea);
})


/// update the tea
app.put('/teas/:id', (req, res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id))
    if (!tea) {
        return res.status(404).send("Tea not found");
    }
    const { name, price } = req.body;
    tea.name = name;
    tea.price = price;
    res.send(200).send(tea);
})

/// delete tea
app.delete('/teas/:id', (req, res) => {
    const index = teaData.findIndex(t => t.id === parseInt(req.params.id))
    if (index === -1) {
        return res.status(404).send("Tea not found");
    }
    teaData.splice(index, 1);
     return res.status(204).send("deleted");
} )
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})