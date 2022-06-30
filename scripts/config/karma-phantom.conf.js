process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function (config) {
	config.set({
		basePath: '../src/',
		frameworks: ['jasmine', '@angular-devkit/build-angular'],
		plugins: [
			require('karma-jasmine'),
			require('karma-chrome-launcher'),
			require('karma-jasmine-html-reporter'),
			require('karma-coverage-istanbul-reporter'),
			require('karma-summary-reporter'),
			require('@angular-devkit/build-angular/plugins/karma'),
		],
		browsers: ['CustomChromeHeadless'],
		reporters: ['summary'],
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: false,
		singleRun: true,
		client: {
			clearContext: false, // leave Jasmine Spec Runner output visible in browser
		},
		coverageIstanbulReporter: {
			dir: require('path').join(__dirname, '../coverage'),
			reports: ['html', 'lcovonly'],
			fixWebpackSourcePaths: true,
		},
		summaryReporter: {
			// 'failed', 'skipped' or 'all'
			show: 'failed',
			// Limit the spec label to this length
			specLength: 50,
			// Show an 'all' column as a summary
			overviewColumn: true,
		},
		customLaunchers: {
			CustomChromeHeadless: {
				base: 'ChromeHeadless',
				flags: ['–no-sandbox', '–disable-setuid-sandbox'],
			},
		},
	});
};
