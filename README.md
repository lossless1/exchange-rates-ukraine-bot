# Exchange-rates-ukraine-bot

Telegram bot to showing exchange rates every day

Json resources
http://resources.finance.ua/ru/public/currency-cash.json

http://telegram.me/exchangeRatesUkraineBot

## Introduction

It's bot for ukrainian people which allows to flexibly configure options to management your exchange rates of different banks.

## Installation

Clone the repo

`$ npm i`

`$ cp .env.example .env` and change configs

Create new store in `firestore` and create `firebaseKey` for connection to firebase

## Running Dev

To start dev env you need to run:

`$ npm run start:dev`

## Deploying

`$ npm run deploy:dev`
