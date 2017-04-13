const HtmlWebpackPlugin     = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const CleanWebpackPlugin    = require('clean-webpack-plugin');
const CopyWebpackPlugin     = require('copy-webpack-plugin');
const NODE_ENV = process.env.NODE_ENV || 'development';

const config = {

  entry: './src/app.js',
  output: {
    path: __dirname + '/dist',
    filename: "[name].[hash].js"
  },

  module: {
    rules: [

      // load and compile javascript
      { test: /\.js$/, exclude: /node_modules/, loader:"babel-loader" },
      
      // load and compile sass assets and css leftovers
			{ test: /\.scss$/, loader: "raw-loader!sass-loader" },
      { test: /\.css$/, loader: "raw-loader"},

      // load JSON files and HTML/PHP
      { test: /\.json$/, loader: "json" },
      { test: /\.html$/, exclude: /node_modules/, loader:"raw-loader" },
      { test: /\.php$/, loader: "file-loader" },

      // load fonts(inline base64 URLs for <=8k)
      { test: /\.(ttf|eot|svg|otf)$/, loader: "file-loader" },
      { test: /\.woff(2)?$/, loader: "url-loader?limit=8192&minetype=application/font-woff"},

      // load images (inline base64 URLs for <=8k images)
      // { test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=8192'}
      { test: /\.(png|jpg|gif)$/, loader: 'file-loader?name=assets/[name].[hash].[ext]'}
    ]
  },

  // inject js bundle to index.html
  plugins: [

	  new CopyWebpackPlugin([{ context: './src/lib', from: '**/*.php', to: 'lib'}]),

	  new HtmlWebpackPlugin({
	    template: './src/index.html',
	    inject: 'body',
	    minify: false
	  }),

	  new FaviconsWebpackPlugin('./src/assets/favicon.png'),
  ],

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
    new CleanWebpackPlugin(['dist'])
  );
}

module.exports = config;