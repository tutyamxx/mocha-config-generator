#!/usr/bin/env node

/**
 *  mocha-config-generator - ☕ Mocha CLI tool to generate a configuration file boilerplate that supports different output formats.
 *  @version: v1.0.3
 *  @link: https://github.com/tutyamxx/mocha-config-generator
 *  @license: MIT
 **/
const yargs = require('yargs');
const jsYaml = require('js-yaml');
const fs = require('fs');
const path = require('path');
const { hideBin } = require('yargs/helpers');

const ANSI_Brown = '\x1b[33m';
const ANSI_Reset = '\x1b[0m';

// --| Default configuration file with the following default settings as boilerplate, most projects only need this
const defaultMochaConfig = {
    diff: true,
    spec: 'test/**/*.spec.js',
    extension: [ 'js', 'cjs', 'mjs'],
    timeout: 4000,
    reporter: 'spec',
    require: ['@babel/register'],
    slow: 75,
    grep: '',
    ignore: [],
    ui: 'bdd',
    forbidOnly: false,
    'watch-files': ['lib/**/*.js', 'test/**/*.js'],
    retries: 1,
    bail: false,
    color: true,
    growl: false,
    recursive: false,
    exit: true
};

const convertToFormat = (config, fileFormat) => {
    switch (fileFormat) {
        case 'yaml':
            return jsYaml.dump(config);
        case 'json':
            return JSON.stringify(config, null, 2);
        case 'js':
            return `module.exports = ${JSON.stringify(config, null, 2)};`;

        default:
            return jsYaml.dump(config);
    }
}

const runMochaConfigCLI = () => {
    const argv = yargs(hideBin(process.argv))
        .option('format', { description: 'Output format (yaml, yml, json, js)', default: 'yaml', type: 'string', choices: ['yaml', 'yml', 'json', 'js'] })
        .help()
        .version()
        .parse();

    const format = argv.format?.toLowerCase();
    let filePath = argv.output?.trim();

    const defaultFileName = `.mocharc.${format === 'yaml' ? 'yaml' : format}`;
    filePath = path.join('./', defaultFileName);

    const configString = convertToFormat(defaultMochaConfig, format);
    fs.writeFileSync(filePath, configString);

    console.log(`☕ Mocha configuration file generated: ${ANSI_Brown}${filePath}${ANSI_Reset}`);
}

module.exports = { convertToFormat, runMochaConfigCLI, defaultMochaConfig };

if (require.main === module) {
    runMochaConfigCLI();
}
