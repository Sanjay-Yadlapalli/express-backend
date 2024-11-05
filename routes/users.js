const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const { authorization } = require('../authorization/auth')

router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.send(users)
    } catch (err) {
        res.status(401).send({ message: err.message })
    }
})


router.get('/:id', async (req, res) => {
    let user;
    try {
        user = await User.findById(req.params.id)
        if (user === null) {
            return res.status(401).send({ message: 'User not found' })
        } else {
            return res.send(user)
        }
    } catch (err) {
        res.status(401).send({ message: err.message })
    }
})

router.post('/register', async (req, res) => {
    const { userName, password, age, country } = req.body
    const userDb = await User.findOne({ userName })
    try {
        if (userDb !== null) {
            return res.status(401).send({ message: 'User Already Exists, Please Login..!' })
        } else {
            const hashedPassword = await bcrypt.hash(password, 10)
            const user = new User({
                userName: userName,
                password: hashedPassword,
                age: age,
                country: country
            })
            const newUser = await user.save()
            res.status(201).send(newUser.id)
        }
    } catch (err) {
        res.status(401).send({ message: err.message })
    }
})

router.post('/login', async (req, res) => {
    const { userName, password } = req.body
    const dbUser = await User.findOne({ userName: userName })
    try {
        if (dbUser === null) {
            res.status(401).send({ message: 'User not Exists, Kindly Register' })
        } else {
            const isPasswordMatched = await bcrypt.compare(password, dbUser.password)
            if (isPasswordMatched) {
                const payload = { userName }
                let jwtToken = jwt.sign(payload, 'MY_SECRET_KEY')
                res.status(200).send({ token: jwtToken })
            } else {
                res.status(401).send({ message: 'Incorrect Password' })
            }
        }
    } catch (err) {
        res.status(401).send({ message: err.message })
    }
})


router.delete('/:id', authorization, async (req, res) => {
    let user;
    try {
        user = await User.findByIdAndDelete(req.params.id)
        if (user === null) {
            res.status(401).send({ mesage: 'User Already Deleted' })
        } else {
            res.status(201).send({ message: 'User Deleted Successfully' })
        }
    } catch (err) {
        res.status(401).send({ message: err.message })
    }
})




module.exports = router