const fs = require('fs');
const yaml = require('js-yaml');
const { convertToFormat, runMochaConfigCLI, defaultMochaConfig } = require('../bin/index');
const path = require('path');

jest.mock('fs');

describe('defaultMochaConfig default values', () => {
    test('Should have expected values for all properties', () => {
        expect(defaultMochaConfig.diff).toBe(true);
        expect(defaultMochaConfig.spec).toBe('test/**/*.spec.js');
        expect(defaultMochaConfig.extension).toEqual(['js', 'cjs', 'mjs']);
        expect(defaultMochaConfig.timeout).toBe(4000);
        expect(defaultMochaConfig.reporter).toBe('spec');
        expect(defaultMochaConfig.require).toEqual(['@babel/register']);
        expect(defaultMochaConfig.slow).toBe(75);
        expect(defaultMochaConfig.grep).toBe('');
        expect(defaultMochaConfig.ignore).toEqual([]);
        expect(defaultMochaConfig.ui).toBe('bdd');
        expect(defaultMochaConfig.forbidOnly).toBe(false);
        expect(defaultMochaConfig['watch-files']).toEqual(['lib/**/*.js', 'test/**/*.js']);
        expect(defaultMochaConfig.retries).toBe(1);
        expect(defaultMochaConfig.bail).toBe(false);
        expect(defaultMochaConfig.color).toBe(true);
        expect(defaultMochaConfig.growl).toBe(false);
        expect(defaultMochaConfig.recursive).toBe(false);
        expect(defaultMochaConfig.exit).toBe(true);
    });
});

describe('Testing CLI functionalities', () => {
    it('Should convert to YAML format correctly', () => {
        const config = { a: 1 };
        const expectedYaml = 'a: 1';

        expect(convertToFormat(config, 'yaml')?.trim()).toBe(expectedYaml);
    });

    it('Should convert to YML format correctly', () => {
        const config = { a: 1 };
        const expectedYaml = 'a: 1';

        expect(convertToFormat(config, 'yml')?.trim()).toBe(expectedYaml);
    });

    it('Should convert to JSON format correctly', () => {
        const config = { a: 1 };
        const expectedJson = '{\n  "a": 1\n}';

        expect(convertToFormat(config, 'json')).toBe(expectedJson);
    });

    it('Should convert to JS format correctly', () => {
        const config = { a: 1 };
        const expectedJs = 'module.exports = {\n  "a": 1\n};';

        expect(convertToFormat(config, 'js')).toBe(expectedJs);
    });

    it('Should default to YAML if unknown format is given', () => {
        const config = { a: 1 };
        const output = convertToFormat(config, 'dsadsa')?.trim();

        expect(output).toBe('a: 1');
    });
});

describe('Testing CLI behavior', () => {
    const originalArgv = process.argv;

    beforeEach(() => {
        jest.clearAllMocks();
        process.argv = [originalArgv[0], originalArgv[1]];
    });

    beforeAll(() => jest.spyOn(console, 'log').mockImplementation(() => {}));

    afterAll(() => {
        console.log.mockRestore();
        process.argv = originalArgv;
    });

    it('Should write a YAML file when empty --format is specified', () => {
        process.argv.push('');
        runMochaConfigCLI();

        expect(fs.writeFileSync).toHaveBeenCalled();
        const [writtenPath, data] = fs.writeFileSync.mock.calls[0];

        expect(path.basename(writtenPath)).toBe('.mocharc.yaml');

        const parsedYaml = yaml.load(data);
        expect(parsedYaml).toEqual(defaultMochaConfig);
    });

    it('Should write a YAML file when no --format is specified', () => {
        process.argv.push('--format');
        runMochaConfigCLI();

        expect(fs.writeFileSync).toHaveBeenCalled();
        const [writtenPath, data] = fs.writeFileSync.mock.calls[0];

        expect(path.basename(writtenPath)).toBe('.mocharc.yaml');

        const parsedYaml = yaml.load(data);
        expect(parsedYaml).toEqual(defaultMochaConfig);
    });

    it('Should write a YAML file with --format yaml param', () => {
        process.argv.push('--format=yaml');
        runMochaConfigCLI();

        expect(fs.writeFileSync).toHaveBeenCalled();
        const [writtenPath, data] = fs.writeFileSync.mock.calls[0];

        expect(path.basename(writtenPath)).toBe('.mocharc.yaml');

        const parsedYaml = yaml.load(data);
        expect(parsedYaml).toEqual(defaultMochaConfig);
    });

    it('Should write a YML file with --format yml param', () => {
        process.argv.push('--format=yml');
        runMochaConfigCLI();

        expect(fs.writeFileSync).toHaveBeenCalled();
        const [writtenPath, data] = fs.writeFileSync.mock.calls[0];

        expect(path.basename(writtenPath)).toBe('.mocharc.yml');

        const parsedYaml = yaml.load(data);
        expect(parsedYaml).toEqual(defaultMochaConfig);
    });

    it('Should write a JSON file with --format json param', () => {
        process.argv.push('--format=json');
        runMochaConfigCLI();

        expect(fs.writeFileSync).toHaveBeenCalled();
        const [writtenPath, data] = fs.writeFileSync.mock.calls[0];

        expect(path.basename(writtenPath)).toBe('.mocharc.json');

        const parsed = JSON.parse(data);
        expect(parsed).toEqual(defaultMochaConfig);
    });

    it('Should write a JS file with --format js param', () => {
        process.argv.push('--format=js');
        runMochaConfigCLI();

        expect(fs.writeFileSync).toHaveBeenCalled();
        const [writtenPath, data] = fs.writeFileSync.mock.calls[0];

        expect(path.basename(writtenPath)).toBe('.mocharc.js');

        const module = { exports: {} };
        new Function('module', data)(module);

        expect(module.exports).toEqual(defaultMochaConfig);
    });
});
