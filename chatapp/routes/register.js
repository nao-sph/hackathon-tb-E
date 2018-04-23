'use strict';

var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('./db/userData.sqlite3');

router.get('/', function(req, res, next) {
  res.render('register');
});

router.post('/', function(req, res, next) {
  var userName = req.body.newUserName;
  var password = req.body.newPassword;

  console.log(userName);
  console.log(password);

  db.all('select id from userdata where name=$un limit 1',
  {$un:userName},
  function(err, rows) {
    if(err) throw err;

    var isNameResistation = rows.length ? rows[0].id:false;

    if (userName.replace(/\r?\n/g,"") === ""
      || password.replace(/\r?\n/g,"") === ""
      || userName === null
      || password === null) {
      res.render('register', {
        alert:'入力していない項目があります'
      });
    } else if (isNameResistation){
      res.render('register', {
        alert:'登録済みの名前です'
      });
    } else {
      db.run('insert into userdata(name,password) values($un, $pwd)',
        {$un:userName, $pwd:password}
      );
    }
    if(!isNameResistation){
      res.redirect('/login');
    }
  });
});

module.exports = router;
