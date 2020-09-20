const less = require("less")

// 可以做，但没必要
module.exports = function (source) {
  less.render(source, (e, output) => {
    this.callback(e, output.css)
  })
}
