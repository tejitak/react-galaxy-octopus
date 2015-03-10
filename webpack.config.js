module.exports = {
  cache: true,

  watch: true,

  entry: {
    'app': ['./js/app.js']
  },

  output: {
    filename: '[name].js'
  },
  
  devtool: 'inline-source-map',

  module: {
    loaders: [
      { test: /\.js$|\.jsx$/, exclude: /node_modules|public\/dist/, loader: 'babel-loader?experimental&optional=selfContained'}
    ]
  },

  resolve: {
    root: __dirname,
    extensions: ['', '.js', '.jsx']
  }
};