import scss from 'rollup-plugin-scss'
import postcss from 'postcss'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import perfectionist from 'perfectionist'

const buildPath = './build/'
const inputFile = './src/compiler.js'
const defaultJsBuildSettings = [
	{
		file: buildPath + 'output.js',
		format: 'cjs',
		sourcemap: false,
	},
]

export default [
	{
		input: inputFile,
		output: defaultJsBuildSettings,
		plugins: [
			scss({
				output: buildPath + 'heartthrob.min.css',
				failOnError: true,
				processor: () => postcss([
					autoprefixer(),
					cssnano({
						preset: 'default'
					})
				]),
			}),
		],
	},
	{
		input: inputFile,
		output: defaultJsBuildSettings,
		plugins: [
			scss({
				output: buildPath + 'heartthrob.css',
				failOnError: true,
				processor: () => postcss([
					autoprefixer(),
					perfectionist({
						format: 'compact'
					})
				]),
			}),
		],
	},
]
