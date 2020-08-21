const fs = require('fs')
const handlebars = require('handlebars')
const chalk = require('chalk')

module.exports = async () => {
    // 获取页面列表
    const list = fs.readdirSync('./src/views')
        .filter(v => v !== 'Home.vue')
        .map(v => ({
            name: v.replace('.vue', '').toLocaleLowerCase(),
            file: v
        }))


    // 路由
    compile({list}, './src/router.js', './template/router.hs.hbs')

    // 菜单
    compile({list}, './src/App.vue', './template/App.vue.hbs')

    
    /*
        编译模板
        meta:          数据定义
        filePath：     目标文件
        templatePath： 模板文件
    */
    function compile(meta, filePath, templatePath) {
        if(fs.existsSync(templatePath)) {
            const content = fs.readFileSync(templatePath).toString()
            const result = handlebars.compile(content)(meta)
            fs.writeFileSync(filePath, result)
            console.log(`${filePath} 创建成功`)
        }
    }
}