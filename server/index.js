const keys = require('./keys')

//express
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(bodyParser.json())

// posgres client

const { Pool } = require('pg')
const pgClient = new Pool({
    user: keys.pgUser,
    host: keys.pgHost,
    database: keys.database,
    password: keys.pgPassword,
    port: keys.pgPort
})

pgClient.on('connect', () => {
    pgClient
      .query('CREATE TABLE IF NOT EXISTS values (number INT)')
      .catch((err) => console.log(err))
  })


//redis 

const redis = require('redis')
const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: () => 100
})
const redisPublisher = redisClient.duplicate()

// api
app.get('/', (req, res) => {
    res.status(200).send('pong')
})

app.get('/values/all', async (req, res) => {
    const values = await pgClient.query('SELECT * FROM values')
    res.send(values.rows)
})

app.get('/values/current', async (req, res) => {
    console.log('incomming request ' + req.url);
    redisClient.hgetall('values', (err, values) => {
        if (err) {
            res.status(404).send()
        } else {
            res.send(values)
        }
    })
})

app.post('/values', async (req, res) => {
    const index = req.body.index
    if (parseInt(index) > 40) {
        return res.status(402).send('Index too high')
    }
    redisClient.hset('values', index, 'Not calculated!')
    redisPublisher.publish('insert', index)
    pgClient.query('INSERT INTO values (number) VALUES($1)', [index])
    res.send({working: true})
})

app.listen(5000, err => { if (err)  console.log('error to start server ' + err); }) 