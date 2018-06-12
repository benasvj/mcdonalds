const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs=require('fs');
//importuojam routinga is routes papkes
const publicRoutes=require('./routes/publicRoutes');
const adminRoutes=require('./routes/adminRoutes');
const mongoose=require('mongoose');

//promise integravimas i mongoose
mongoose.Promise = global.Promise;

//prisijungimas i DB
mongoose.connect('mongodb://admin:admin123@ds249839.mlab.com:49839/mcdonalds');
mongoose.connection.once('open',()=>{
    console.log('connected to db');
}).on('error',(e)=>console.log(e));

const port = process.env.PORT || 9000;

app.use(express.static(__dirname+'/public'));   //kur bus statiniai failai. t.y. visiem pasiekiami
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
//naudojam public routes
app.use('/', publicRoutes);
app.use('/', adminRoutes);


const server = app.listen(port,()=>{
   console.log(`server is running on port ${port}`);
});

//sukuriam io kintamaji, kuris yra socket biblioteka ir ikeliam i ji serveri
const io = require('socket.io')(server);


//klausom eventu is front end
io.on('connection', (socket)=>{
    console.log('user connected');
    socket.on('test', (data)=>{
        console.log(data);
    });
});


app.set('socketio', io);