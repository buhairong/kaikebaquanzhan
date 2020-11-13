const svgCaptcha = require('svg-captcha')
const BaseController = require('./base')
const fse = require('fs-extra')
const path = require('path')

class UtilController extends BaseController {
  // 生成验证码svg图片
  async captcha() {
    const captcha = svgCaptcha.create({
      size: 4,
      fontSize: 50,
      width: 100,
      height: 40,
      noise: 3
    })
    
    console.log("captcha:", captcha.text)
    this.ctx.session.captcha = captcha.text
    this.ctx.response.type = 'image/svg+xml'

    this.ctx.body = captcha.data
  }

  // 发送邮箱验证码
  async sendcode() {
    const {ctx} = this
    const email = ctx.query.email
    let code = Math.random().toString().slice(2,6)
    console.log("code:", code)

    ctx.session.emailcode = code

    const subject = "开课吧验证码"
    const text = ''
    const html = `<h2>小开社区</h2><a href="https://kaikeba.com"><span>${code}</span></a>`
  
    const hasSend = await this.service.tools.sendMail(email,subject, text, html)

    if(hasSend) {
      this.message('发送成功')
    }else{
      this.error('发送失败')
    }
  }

  // 1. 文件基础上传
  async uploadfile() {
    const {ctx} = this
    const file = ctx.request.files[0]
    const {hash, name} = ctx.request.body
    
    const chunkPath = path.resolve(this.config.UPLOAD_DIR, hash)

    // 合并之后，文件最终的存储位置
    //const filePath = path.resolve(this.config.UPLOAD_DIR, hash)

    if(!fse.existsSync(chunkPath)) {
      await fse.mkdir(chunkPath)
    }

    await fse.move(file.filepath, chunkPath+"/"+name)

    this.message('切片上传成功')
    // this.success({
    //   url: `/public/${file.filename}`
    // })
  }
}

module.exports = UtilController
