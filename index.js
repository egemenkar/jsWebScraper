const puppeteer = require('puppeteer');
const fetch = require('node-fetch');
const axios = require('axios');
const nodeCron = require("node-cron");

const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();








async function SomeFunctionName(){
//(async () => {
    const browser = await puppeteer.launch({
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
      ],
    });
    const page = await browser.newPage();
    

    await page.goto('https://info.apeswap.finance/token/0x603c7f932ed1fc6575303d8fb018fdcbb0f39a95', { waitUntil: 'networkidle2', timeout: 0 });
    
      
    
    const grabBananaPrice = await page.evaluate(() => {
        const grabPrice = document.querySelectorAll('.sc-bdVaJa.MVHLX.css-9on69b');
       
        
        const dataList = [];
        
       
       
       grabPrice.forEach((element) => {
           dataList.push(element.innerHTML);
       });

   

        
        return dataList
    })
    
    //sc-gsDJrp cIcajJ
    //console.log(grabBananaPrice);
    const time = new Date();
    //console.log(time);
    grabBananaPrice.push(time);
    console.log(grabBananaPrice);

    await browser.close();

    const data = JSON.stringify(grabBananaPrice);

   


    /*app.get("/", (req, res) => {
      res.json(grabBananaPrice);
    });*/

    
    const config = {
      method: 'put',
      url: 'https://jsonblob.com/api/jsonBlob/eed7cc15-fd9b-11eb-b644-91a58acc6da2',
      headers: { 
        'Content-Type': 'application/json', 
        'Accept': 'application/json'
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
    

//})();
};

const job = nodeCron.schedule("3 * * * * *", SomeFunctionName);



app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

  