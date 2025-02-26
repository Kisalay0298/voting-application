const express = require('express')
const connectToDB = require('../model/connectDB');
const app = express()


async function startServer(){
    await connectToDB();
    const port = 2231;
    app.listen(port, ()=>{
        console.log(`Server is running on http://localhost:${port}`)
    })
}


module.exports = { startServer, app };