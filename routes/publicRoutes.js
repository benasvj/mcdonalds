const express = require('express');
const router = express.Router();
const categories = require('../data/categories');
const menu = require('../data/menu');
const Item = require('../models/itemModel');
const fs = require('fs');

router.get('/', (req,res)=>{
    res.send('🚧 project is under construction 🚧')
});
router.get('/api/welcome', (req,res)=>{
    res.json({
    message:'Welcome!',
    url:'/images/heroimage.png',
    })
});
 
router.get('/api/categories', (req, res)=>{
    res.json({categories})
});
 
router.get('/api/menu', async (req, res)=>{
    try{
        //uzklausa i DB
        const menu =await Item.find({});
        res.send({menu:menu});
        // res.json({menu})
    }catch (err){
        console.log(err);
    };
});
 
router.post('/api/orders', (req,res)=>{
    console.log('new order!');
    const io = req.app.get('socketio');
    io.emit('order', req.body);
    
    console.log(req.body);
    const {name, address, phone, orders} = req.body; //destrukt.
 
    const ordersString = orders.reduce((total, item)=>{
        return total+`\n ${item.name} ${item.price}\n`
    },"");
 
    const order = `name:${name}\n 
    address:${address}\n 
    phone:${phone}\n 
    orders:\n
    ${ordersString}
    `;
 
    fs.appendFile('order.txt', order, (err)=>{
        if(err) console.log(err);
    });
    res.send("ok");
});


module.exports = router;