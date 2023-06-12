const { default: axios } = require('axios');
var express = require('express');
var router = express.Router();
const shopify = require('shopify-api-node')
const themeId = 151138369820;
const accessToken = "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";
const ApiKey = "d9a39d32b685d87f3db716c673177754";
const ApiSecretKey = "d1ccec498fdff9432e73154ef3c51e0e";
const ShopName = "store-demo-singh.myshopify.com";
/* GET home page. */
router.get('/', function (req, res, next) {
  const newShopify = new shopify({
    shopName: ShopName,
    apiKey: ApiKey,
    password: accessToken,
    autoLimit: true,
  });
  const javascriptCode = `console.log('deepak')`;
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://store-demo-singh.myshopify.com/admin/api/2023-04/themes/151138369820/assets.json?asset[key]=layout/theme-test.liquid',
    headers: {
      'X-Shopify-Access-Token': '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',
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  };

  axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      newShopify.asset.create(themeId, {
        key: 'layout/theme-test.liquid',
        value: `${response.data.asset.value}<script src="http://localhost:5001/javascript/script.js"></script>`
      }).then(asset => {
        console.log('Theme file updated successfully:', asset);
      })
        .catch(err => {
          console.error('Error updating theme file:', err.message);
        });
    })
    .catch((error) => {
      console.log(error);
    });
  res.render('index', { title: 'Express' });
});

module.exports = router;
