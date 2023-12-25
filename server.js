const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const productRoutes = require("./routes/productRoutes.js")
const app = express();

dotenv.config({ path: "./config.env" })
mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("database connection established")
}).catch(err => console.log("database connection failed", err));

app.use(cors())
app.use(express.json());

app.use('/api/',productRoutes)
const PORT = process.env.PORT || 3000;

app.listen(PORT, (req, res) => {
    console.log(`listening on ${PORT}`)
});