const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanPlugin       = require('clean-webpack-plugin');
const NODE_ENV = process.env.NODE_ENV || 'development';

const config = {

  entry: './src/bootstrap.js',
  output: {
    path: __dirname + '/dist',
    filename: "bundle.js"
  },

  module: {
    rules: [

      // load and compile javascript
      { test: /\.js$/, exclude: /node_modules/, loader:"babel-loader" },
      
      // load and compile sass assets and css leftovers
			{ test: /\.scss$/, loader: "style-loader!css-loader!sass-loader" },
      { test: /\.css$/, loader: "style-loader!css-loader"},

      // load JSON files and HTML
      { test: /\.json$/, loader: "json" },
      { test: /\.html$/, exclude: /node_modules/, loader:"raw-loader" },

      // load fonts(inline base64 URLs for <=8k)
      { test: /\.(ttf|eot|svg|otf)$/, loader: "file-loader" },
      { test: /\.woff(2)?$/, loader: "url-loader?limit=8192&minetype=application/font-woff"},

      // load images (inline base64 URLs for <=8k images)
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
    ]
  },

  // inject js bundle to index.html
  plugins: [new HtmlWebpackPlugin({
    template: './src/index.html',
    inject: 'body',
    minify: false
  })],

  // webpack dev server configuration
  devServer: {
    contentBase: "./src",
    noInfo: false,
    hot: false
  }
};

if (NODE_ENV === 'development') {
  config.devtool = '#inline-source-map';
}

if (NODE_ENV === 'production') {
  config.plugins.push(
    // Remove build related folders
    new CleanPlugin(['dist'])
  );
}

module.exports = config;