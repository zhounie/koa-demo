const Router = require('koa-router')
const router = new Router()
const User = require('../../models/User')

router.post('/register', async (ctx) => {
    const findResult = await User.find({
        email: ctx.request.body.email
    })
    if (findResult.length > 0) {
        return ctx.body = {
            code: 500,
            msg: '邮箱被占用'
        }
    }
    const newUser = new User({
        name: ctx.request.body.name,
        email: ctx.request.body.email
    })
    try {
        let user = await newUser.save()
        ctx.body = {
            code: 200,
            data: user
        }
    } catch (error) {
        ctx.body = {
            code: 500,
            msg: error
        }
    }
})
router.get('/list', async (ctx) => {
    await User.find({}, (err, data) => {
        if (err) {
            ctx.body = {
                code: 200,
                msg: err
            }
            return console.log(err);
        }
        ctx.body = {
            code: 200,
            data: {
                list: data,
                pageSize: 10,
                currentPage: 1,
                total: data.length
            }
        }
    })
})


module.exports = router.routes()