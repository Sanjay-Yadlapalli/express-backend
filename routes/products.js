const express = require('express')
const router = express.Router()
const Product = require('../models/product')
const { authorization } = require('../authorization/auth')

router.get('/', async (req, res) => {
    try {
        const products = await Product.find()
        return res.send(products)
    } catch (err) {
        return res.status(401).send({message: err.message})
    }
})

router.post('/addProduct', async (req, res) => {
    const addProduct = new Product({
        title: req.body.title
    })
    const productQuery = await Product.findOne({ title: req.body.title })
    try {
        if (productQuery === null) {
            const newProduct = await addProduct.save()
            return res.status(200).send(newProduct)
        } else {
            return res.status(401).send({ message: 'Product Already Exists..!' })
        }
    } catch (err) {
        res.status(401).send({ message: err.message })
    }
})

module.exports = router