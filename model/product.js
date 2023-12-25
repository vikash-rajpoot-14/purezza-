const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name : {
        type : 'string',
        required : true
    },
    price:{
        type : 'number',
         required : true
    },
    category :{
        type : 'string',
        required : true
    }
},{timestamps : true})

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product