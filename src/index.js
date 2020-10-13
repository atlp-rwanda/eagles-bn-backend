const express = require("express")
const serverPort = process.env.PORT || 4000
const dotenv = require("dotenv")


dotenv.config();

const app = express()
app.use(express.json())


app.listen(serverPort, () => console.log(`Server has started on port ${serverPort}`))


module.exports = app