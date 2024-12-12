const router = require('express').Router();
let orderModel = require('../models/Order.model');

router.get('/',(req,res)=>{
    res.status(200).json({});
});

router.get('/:id',(req,res)=>{
    // show the item list
    res.status(200).json({});
});

router.get('/detail/:id',(req,res)=>{
    // show the detail list
    res.status(200).json({});
});

module.exports = router;