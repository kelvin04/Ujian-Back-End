const express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');

var app = express();
const port = 1989;

var url = bodyParser.urlencoded({ extended: false });
app.use(url);
app.use(bodyParser.json());
app.use(cors());

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Masterof04',
    database: 'hotelbertasbih',
    port: 3306
})


// ================================ KAMAR ==================================================
app.get('/kamar', (req,res) => {
    var sql = `select k.nomorkamar, k.categoryid, c.namacategory, k.harga 
                from tablekamar k join tablecategory c 
                on k.categoryid = c.id;`;
    conn.query(sql, (err,results) => {
        if(err) throw err;
        res.send(results);
    })
});

app.get('/filterkamar', (req,res) => {
    const { listCategory, listKamar } = req.query;
    if(listCategory) {
        var sql = `select * from tablekamar where categoryid in (?);`;
        conn.query(sql, [listCategory],(err,results) => {
            if(err) throw err;
            res.send(results);
        })
    }
    else if(listKamar) {
        var sql = `select * from tablekamar where nomorkamar in (?);`;
        conn.query(sql, [listKamar],(err,results) => {
            if(err) throw err;
            res.send(results);
        })
    }
});

app.post('/kamar', (req,res) => {
    const { nomorkamar, categoryid, harga } = req.body;
    var data = { 
        nomorkamar: nomorkamar,
        categoryid: categoryid,
        harga: harga
    };
    var sql = 'INSERT INTO tablekamar SET ?;';
    conn.query(sql, data, (err, results) => {
        if(err) throw err;
        var sql1 = `select k.nomorkamar, k.categoryid, c.namacategory, k.harga 
                    from tablekamar k join tablecategory c 
                    on k.categoryid = c.id;;`;
        conn.query(sql1, (err1, results1) => {
            if(err1) throw err1;
            res.send(results1);
        })
    })
});

app.put('/kamar/:id', (req,res) => {
    const { nomorkamar, categoryid, harga } = req.body;
    var data = { 
        nomorkamar: nomorkamar,
        categoryid: categoryid,
        harga: harga
    };
    var sql = `UPDATE tablekamar SET ? WHERE id=${req.params.id}`;
    conn.query(sql, data, (err, results) => {
        if(err) res.send({ err, status: 'Error' })
        else {
            var sql1 = `select k.nomorkamar, k.categoryid, c.namacategory, k.harga 
                        from tablekamar k join tablecategory c 
                        on k.categoryid = c.id;`;
            conn.query(sql1, (err1, results1) => {
                if(err1) throw err1;
                res.send(results1);
            })
        }
    })
});

app.delete('/kamar/:id', (req,res) => {
    var { id } = req.params;

    var sql = `delete from tablekamar where id = ${id};`;
    conn.query(sql, (err, results) => {
        if(err) throw err;

        sql = `select * from tablekamar;`;
        conn.query(sql, (err1, results1) => {
            if(err1) throw err1;

            res.send(results1);
        })
    })
});


// ==================================== CATEGORY ==========================================
app.get('/category', (req,res) => {
    var sql = `select * from tablecategory;`;
    conn.query(sql, (err,results) => {
        if(err) throw err;
        res.send(results);
    })
});

app.get('/filtercategory', (req,res) => {
    const { listCategory } = req.query
    var sql = `select * from tablecategory where id in (?);`;
    conn.query(sql, [listCategory],(err,results) => {
        if(err) throw err;
        res.send(results);
    })
});

app.post('/category', (req,res) => {
    const { namacategory } = req.body;
    var data = { 
        namacategory: namacategory
    };
    var sql = 'INSERT INTO tablecategory SET ?;';
    conn.query(sql, data, (err, results) => {
        if(err) throw err;
        var sql1 = `select * from tablecategory;`;
        conn.query(sql1, (err1, results1) => {
            if(err1) throw err1;
            res.send(results1);
        })
    })
});

app.put('/category/:id', (req,res) => {
    const {  namacategory } = req.body;
    var data = { 
        namacategory: namacategory
    };
    var sql = `UPDATE tablecategory SET ? WHERE id=${req.params.id}`;
    conn.query(sql, data, (err, results) => {
        if(err) res.send({ err, status: 'Error' })
        else {
            var sql1 = `select * from tablecategory;`;
            conn.query(sql1, (err1, results1) => {
                if(err1) throw err1;
                res.send(results1);
            })
        }
    })
});

app.delete('/category/:id', (req,res) => {
    var { id } = req.params;

    var sql = `delete from tablecategory where id = ${id};`;
    conn.query(sql, (err, results) => {
        if(err) throw err;

        sql = `select * from tablecategory;`;
        conn.query(sql, (err1, results1) => {
            if(err1) throw err1;

            res.send(results1);
        })
    })
});

// ============================== USER ==============================================
app.get('/user', (req,res) => {
    var sql = `select * from tableuser;`;
    conn.query(sql, (err,results) => {
        if(err) throw err;
        res.send(results);
    })
});

app.post('/register', (req,res) => {
    const { username, email, password, role } = req.body;
    var data = { 
        username: username,
        email: email,
        password: password,
        role: role
    };
    var sql = 'INSERT INTO tableuser SET ?;';
    conn.query(sql, data, (err, results) => {
        if(err) throw err;
        var sql1 = `select * from tableuser;`;
        conn.query(sql1, (err1, results1) => {
            if(err1) throw err1;
            
            res.send(results1);
        })
    })
});

app.get('/login', (req,res) => {
    const { user } = req.query
    var sql = `select * from tableuser where username in (?);`;
    conn.query(sql, [user],(err,results) => {
        if(err) throw err;
        res.send(results);
    })
});

app.listen(port, () => console.log('API Active at localhost:1989!'));