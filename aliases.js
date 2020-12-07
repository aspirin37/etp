const path = require('path')

module.exports = function aliases(config) {
  config.resolve.alias
    .set('api', path.join(__dirname, './src/api'))
    .end();
}
