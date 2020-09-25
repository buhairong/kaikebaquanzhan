// 做⼈嘛，最重要的是开⼼
class fileWebpackPlugin {
  apply(compiler) {
    compiler.hooks.emit.tapAsync("fileWebpackPlugin", (compilation, cb) => {
      //
      const len = Object.keys(compilation.assets).length;
      let content = `文件的数量：${len}`;
      for (let filename in compilation.assets) {
        content += `文件名：${filename}\n`
      }

      compilation.assets["file.txt"] = {
        source: function () {
          return content
        },
        size: function () {
          return 1024;
        },
      };
      cb();
    });
  }
}

module.exports = fileWebpackPlugin;
