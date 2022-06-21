# API Trading simulator

## About the project
This project has been developed by Arthur VEROT & Pierre CARETTE.
During our training at Ironhack, We built an API to run a [paper trading](https://en.wikipedia.org/wiki/Stock_market_simulator) app. On this app you can trade over 100 cryptos and 12 000 stocks. To achieve that, we used the [Binance](https://www.binance.com/fr/binance-api) and [IEX](https://iexcloud.io/docs/api/#api-reference) API.

## Tech stack
NodeJS | ExpressJS | MongoDB | Mongoose

## Features  
On our app, just like a classic paper trading app, you can **buy** 📈 stocks/cryptos and **sell** 📉 them.

## Model
- **User** (OneToMany relationship with Transaction & Holding) 
  - email
  - password
  - role (either 'user' or 'admin')
  - method.calculateHoldingsValue()

- **Holding** (ManyToMany relationship with Asset) 
  - userId
  - assetId
  - amount
  - valueInDollars
  - method.calculateHoldingValue()

- **Transaction** (ManyToMany relationship with Asset)
  - userId
  - assetId
  - transactionType
  - amount
  - valueAtGivenTime
  - transactionPrice

- **Asset**
  - name
  - symbol
  - image
  - method.calculateAssetValue()

## Configuration
Here is our API link (https://api-trading-simulator.herokuapp.com). You can find more information about how to use it in the postman documentation below.

### Postman documentation
To use our API, you can refer to our postman documentation 📜.
https://documenter.getpostman.com/view/21225395/UzBjrnaW