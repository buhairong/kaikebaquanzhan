const md5 = require('md5')
const BaseController = require('./base')

const createRule = {
    email: {type: "email"},
    nickname: {type: "string"},
    passwd: {type: "string"},
    captcha: {type: "string"},
}

const HashSalt = ":kaikeba@good!@!123"

class UserController extends BaseController {
    async login() {

    }

    async register() {
        const {ctx} = this

        try {
            // 校验传递的参数
            ctx.validate(createRule)
        }catch(e) {
            return this.error('参数校验失败', -1, e)
        }

        const {email, nickname, passwd, captcha} = ctx.request.body
        console.log(email, nickname, passwd, captcha)

        if(captcha.toUpperCase() !== ctx.session.captcha.toUpperCase()) {
            return this.error('验证码错误')
        }

        // 注册邮箱是否存在
        if(await this.checkEmail(email)) {
            return this.error('邮箱重复了')
        }

        const ret = await ctx.model.User.create({
            email,
            nickname,
            passwd: md5(passwd + HashSalt),
            captcha
        })

        if(ret._id) {
            return this.message('注册成功')
        }else {
            return this.error('注册失败')
        }
    }

    async checkEmail(email) {
        const user = await this.ctx.model.User.findOne({email})
        return user
    }

    async verify() {
        // 校验用户名是否存在
    }

    async info() {

    }
}

module.exports = UserController