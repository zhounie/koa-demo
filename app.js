const Koa = require("koa")
const Router = require('koa-router')
const Mongoose = require('mongoose')
const bodyParser = require('koa-bodyparser')
const db = require('./config/keys').mongoURI

const app = new Koa()
const router = new Router()


app.use(bodyParser())

const users = require('./routes/api/users')


// 连接数据库
Mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('connect success...')
    })
    .catch(() => {
        console.log('connect error');
    })

router.use('/api/users', users)

app.use(router.routes()).use(router.allowedMethods())

const port = process.env.PORT || 8080

app.listen(port, () => {
    console.log(`server localhost:${port}`);
    
})