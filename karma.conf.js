// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
    config.set({
        frameworks: ['jasmine', '@angular-devkit/build-angular'],
        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-verbose-reporter'),
            require('@angular-devkit/build-angular/plugins/karma')
        ],
        reporters: ['verbose'],
        port: 9876,
        browsers: ['ChromeHeadless'],
        singleRun: true
    });
};
