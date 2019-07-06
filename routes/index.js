var express = require('express');
var router = express.Router();
var getJSON = require('get-json');
var cron = require('node-cron');
const {Builder, By, Key, until} = require('selenium-webdriver');
var mysql = require('mysql');
var cheerio = require('cheerio');
const chrome = require('selenium-webdriver/chrome');

var connection = mysql.createConnection({
  host:'18.222.252.26',
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
  var items = [3817967249,3817967255,3817967257,3817967260,3817967267, 4326375669, 4326375674, 4326375709, 4326375717, 4326375738, 4325880090];
  var productItems = [110508311, 110508311, 110508311, 110508311, 110508311, 179824178, 179824178, 179824178, 179824178, 179824178, 179781012];
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


    for(var i=0;i<11;i++){
      //getJSON('http://capi.coupang.com/v3/products/110508311/vendor-items/'+items[i],function(err,res){
      getJSON('https://m.coupang.com/vm/v4/products/'+productItems[i]+'/vendor-items/'+items[i],function(err,res){
        if(res === undefined || res.rData === undefined)
          return;
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
          case 4326375669:
            var itemNum = new Array();
            itemNum[0]=res.rData.item.remainCount;
            update('no6',itemNum);
            break;
          case 4326375674:
            var itemNum = new Array();
            itemNum[0]=res.rData.item.remainCount;
            update('no7',itemNum);
            break;
          case 4326375709:
            var itemNum = new Array();
            itemNum[0]=res.rData.item.remainCount;
            update('no8',itemNum);
            break;
          case 4326375717:
            var itemNum = new Array();
            itemNum[0]=res.rData.item.remainCount;
            update('no9',itemNum);
            break;
          case 4326375738:
            var itemNum = new Array();
            itemNum[0]=res.rData.item.remainCount;
            update('no10',itemNum);
            break;
          case 4325880090:
            var itemNum = new Array();
            itemNum[0]=res.rData.item.remainCount;
            update('no11',itemNum);
            break;
        }

      });
    }
}).start();


/* GET home page. */


router.get('/', function(req, res, next) {
  time = new Date();
  var items = [3817967249,3817967255,3817967257,3817967260,3817967267, 4326375669, 4326375674, 4326375709, 4326375717, 4326375738, 4325880090];
  var productItems = [110508311, 110508311, 110508311, 110508311, 110508311, 179824178, 179824178, 179824178, 179824178, 179824178, 179781012];
  
  
(async function example() {
  const screen = {width: 640, height:480};
  var options = new chrome.Options();
  options.addArguments('headless');
  options.addArguments('disable-gpu');
  options.addArguments('window-size=1920x1080');
  options.addArguments('user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');
  let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
  
  try {
    await driver.get('https://m.coupang.com/vm/v4/products/110508311/vendor-items/3817967249');
    Promise.resolve(driver.getPageSource()).then((value=>{
      var $ = cheerio.load(value);
      var res = JSON.parse($('pre').text());
      no[0] = res.rData.item.remainCount;
    }));
    await driver.get('https://m.coupang.com/vm/v4/products/110508311/vendor-items/3817967255');
    Promise.resolve(driver.getPageSource()).then((value=>{
      var $ = cheerio.load(value);
      var res = JSON.parse($('pre').text());
      no[1] = res.rData.item.remainCount;
    }));
    await driver.get('https://m.coupang.com/vm/v4/products/110508311/vendor-items/3817967257');
    Promise.resolve(driver.getPageSource()).then((value=>{
      var $ = cheerio.load(value);
      var res = JSON.parse($('pre').text());
      no[2] = res.rData.item.remainCount;
    }));
    await driver.get('https://m.coupang.com/vm/v4/products/110508311/vendor-items/3817967267');
    Promise.resolve(driver.getPageSource()).then((value=>{
      var $ = cheerio.load(value);
      var res = JSON.parse($('pre').text());
      no[3] = res.rData.item.remainCount;
    }));
    await driver.get('https://m.coupang.com/vm/v4/products/110508311/vendor-items/3817967255');
    Promise.resolve(driver.getPageSource()).then((value=>{
      var $ = cheerio.load(value);
      var res = JSON.parse($('pre').text());
      no[4] = res.rData.item.remainCount;
    }));
    await driver.get('https://m.coupang.com/vm/v4/products/179824178/vendor-items/4326375669');
    Promise.resolve(driver.getPageSource()).then((value=>{
      var $ = cheerio.load(value);
      var res = JSON.parse($('pre').text());
      no[5] = res.rData.item.remainCount;
    }));
    await driver.get('https://m.coupang.com/vm/v4/products/179824178/vendor-items/4326375674');
    Promise.resolve(driver.getPageSource()).then((value=>{
      var $ = cheerio.load(value);
      var res = JSON.parse($('pre').text());
      no[6] = res.rData.item.remainCount;
    }));
    await driver.get('https://m.coupang.com/vm/v4/products/179824178/vendor-items/4326375709');
    Promise.resolve(driver.getPageSource()).then((value=>{
      var $ = cheerio.load(value);
      var res = JSON.parse($('pre').text());
      no[7] = res.rData.item.remainCount;
    }));
    await driver.get('https://m.coupang.com/vm/v4/products/179824178/vendor-items/4326375717');
    Promise.resolve(driver.getPageSource()).then((value=>{
      var $ = cheerio.load(value);
      var res = JSON.parse($('pre').text());
      no[8] = res.rData.item.remainCount;
    }));
    await driver.get('https://m.coupang.com/vm/v4/products/179824178/vendor-items/4326375738');
    Promise.resolve(driver.getPageSource()).then((value=>{
      var $ = cheerio.load(value);
      var res = JSON.parse($('pre').text());
      no[9] = res.rData.item.remainCount;
    }));
    await driver.get('https://m.coupang.com/vm/v4/products/179781012/vendor-items/4325880090');
    Promise.resolve(driver.getPageSource()).then((value=>{
      var $ = cheerio.load(value);
      var res = JSON.parse($('pre').text());
      no[10] = res.rData.item.remainCount;
    }));
    
  } finally {
    await driver.quit();
    res.render('newindex', { no: no, time: time });
  }
})();


  for(var i=0;i<11;i++){
    //getJSON('http://capi.coupang.com/v3/products/110508311/vendor-items/'+items[i],function(err,res){
     
      /*getJSON('https://m.coupang.com/vm/v4/products/'+productItems[i]+'/vendor-items/'+items[i],function(err,res){
        if(res === undefined || res.rData === undefined){
          console.log('err');
          return;
        }
          
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
        case 4326375669:
          no[5] = res.rData.item.remainCount;
          break;
        case 4326375674:
          no[6] = res.rData.item.remainCount;
          break;
        case 4326375709:
          no[7] = res.rData.item.remainCount;
          break;
        case 4326375717:
          no[8] = res.rData.item.remainCount;
          break;
        case 4326375738:
          no[9] = res.rData.item.remainCount;
          break;
        case 4325880090:
          no[10] = res.rData.item.remainCount;
          break;
      }

    });*/
  }

  //res.render('newindex', { no: no, time: time });

});

module.exports = router;
