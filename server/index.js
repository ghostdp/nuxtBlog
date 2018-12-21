
const express = require('express')
const { Nuxt, Builder } = require('nuxt')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const apiRouter = require('./router/api')

const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000
const mongoUrl = 'mongodb://localhost:27017/blog'

app.set('port', port)

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }
  app.use(cookieParser())
  app.use(session({
    secret: '#$%#$%',
    name : 'sessionId',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge : 1000 * 60 * 60
    }
  }))
  app.use(express.json())
  app.use(express.urlencoded())
  app.use('/api',apiRouter)

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  
  mongoose.connect(mongoUrl , (err)=>{
    if(err){
      console.log('数据库连接失败');
      return;
    }
    console.log('数据库连接成功');
    app.listen(port, host)
    console.log('Server listening on http://' + host + ':' + port) // eslint-disable-line no-console
  })

}
start()
