const Product = require("../model/product");


exports.AddProduct = async (req,res)=>{
    const {name,price,category} = req.body;
    if(!name||!price||!category) {
        res.status(400).json({
            status: "failed",
            message: "please fill all the fields"
        })
    }
    const product = await Product.create({
        name, price:+price , category
    })

    res.status(201).json({
        status: "success",
        product
    })
}

exports.UpdateProduct =async (req,res)=>{
    const id = req.params.id;
    const {name,price,category} = req.body;
    const product = await Product.findByIdAndUpdate(id,{
        name,price,category
  })
    res.status(201).json({
        status : "success",
        product
    })
}

exports.deleteProduct =async (req,res)=>{
    const id = req.params.id;
    await Product.findByIdAndDelete(id)
    res.status(204).json({status: "success", message:"deleted successfully"})
}

exports.AllProduct = async (req,res)=>{
    const products  =await Product.find();
    res.status(200).json({
         status:"success",
         products
    })
}