const BaseController = require('./base')

class ArticleController extends BaseController {
  async index() {
    const {ctx} = this
    const articles = await ctx.model.Article.find().populate('author').sort({createdAt:-1})
    this.success(articles)
  }

}

module.exports =  ArticleController