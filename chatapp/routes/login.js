// 'use strict';

const express = require('express');
const router = express.Router();
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('./db/userData.sqlite3');

router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/', function(req, res, next) {
  var userName = req.body.UserName;
  var password = req.body.Password;

  console.log(userName);
  console.log(password);

  if (userName.replace(/\r?\n/g,"") === ""
  || password.replace(/\r?\n/g,"") === ""
  || userName === null
  || password === null) {
    res.render('login', {
      alert:'入力していない項目があります'
    });
  } else {
    db.all('select id, name, password from userdata where name=$un and password=$pwd limit 1',
    {$un:userName, $pwd:password},
    function(err,rows){
      if(err) throw err;

      var id = rows.length　? rows[0].id:false;
      var name = rows.length　? rows[0].name:false;
      var password = rows.length　? rows[0].password:false;
      console.log('ID : ' + id + ' name : ' + name + ' pwd : ' + password);

      if(id && name && password){
        req.session.id = id;
        req.session.user = name;
        req.session.password = password;
        console.log('ID : ' + req.session.id + ' name : ' + req.session.name + ' pwd : ' + req.session.password);
        res.redirect('../');
      } else {
        res.render('login',{
          alert:'名前もしくはパスワードが間違っています'
        });
      }
    });
    //db.close();
  }
});

module.exports = router;
