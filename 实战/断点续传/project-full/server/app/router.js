'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app
  const jwt = app.middleware.jwt({app})
  router.get('/', controller.home.index)
  // 验证码
  router.get('/captcha', controller.util.captcha)
  // 发送邮箱验证码
  router.get('/sendcode', controller.util.sendcode)

  router.post('/uploadfile', controller.util.uploadfile)
  router.post('/mergefile', controller.util.mergefile)
  router.post('/checkfile', controller.util.checkfile)

  router.group({name: 'user', prefix: '/user'}, router => {
    const {info, register, login, verify} = controller.user

    router.post('/register', register)
    router.get('/info', jwt, info)
    router.post('/login', login)
    router.get('/verify', verify)
  })

  router.group({name: 'article', prefix: '/article'}, router => {
    const {index} = controller.article

    router.get('/', index)
  })
}
