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

cron.schedule('*/* 6 * * *',function() {

  temp = new Array();
  var vendorItems = [3593371503,3931570233,3070574242,3586134733,3716023112,4174142878,3775243899,4105108981,3978912301,4118334657,3300110490,3767455183,3699736959,4007569551,3193577018,3560069453,3626309637,3131010071,3097753880,3263385841,4138398343,3002041112,4026582127,3544608776,3870312492,3206189326,3915021687,3642455048,4027767726,3318365196,3488129392,3506236644,3880946567,3124096068,3793687902,3106789266,3203598484,3070574252,4033095719,3645973702,3069649680,3013094957,3550030220,3017954805,3951944950,3009674395,3071034336,4159933284,3105153828,3049525412];
  var productItems = [72251454,130360540,10349036,71461430,94084656,163849886,104037836,154791472,137135018,88520800,37895878,102381604,12199507,141084951,26431967,68679653,80592780,19358225,15174958,34204226,159720043,2801591,143889225,66753817,99656689,27751737,128271744,83487379,144081320,39504601,59678157,62239470,120467556,18618471,107178525,1266713,26704181,10349028,144835644,84013699,6806257,2038324,67686918,2558627,133070990,2800173,3525066,15735181,99656680,7665895];
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

      var updateparam = new Array();
      updateparam[0] = sellData[i];
      updateparam[1] = tempId;

      connection.query('UPDATE realcompetitor set nocnt=? where vendoritem=? ',updateparam,function(err,rows,fields) {
        if(err){
          console.log('Error.',err);
        }
      });
      // console.log('I :  ', i);
      // console.log('ID :  ', tempId);
      // console.log('Sell Data ', sellData[i]);
    });
  }

  var param = new Array();
  for(var i = 0; i< 50; i++) {
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
  for(var i=0; i < 50; i++) {
    getData(i,vendorItems[i]);
  }
}).start();


/* GET home page. */


router.get('/', function(req, res, next) {
  time = new Date();
  var vendorItems = [3593371503,3931570233,3070574242,3586134733,3716023112,4174142878,3775243899,4105108981,3978912301,4118334657,3300110490,3767455183,3699736959,4007569551,3193577018,3560069453,3626309637,3131010071,3097753880,3263385841,4138398343,3002041112,4026582127,3544608776,3870312492,3206189326,3915021687,3642455048,4027767726,3318365196,3488129392,3506236644,3880946567,3124096068,3793687902,3106789266,3203598484,3070574252,4033095719,3645973702,3069649680,3013094957,3550030220,3017954805,3951944950,3009674395,3071034336,4159933284,3105153828,3049525412];
  var productItems = [72251454,130360540,10349036,71461430,94084656,163849886,104037836,154791472,137135018,88520800,37895878,102381604,12199507,141084951,26431967,68679653,80592780,19358225,15174958,34204226,159720043,2801591,143889225,66753817,99656689,27751737,128271744,83487379,144081320,39504601,59678157,62239470,120467556,18618471,107178525,1266713,26704181,10349028,144835644,84013699,6806257,2038324,67686918,2558627,133070990,2800173,3525066,15735181,99656680,7665895];
  
  for(var i=0;i<vendorItems.length;i++){
    //아래주석 아이템 추가 후 한번 실행
        /*connection.query('insert into realcompetitor (vendoritem) values (?)',vendorItems[i],function(err,rows,fields) {
          console.log("in"+vendorItems[i]);
          if(err){
            console.log('Error.',err);
          }
        });*/
      



    getJSON('http://capi.coupang.com/v3/products/'+productItems[i]+'/vendor-items/'+vendorItems[i],function(err,res){
      
      var param = new Array();
      //console.log("in1");
      param[0] = res.rData.item.itemName;
      param[1] = res.rData.item.remainCount;
      param[2] = res.rData.item.vendorItemId;
      //param[3] = 0;

           
          connection.query('update realcompetitor set noname=?,no=? where vendoritem=?',param,function(err,rows,fields) {
            //console.log("in2"+param[1]);
            if(err){
              console.log('Error.',err);
            }
          });

        

        
      
      /*switch(res.rData.item.vendorItemId){
        case vendorItems[0]:
          noName[0] = res.rData.item.itemName;
          no[0] = res.rData.item.remainCount;
          noCnt[0] = sellData[0];
          break;
        case vendorItems[1]:
          noName[1] = res.rData.item.itemName;
          no[1] = res.rData.item.remainCount;
          noCnt[1] = sellData[1];
          break;
        case vendorItems[2]:
          noName[2] = res.rData.item.itemName;
          no[2] = res.rData.item.remainCount;
          noCnt[2] = sellData[2];
          break;
        case vendorItems[3]:
          noName[3] = res.rData.item.itemName;
          no[3] = res.rData.item.remainCount;
          noCnt[3] = sellData[3];
          break;
        case vendorItems[4]:
          noName[4] = res.rData.item.itemName;
          no[4] = res.rData.item.remainCount;
          noCnt[4] = sellData[4];
          break;
      }*/

    });
}

    connection.query('select vendoritem,noname,no,nocnt from realcompetitor',function(err,rows,fields) {
      
      for(var i=0;i<50;i++){
        //console.log(rows[i].noname);
      noName[i] = rows[i].noname;
      no[i] = rows[i].no;
      noCnt[i] = rows[i].nocnt;

      //console.log(noName[i]);
      }
      if(err){
        console.log('Error.',err);
      }
    });
  

  //page name
  res.render('competitor', { noName: noName, no: no, noCnt: noCnt, time: time });

});

module.exports = router;