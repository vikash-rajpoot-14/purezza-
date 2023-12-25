const express = require('express')
const {AddProduct,UpdateProduct,deleteProduct,AllProduct} = require("./../controllers/productController.js")
const router = express.Router()

router.route('/products').get(AllProduct )
router.route('/product').post(AddProduct)
router.route('/product/:id').put(UpdateProduct )
router.route('/product/:id').delete(deleteProduct )

module.exports = router
