module.exports = {
	entry: "./app/components/Main.js",
	output: {
		filename: "public/bundle.js"
	},
	module: {
		loaders: [{
			test: /\.jsx?$/,
			exclude: /(node_modules|bower_components)/,
			loader: 'babel-loader',
			query: {
				presets: ['react', 'es2015']
			}
		}]
	},
  externals: {
    'Config': JSON.stringify(process.env.ENV === 'PRODUCTION' ? require('./configs/prod.json') : require('./configs/dev.json'))
  }
};
