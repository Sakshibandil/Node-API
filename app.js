require ("dotenv").config();
const express = require ("express");
const app = express();
require("./db/conn");
const cors = require ("cors");
const router = require("./routes/router");
const PORT = 5004;


app.use(cors());
app.use(express.json());
app.use(router);

app.get("/", (req,res)=>{
    res.status(200).json("server has been started");
});

app.listen(PORT, ()=>{
    console.log(`server has been started at port no. ${PORT}`)
 
});