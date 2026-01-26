//import
const express = require('express');
const cors = require('cors');
const path = require('path')

//implementasi
const app = express();
app.use(cors());

//endpoint image
app.use('/image/tipe_kamar', express.static(path.join(__dirname,'./image/tipe_kamar')))
app.use('/image/user', express.static(path.join(__dirname,'./image/user')))
app.use('/image/customer', express.static(path.join(__dirname,'./image/customer')))

//endpoint user
const user = require('./routes/user')
app.use("/user", user)

//endpoint tipe kamar
const tipe_kamar = require('./routes/tipe_kamar')
app.use("/tipe_kamar", tipe_kamar)

//endpoint kamar
const kamar = require('./routes/kamar')
app.use("/kamar", kamar)

//endpoint pemesanan
const pemesanan = require('./routes/pemesanan')
app.use("/pemesanan", pemesanan)

//endpoint detail_pemesanan
const detail_pemesanan = require('./routes/detail_pemesanan')
app.use("/detail_pemesanan", detail_pemesanan)

//endpoint customer
const customer = require('./routes/customer')
app.use("/customer", customer)

//endpoint filter_kamar
const filter_kamar = require('./routes/filter_kamar')
app.use("/filter_kamar", filter_kamar)

//run server
app.listen(8080, () => {
    console.log('❤️  server run on port 8080 ❤️')
})
