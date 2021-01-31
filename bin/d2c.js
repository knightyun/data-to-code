#!/usr/bin/env node
/**
 * @file Main script file
 * @date 2021-01-31
 * @author knightyun <2386209384@qq.com>
 * @copyright Copyright (c) 2021, knightyun <https://github.com/knightyun>
 * @see <https://github.com/knightyun/data-to-code.git>
 * @version 0.0.1
 */

import fs from 'fs';
import path from 'path';
import readline from 'readline';

/*
d2c - Composite source data and code template into target code file.

USAGE:
    d2c [OPTIONS]

OPTIONS:
    -h, --help                          Show this help message
    -v, --version                       Show current version
    -d, --data-file <file|path>         Input data source file, type: ".txt/.csv",
                                          default: "./data.txt"
    -t, --template-file <file|path>     Input code template file, default: "./template.txt"
    -o, --output-file <file|path>            Output file name, generated in current directory,
                                          default: "./code.txt"

ERROR: Invalid option: **
ERROR: Invalid value: **

*/

const args = process.argv;
const argMap = new Map();
const validOptions = [
    '-h', '--help',
    '-v', '--version',
    '-d', '--data-file',
    '-t', '--template-file',
    '-o', '--output-file',
];

args.forEach((arg, index, arr) => {
    if (index === 0 || index === 1) {
        return;
    } else if (index % 2 === 0) {
        argMap.set(arg, '');
    } else {
        argMap.set(arr[index - 1], arg);
    }
});

for (let arg of argMap.keys()) {
    if (!validOptions.includes(arg)) {
        console.error('ERROR: Invalid option:', arg);
        process.exit(0);
    }
}

const dataFile =
    argMap.get('-d') ||
    argMap.get('--data-file') ||
    'data.txt';
const templateFile =
    argMap.get('-t') ||
    argMap.get('--template-file') ||
    'template.txt';
const outFile =
    argMap.get('-o') ||
    argMap.get('--output-file') ||
    'code.txt';

/**
 * 检查文件可访问性
 * @param {string} file - 文件或路径
 * @returns {Promise} - resolve() | reject(string)
 */
function checkFile(file) {
    return new Promise((resolve, reject) => {
        fs.access(file, fs.constants.R_OK, (err) => {
            if (err) {
                const msg = `ERROR: No such file or directory: ${path.resolve(file)}`;
                reject(msg);
            } else {
                resolve();
            }
        });
    });
}

/**
 * 获取数据源
 * @param {string} file - 文件或路径
 * @returns {Promise} - resolve(object[]) | reject(string)
 */
function getData(file) {
    const dataObj = [];
    const headers = [];
    const space = / +/;

    return new Promise((resolve, reject) => {
        checkFile(file).then(() => {
            const stream = fs.createReadStream(file, {
                encoding: 'utf-8',
            });
            let isFirstLine = true;

            readline.createInterface({
                input: stream,
            }).on('line', line => {
                if (isFirstLine) {
                    headers.push(...line.split(space));
                    isFirstLine = false;
                } else {
                    const words = line.split(space);
                    const obj = {};

                    for (let i = 0; i < headers.length; i++) {
                        obj[headers[i]] = words[i];
                    }
                    dataObj.push(obj);
                }
            }).on('close', () => {
                resolve(dataObj);
            })
        }).catch(msg => {
            reject(msg);
        });
    });
}

/**
 * 获取模板代码数据
 * @param {string} file - 文件或路径
 * @returns {Promise} - resolve(string) | reject(string)
 */
function getTemplate(file) {
    return new Promise((resolve, reject) => {
        checkFile(file).then(() => {
            let templateData = '';

            fs.createReadStream(file, {
                encoding: 'utf-8',
            }).on('data', chunk => {
                templateData += chunk;
            }).on('end', () => {
                resolve(templateData);
            });
        }).catch(msg => {
            reject(msg);
        })
    })
}

function compositeCode(dataFile, templateFile, outFile) {
    Promise.all([
        getData(dataFile),
        getTemplate(templateFile),
    ]).then(([data, template]) => {
        let output = '';

        for (let d of data) {
            let tmp = template;

            for (let k in d) {
                const reg = new RegExp(`{{${k}}}`, 'g');
                tmp = tmp.replace(reg, d[k]);
            }
            output += tmp;
        }
        writeOutFile(outFile, output);
    }).catch(msg => {
        console.error(msg);
        process.exit(0);
    })
}

function writeOutFile(file, data) {
    // fs.createWriteStream
    fs.writeFile(file, data, err => {
        if (err) {
            console.error('Write file failed:', err);
            process.exit(0);
        } else {
            console.log('Success!\noutput file is:', path.resolve(file));
        }
    })
}

compositeCode(dataFile, templateFile, outFile);