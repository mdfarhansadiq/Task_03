var express = require('express');
var router = express.Router();
const Model = require('../models/Flash');
const mongoose = require('../utils/mongoose')
const jwt = require('passport-jwt')
const Auth = require('./../middlewares/Auth')

// Lazy Responder :)
function responder(res, err, data) {
    if (err || !data) {
        console.log({
            err, data
        })
        res.status(400).send({
            err, data
        })
    } else {
        console.log("Data: " + data)
        res.status(200).send(data)
    }
}

var store = [{
   id: 0,
   name: 'Flash',
   age: 24,
   location: 'Dhaka'
}
]


/// To insert/ add data to array
router.post('/',(req, res) => {
    var obj = {
        id: store.length,
        name: req.body.name,
        age: req.body.age,
        location: req.body.location
    }
    store.push(obj)
    res.send(obj)
})

/// To search data from array
router.get('/:id',(req, res) => {
    var flag = false
    for(i=0;i<store.length;i++)
    {
        if(store[i].id==req.params.id)
        {
            res.send(store[i])
            flag = true
            break
        }
    }
    if(!flag)
        res.send({data: null})
})

/// To update data to array
router.put('/:id',(req, res) => {
    var obj = {
        ...store[req.params.id],
        name: req.body.name,
        age: req.body.age,
        location: req.body.location
    }
    store[req.params.id] = obj
    res.send(obj)
})

/// To delete specific data from array
router.delete('/:id',(req, res) => {
    store = store.filter((item, index) => {
            return item.id != req.params.id
    })
    res.send(store)
})

/// To delete all data from array
router.delete('/', (req, res) => {
    store = []
    res.send(store)
})

module.exports = router;