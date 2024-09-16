import express from 'express'
import cors from 'cors'
const app = express()
app.use(cors())
app.use(express.json())
const port = 3000

let teaData = []
let nextId = 1;
//add a new tea
app.post('/teas', (req, res) => {
    const { name, price } = req.body;
    const newTea = { id: nextId++, name, price }
    teaData.push(newTea)
    res.status(201).send(newTea)
})

//get all tea
app.get('/teas', (req, res) => {
    res.status(200).send(teaData)
})
//get a tea with id
app.get('/teas/:id', (req, res) => {
    const tea = teaData.find(i => i.id === parseInt(req.params.id))
    if (!tea) {
        return res.status(404).send("Tea is not found")
    }
    res.status(200).send(tea)
})
//update tea
app.put('/teas/:id', (req, res) => {
    const tea = teaData.find(i => i.id === parseInt(req.params.id))
    if (!tea) {
        return res.status(404).send("Tea is not found")
    }
    const { name, price } = req.body;
    tea.name = name;
    tea.price = price;
    res.status(200).send(tea)
})
//delete tea
app.put('/teas/:id', (req, res) => {
    teaData.findIndex(tea => tea.id === parseInt(req.params.id))
    if (index === -1) {
        return res.status(404).send('tea not found')
    }
    teaData.splice(index, 1)
    return res.status(204).send('Tea deleted successfully')
})


app.listen(port, () => {
    console.log(`Server is running successfully in port: ${port}`)
})