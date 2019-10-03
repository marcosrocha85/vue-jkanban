const jKanban = require("jkanban");

module.exports = {
  configureWebpack: {
    plugins: [
      new jKanban()
    ]
  }
}