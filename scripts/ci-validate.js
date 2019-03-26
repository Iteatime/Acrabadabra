const concurently = require('concurrently');

const runUnitTest = () => {
  concurently(
    [
      'ENV=dev node scripts/set-env.js',
      'ng test --karma-config=scripts/config/karma-phantom.conf.js'
    ],
    {
      prefix: '[test]',
      successCondition: 'last'
    }).catch(onTestFail);
};

const onTestFail = () => {
  console.error('This build is not passing the tests...');
};


runUnitTest();
