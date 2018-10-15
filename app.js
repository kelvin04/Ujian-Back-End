const express = require('express');

var app = express();
var port = 2018;

app.get('/', (req,res) => {
    res.send('<h1>Selamat Datang!</h1>')
})

app.get('/bigmac', (req,res) => {
    res.send('<h2>Maaf di sini tidak jual Big Mac</h2>')
})

// kalo post harus test di postman soalnya, kalo browser cuma bisa get
app.post('/hadiahbunga/:bunga', (req,res) => {
    if(req.params.bunga == 'Mawar') {
        res.send('<h2>Terima Kasih atas bunga ' + req.params.bunga + ' </h2>')
    }
    else {
        res.send('<h1>Bunga apa ini?</h1>')
    }
})

var listKatalogLemari = [
    { nama: 'Lemari Baju', harga: 50000 }, 
    { nama: 'Lemari Kolor', harga: 500000 }
]

app.get('/kataloglemari', (req,res) => {
    res.send(listKatalogLemari)
})

// kalo ga dikasih respon, bakal loading terus di HTMLnya
// coba ketik http://localhost:2018/maulemarini?sauce=barbeque&topping=telur, nanti console log sini keluar { sauce: 'barbeque', topping: 'telur' }
app.get('/maulemarini', (req,res) => {
    // console.log(req.query)
    // res.send('<h1>Halo</h1>')

    var { nama, harga } = req.query;
    var hasilCari = listKatalogLemari.filter((lemari) => {
        // harga jangan === soalnya beda tipe, kalo mau pake parseInt
        // kalo mau salah satu aja pake or ||
        if(nama === lemari.nama && harga == lemari.harga) {
            return true;
        }
        return false;
    })
    res.send(hasilCari);
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));