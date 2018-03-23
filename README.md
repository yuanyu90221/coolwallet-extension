# CoolWallet Extension

## 結構
 
 1 content_scripts: 畫面載入的js 邏輯
 
 2 background_scripts: 瀏覽器一打開就執行的js 邏輯

 3 popup.html: browserAction icon打開後的畫面

 4 manifest.json: 對於web-extension的設定欓

## 資料結構

 1 OrderBook: 用來儲存 每筆Transaction的資料

## 功能
 
 1 顯示帳號的qrcode

 2 選擇provider

## TODO

  1 gen Wallet key pair

  2 send transaction to ether network from web3.js

  3 send and receive Token from Wallet

  4 add webpack config for chrome and mozilla 

  5 add identity machanism for auth

## Usage

  1 build with gulp

```
npm run gulp-build
```

  2 import to the browser side

## Notice

  1 目前已新增google-auth 到extension內

  但目前由於還沒上架 故必須要先到background-script console.log看目前的redirect url

  再重新註冊一個固定的值

  2 目前寫法build 在firefox的版本

  如果要換到chrome必須要把browser系列的function做promisify