var express = require('express');
var router = express.Router();
var getJSON = require('get-json');
var cron = require('node-cron');


var mysql = require('mysql');
var connection = mysql.createConnection({
  host:'18.222.252.26',
  user:'root',
  password:'znvkdvkd',
  port:3306,
  database:'sophie'
});


var no = new Array();
var noName = new Array();
var noCnt = new Array();
var time = new Date();
var temp = new Array();
var sellData = new Array();

connection.connect();

cron.schedule('*/360 * * * *',function() {

  temp = new Array();
  var vendorItems = [3593371503, 3931570233, 3070574242, 3586134733, 3716023112];
  var productItems = [72251454, 130360540, 10349036, 71461430, 94084656];
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

  /*
    connection.query('INSERT INTO competitor (date) VALUES (?)',temp,function(err,rows,fields){
    if(err){
      console.log('Error.',err);
    }
  });
  */

  var update = function(param){
    //connection.query('UPDATE competitor SET product_id=?, product_name=?, stock=? WHERE date=\''+dateFormat+'\'',param,function(err,rows,fields){
    //connection.query('insert into competitor (product_id, product_name, stock, date) values (?,?,?,\''+dateFormat+'\')',param,function(err,rows,fields) {
      connection.query('insert into competitor (product_id, product_name, stock, date) values (?,?,?,?)',param,function(err,rows,fields) {
    
    if(err){
      console.log('Error.',err);
    }
  });
  }

  var getData = function(i,tempId) {
    connection.query('SELECT stock from competitor WHERE product_id=? order by date desc limit 2;',tempId, function(err, rows, fields) { 
      if(err){
        console.log('Error.',err);
      }

      sellData[i] = rows[1].stock - rows[0].stock;
      console.log('I :  ', i);
      console.log('ID :  ', tempId);
      console.log('Sell Data ', sellData[i]);
    });
  }

  var param = new Array();
  for(var i = 0; i< 5; i++) {
    getJSON('http://capi.coupang.com/v3/products/'+productItems[i]+'/vendor-items/'+vendorItems[i],function(err,res){
        param[0] = res.rData.item.vendorItemId;
        param[1] = res.rData.item.itemName;
        param[2] = res.rData.item.remainCount;
        param[3] = dateFormat;
        //console.log(param[1]);
        update(param);
    });
  }

  //판매 수량 확인
  for(var i=0; i < 5; i++) {
    getData(i,vendorItems[i]);
  }
}).start();


/* GET home page. */


router.get('/', function(req, res, next) {
  time = new Date();
  var vendorItems = [3593371503, 3931570233, 3070574242, 3586134733, 3716023112];
  var productItems = [72251454, 130360540, 10349036, 71461430, 94084656];

  for(var i=0;i<5;i++){
    getJSON('http://capi.coupang.com/v3/products/'+productItems[i]+'/vendor-items/'+vendorItems[i],function(err,res){

      switch(res.rData.item.vendorItemId){
        case 3593371503:
          noName[0] = res.rData.item.itemName;
          no[0] = res.rData.item.remainCount;
          noCnt[0] = sellData[0];
          break;
        case 3931570233:
          noName[1] = res.rData.item.itemName;
          no[1] = res.rData.item.remainCount;
          noCnt[1] = sellData[1];
          break;
        case 3070574242:
          noName[2] = res.rData.item.itemName;
          no[2] = res.rData.item.remainCount;
          noCnt[2] = sellData[2];
          break;
        case 3586134733:
          noName[3] = res.rData.item.itemName;
          no[3] = res.rData.item.remainCount;
          noCnt[3] = sellData[3];
          break;
        case 3716023112:
          noName[4] = res.rData.item.itemName;
          no[4] = res.rData.item.remainCount;
          noCnt[4] = sellData[4];
          break;
      }

    });
  }

  //page name
  res.render('competitor', { noName: noName, no: no, noCnt: noCnt, time: time });

});

module.exports = router;