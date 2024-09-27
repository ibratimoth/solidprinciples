const express = require("express")
const dotenv = require("dotenv")
const morgan = require("morgan")
const { connectionDB } = require("./postgress/postgres")
// const router = require("./routes/userRoutes")

dotenv.config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.send('<h1>Hello you are welcome</h1>')
})

// app.use(router)
app.use('/api', require('./routes/solidRoutes'));

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})

connectionDB()