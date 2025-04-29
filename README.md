# ☕ Mocha Config Generator

<p align="center"><a href="https://nodei.co/npm/mocha-config-generator/"><img src="https://nodei.co/npm/mocha-config-generator.png"></a></a></p>
<p align="center">
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg">
</p>

**Mocha CLI tool to generate a configuration file boilerplate that supports different output formats.**

Is it useful? For me, yes. It's a side project, ain't that deep :3

## ✨ Features

*   **Generate configuration files:** Easily create `.mocharc` files for your Mocha tests.
*   **Multiple output formats:**  Supports `yaml`, `yml`, `json`, and `js` formats.
*   **Customizable:**  Uses a default configuration that can be easily extended in your project.
*   **Simple CLI:**  Easy to use with minimal configuration.

## 🚀 Installation

```bash
npm install -g mocha-config-generator
```

## 💻 Usage

```bash
mocha-config-generator [options]
```

### Options

*   `--format <format>`:  Output format (`yaml`, `yml`, `json`, `js`). Defaults to `yaml`.
*   `--version`: Outputs the CLI version.
*   `--help`: Shows more help.

**Examples:**

* Configuration file is generated in the `directory` where the command is run
*   Generate a YAML configuration file (default):

    ```bash
    mocha-config-generator
    ```

    or

    ```bash
    mocha-config-generator --format yaml
    ```

*   Generate a YML configuration file:

    ```bash
    mocha-config-generator --formal yml
    ```

*   Generate a JSON configuration file:

    ```bash
    mocha-config-generator --format json
    ```

*   Generate a JavaScript configuration file:

    ```bash
    mocha-config-generator --format js
    ```

## ⚙️ Default Configuration Template

The tool generates a configuration file with the following default settings as boilerplate (the most commonly used):

- `diff`: Shows diffs of expected vs. actual values.
- `spec`: Glob pattern for test files.
- `extension`: Array of file extensions to include.
- `timeout`: Timeout in milliseconds for each test.
- `reporter`: Mocha reporter to use.
- `require`: Modules to require before running tests.
- `slow`: Threshold in milliseconds to consider a test slow.
- `grep`: Filter tests by string.
- `ignore`: Array of files to ignore.
- `ui`: Mocha UI to use.
- `forbidOnly`: Whether to forbid the use of only.
- `'watch-files'`: Files to watch for changes.
- `retries`: Number of times to retry failed tests.
- `bail`: Whether to exit after the first failed test.
- `color`: Whether to use color output.
- `growl`: Whether to use Growl notifications.
- `recursive`: Whether to search for tests recursively.
- `exit`: Whether to exit after all tests have run.

## 🔗 Links

*   [☕ CLI Tool GitHub Repository](https://github.com/tutyamxx/mocha-config-generator)
*   [☕ Mocha Documentation](https://mochajs.org/#configuring-mocha-nodejs)
