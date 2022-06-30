const concurently = require('concurrently');

const onTestFail = () => {
	console.error('This version does not pass the tests...');
	process.exit(1);
};

(() => {
	concurently(
		[
			'ENV=dev node scripts/set-env.js',
			'ng test --karma-config=scripts/config/karma-phantom.conf.js',
		],
		{
			prefix: '[test]',
			successCondition: 'last',
		}
	).catch(onTestFail);
})();
