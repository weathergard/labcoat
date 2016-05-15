module.exports = {
  context: __dirname,
  entry: './build/index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'labcoat.js',
    libraryTarget: "var",
    library: "labcoat"
  }
}
