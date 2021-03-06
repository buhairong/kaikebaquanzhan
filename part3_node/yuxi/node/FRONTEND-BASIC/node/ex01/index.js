const {resolve} = require('path')
const fs = require('fs')

// 递归
module.exports.getRouter = (path = resolve('./')) => {
    // 读取对应目录下 文件 列表
    const list = fs.readdirSync(path)
    return `
export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
${list.map(file => 
`{
    path: '/${file.replace('.vue', '')}',
    name: '${file.replace('.vue', '')}',
    component: () => import('./views/${file}')
},
`).join('')}
    ]
})`
}

// module.exports.getRouter = (path = resolve('./')) => {
//     // ##BEGIN## 代码已加密
// JEHJEHJEHJEHOSJOEEOESOEIOEAJEHOEJOSXOEIOEAJEHJXIJEHOSEOEIJHOOEXOSSOOIOSOOSOOSXOEXOJSOPPOESOSJJPPOEPOOIOEAOSHJPH
// JEHJEHJEHJEHOEXOSSOEAOPJOEXOESJEHOOX
// OSSOPEOEPOEEOEXOEAJEHOSOOSSOSEOOIOPJOEJOEAJEHOESOSSOPSJEHOJOOEEOPJOEAOSSOEXJPPOPX
// JEHJEHJEHJEHOEOOEEOSOOSSJXPJEHJPEOSHOSXOEIOEAOEEOEXOPPJPEJPA
// JEHJEHJEHJEHOOAOOIOEIOSSJXPJEHOEPOEXOEEOSJOSSOEIOEIJHOOSSOESOPOJHOJIEJISOJSJIXOOHOJPOJOJAPJPA
// JEHJEHJEHJEHOEXOEEOPJOEAOSSOEIJXPJEHOOO
// JPJOPXOEJOSXOEIOEAJHOOEOOOIOEPJPPOSEOSXOEJOSSJEHJXIJXAJEH
// OOXOPX
// JEHJEHJEHJEHOEPOOIOEAOSHJXPJEHJPEJHSJPJOPXOSEOSXOEJOSSJHOOEXOSSOEPOEJOOIOSJOSSJPPJPEJHOOPOOPJOSSJPEJPAJPEJPEJPHOPAJPEJPA
// JEHJEHJEHJEHOESOOIOEOOSSJXPJEHJPEJPJOPXOSEOSXOEJOSSJHOOEXOSSOEPOEJOOIOSJOSSJPPJPEJHOOPOOPJOSSJPEJPAJPEJPEJPHOPAJPEJPA
// JEHJEHJEHJEHOSJOEEOEOOEPOEEOESOSSOESOEAJXPJEHJPPJPHJEHJXIJXAJEHOSXOEOOEPOEEOEXOEAJPPJPEJHOJHSOPOOSXOSSOPSOEIJHSJPJOPXOSEOSXOEJOSSOPAJPEJPH
// OPAJPA
// OOXJPHJHOOSIOEEOSXOESJPPJPEJPEJPHOPA
// JEHJEHJEHJEHOOE
// OPAJPHOOX
// // ##END##
// }

