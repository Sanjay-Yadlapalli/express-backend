require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.json())


const userRouter = require('./routes/users')
app.use('/users', userRouter)

const productRouter = require('./routes/products')
app.use('/product', productRouter)

const companiesRouter = require('./routes/companies')
app.use('/company', companiesRouter)

const assessmentsRouter = require('./routes/assessments')
app.use('/assessments', assessmentsRouter)

const testRouter = require('./routes/test')
app.use('/test', testRouter)

const initializeDBAndServer = () => {
    const PORT = 4001
    app.listen(PORT, () => {
        console.log(`Server running at ${PORT}`)
    })
    mongoose.set('strictQuery', false)
    mongoose.connect('mongodb+srv://sanjayyadlapalli5:YiOuG0qGbrOpMx13@cluster0.feee3hr.mongodb.net/myFirstDb?retryWrites=true&w=majority', { useNewUrlParser: true })
    const db = mongoose.connection
    db.on('error', (error) => console.error(error))
    db.once('open', () => console.log('Connected to Database'))
}
initializeDBAndServer()