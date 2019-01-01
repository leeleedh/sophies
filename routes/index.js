var express = require('express');
var router = express.Router();
var getJSON = require('get-json');
var cron = require('node-cron');


var mysql = require('mysql');
var connection = mysql.createConnection({
  host:'127.0.0.1',
  user:'root',
  password:'znvkdvkd',
  port:3306,
  database:'sophie'
});


var no = new Array();
var time = new Date();
var temp = new Array();

connection.connect();

cron.schedule('*/10 * * * *',function(){
  temp = new Array();
  var items = [3817967249,3817967255,3817967257,3817967260,3817967267];
  var insertDate = new Date();
  var year = insertDate.getFullYear();
  var month = ''+(insertDate.getMonth()+1);
  //console.log("length:"+month.length);
  if(month.length<2){month = '0'+month}
  var day = ''+insertDate.getDate();
  if(day.length<2){day = '0'+day}
  var hour = ''+insertDate.getHours();
  if(hour.length<2){hour = '0'+hour}
  var min = ''+insertDate.getMinutes();
  if(min.length<2){min = '0'+min}

  var dateFormat = year+'-'+month+'-'+day+' '+hour+':'+min+':'+'00';


  temp[0] = dateFormat;

    connection.query('INSERT INTO stock (date) VALUES (?)',temp,function(err,rows,fields){
    if(err){
      console.log('Error.',err);
    }
  });

  var update = function(fields,param){
    connection.query('UPDATE stock SET '+fields+'=? WHERE date=\''+dateFormat+'\'',param,function(err,rows,fields){
    if(err){
      console.log('Error.',err);
    }
  });
  }


    for(var i=0;i<5;i++){
      getJSON('http://capi.coupang.com/v3/products/110508311/vendor-items/'+items[i],function(err,res){

        switch(res.rData.item.vendorItemId){
          case 3817967249:
            var itemNum = new Array();
            itemNum[0]=res.rData.item.remainCount;
            update('no1',itemNum);
            break;
          case 3817967255:
            var itemNum = new Array();
            itemNum[0]=res.rData.item.remainCount;
            update('no2',itemNum);
            break;
          case 3817967257:
            var itemNum = new Array();
            itemNum[0]=res.rData.item.remainCount;
            update('no3',itemNum);
            break;
          case 3817967260:
            var itemNum = new Array();
            itemNum[0]=res.rData.item.remainCount;
            update('no4',itemNum);
            break;
          case 3817967267:
            var itemNum = new Array();
            itemNum[0]=res.rData.item.remainCount;
            update('no5',itemNum);
            break;
        }

      });
    }
}).start();


/* GET home page. */


router.get('/', function(req, res, next) {


  time = new Date();
  var items = [3817967249,3817967255,3817967257,3817967260,3817967267];

  for(var i=0;i<5;i++){
    getJSON('http://capi.coupang.com/v3/products/110508311/vendor-items/'+items[i],function(err,res){

      switch(res.rData.item.vendorItemId){
        case 3817967249:
          no[0] = res.rData.item.remainCount;
          break;
        case 3817967255:
          no[1] = res.rData.item.remainCount;
          break;
        case 3817967257:
          no[2] = res.rData.item.remainCount;
          break;
        case 3817967260:
          no[3] = res.rData.item.remainCount;
          break;
        case 3817967267:
          no[4] = res.rData.item.remainCount;
          break;
      }

    });
  }

  res.render('newindex', { no: no, time: time });

});

module.exports = router;
