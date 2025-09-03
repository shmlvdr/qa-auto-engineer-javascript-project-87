### Hexlet tests and linter status:

[![Actions Status](https://github.com/shmlvdr/qa-auto-engineer-javascript-project-87/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/shmlvdr/qa-auto-engineer-javascript-project-87/actions)
![CI](https://github.com/shmlvdr/qa-auto-engineer-javascript-project-87/actions/workflows/ci.yml/badge.svg)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=shmlvdr_qa-auto-engineer-javascript-project-87&metric=coverage)](https://sonarcloud.io/summary/new_code?id=shmlvdr_qa-auto-engineer-javascript-project-87)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=shmlvdr_qa-auto-engineer-javascript-project-87&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=shmlvdr_qa-auto-engineer-javascript-project-87)

# Difference Calculator (QA Auto Engineer JavaScript Project 87)

## Description

The diff calculator is a program that determines the difference between two data structures. This is a popular task, and there are many online services available for solving it, such as http://www.jsondiff.com/. This mechanism is used for testing purposes or for automatically tracking changes in configuration files.

The utility's features include:

Support for different input formats, such as yaml and json
Generation of a report in plain text, stylish, and json formats

## Requirements

- **Node.js**: Version 14.x and above
- **Operating system**: Windows, macOS or any Unix-like system

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/shmlvdr/qa-auto-engineer-javascript-project-87.git

   ```

2. Go to the project directory:

   ```bash
   cd qa-auto-engineer-javascript-project-87

   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

## Difference Calculator:

1. Comparing flat files (yml/yaml):

   ```bash
   gendiff __fixtures__/file1.yaml __fixtures__/file2.yaml

   ```

2. Flat format:

   ```bash
   gendiff --format plain __fixtures__/file1.json __fixtures__/file2.json

   ```

3. Output in JSON:

   ```bash
   gendiff --format json __fixtures__/file1.json __fixtures__/file2.json
   ```

Each command will run the corresponding comparison in your terminal.

Contribution
If you have any ideas for improvement, please create a pull request or open an issue.

Feedback
If you have any questions or problems, you can contact me by email: daria1807@gmail.com

You can view the feature demonstration in the links below.

1. "Comparing flat files (yml/yaml)" [![asciicast](https://asciinema.org/a/dwDkQKA8U41QCqKhB5RBGqI7F.svg)](https://asciinema.org/a/dwDkQKA8U41QCqKhB5RBGqI7F)

2. "Flat format" [![asciicast](https://asciinema.org/a/lrc3CSgUQT9EHVZBLT0brfhQ1.svg)](https://asciinema.org/a/lrc3CSgUQT9EHVZBLT0brfhQ1)

3. "Output in JSON" [![asciicast](https://asciinema.org/a/VthGQ7O5vfmqCKTz0gX539Q8I.svg)](https://asciinema.org/a/VthGQ7O5vfmqCKTz0gX539Q8I)