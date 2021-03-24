#!/usr/bin/env node
/**
 * @file Main script file
 * @date 2021-01-31
 * @author knightyun <2386209384@qq.com>
 * @copyright Copyright (c) 2021, knightyun <https://github.com/knightyun>
 * @see <https://github.com/knightyun/data-to-code.git>
 * @todo
 * - 文件名有 “-” 无法识别
 * - 内置默认模板
 */
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const msgObj = require('./message');
const packageData = require('../package.json');

const args = process.argv;
const argMap = new Map();
const validOptions = [
    '-g', '--generate',
    '-d', '--data-file',
    '-t', '--template-file',
    '-o', '--output-file',
    '-h', '--help',
    '-v', '--version',
];
const argFlags = {};
let defaultDataFile = 'data.csv';
let defaultTemplateFile = 'template.txt';
let defaultOutFile = 'code.txt';
const sysLang = process.env.LANG;
const defaultLang = 'EN';
let LANG;

/**
 * Set message language
 */
function setLanguage() {
    if (sysLang === 'zh_CN.UTF-8' || sysLang === 'zh_CN') {
        LANG = 'ZH';
    } else if (sysLang === 'en_US.UTF-8' || sysLang === 'en_US') {
        LANG = 'EN';
    } else {
        LANG = defaultLang;
    }
}

/**
 * Parse and store command line arguments
 */
function parseArgs() {
    for (let i = 0; i < args.length; i++) {
        if (i === 0 || i === 1) continue;

        if (args[i].includes('-')) {
            if (args[i + 1] && !args[i + 1].includes('-')) {
                argMap.set(args[i], args[i + 1]);
            } else {
                argMap.set(args[i], '');
            }
        }
    }

    // Validate arguments
    for (let arg of argMap.keys()) {
        if (!validOptions.includes(arg)) {
            console.error(msgObj.invalidOption[LANG], arg);
            process.exit(0);
        }
    }
}

/**
 * Init arg flags to false
 */
function initArgFlags() {
    validOptions.forEach(arg => {
        argFlags[arg] = false;
    });
}

/**
 * Set switch flags by input args
 */
function setArgFlags() {
    for (let arg of argMap.keys()) {
        argFlags[arg] = true;
    }
}

/**
 * Execute action by args
 */
function executeArgs() {
    if (argFlags['-h'] || argFlags['--help']) {
        showHelp();
        return;
    }
    if (argFlags['-v'] || argFlags['--version']) {
        showVersion();
        return;
    }

    if (argFlags['-d'] || argFlags['--data-file']) {
        defaultDataFile = argMap.get('-d') || argMap.get('--data-file');
    }
    if (argFlags['-t'] || argFlags['--template-file']) {
        defaultTemplateFile = argMap.get('-t') || argMap.get('--template-file');
    }
    if (argFlags['-o'] || argFlags['--output-file']) {
        defaultOutFile = argMap.get('-o') || argMap.get('--output-file');
    }
    if (argFlags['-g'] || argFlags['--generate']) {
        genCodeFile();
        return;
    }

    showHelp();
}

/** 
 * Generate output code file
 */
function genCodeFile() {
    const dataFile =
        argMap.get('-d') ||
        argMap.get('--data-file') ||
        defaultDataFile;
    const templateFile =
        argMap.get('-t') ||
        argMap.get('--template-file') ||
        defaultTemplateFile;
    const outFile =
        argMap.get('-o') ||
        argMap.get('--output-file') ||
        defaultOutFile;
    
    compositeCode(dataFile, templateFile, outFile);
}

/**
 * Check file accessibility
 * @param {string} file - File or path
 * @param {string} type - "data" | "template"
 * @returns {Promise}
 */
function checkFile(file, type) {
    return new Promise((resolve, reject) => {
        fs.access(file, fs.constants.R_OK, (err) => {
            if (err) {
                genFile(file, type).then(msg => {
                    resolve({
                        isFileExist: false,
                        msg,
                    });
                }).catch(err => {
                    reject(err);
                });
            } else {
                resolve({
                    isFileExist: true,
                });
            }
        });
    });
}

/**
 * Get data source
 * @param {string} file - File or path
 * @returns {Promise}
 */
function getData(file) {
    const dataObj = [];
    const headers = []; // Fields of table header
    const spaceDelimiter = /[\t\s]+/;
    const commaDelimiter = /,/;

    return new Promise((resolve, reject) => {
        checkFile(file, 'data').then(res => {
            const { isFileExist } = res;
            if (!isFileExist) resolve(res);

            const fileExt = path.extname(file);
            const delimiter = fileExt === '.csv'
                ? commaDelimiter
                : spaceDelimiter;
            const stream = fs.createReadStream(file, {
                encoding: 'utf-8',
            });
            let isFirstLine = true;

            readline.createInterface({
                input: stream,
            }).on('line', line => {
                if (isFirstLine) {
                    // Recognize the first line of file
                    headers.push(...line.split(delimiter));
                    isFirstLine = false;
                } else {
                    // Recognize space in quotes
                    const quoteWords = line.match(/".+?"/g);
                    const count = quoteWords ? quoteWords.length : 0;
                    let _line = line;

                    // Replace quote words with sequential placeholders
                    for (let i = 0; i < count; i++) {
                        _line = _line.replace(/".+?"/, `##${i + 1}`);
                    }

                    const words = _line.split(delimiter);
                    const obj = {};

                    // Recovery sequential placeholders to origin words
                    for (let i = 0; i < count; i++) {
                        const idx = words.indexOf(`##${i + 1}`);
                        const quoteWord = quoteWords[i].replace(/"/g, '');

                        words[idx] = quoteWord;
                    }

                    for (let i = 0; i < headers.length; i++) {
                        obj[headers[i]] = words[i];
                    }
                    dataObj.push(obj);
                }
            }).on('close', () => {
                resolve({
                    ...res,
                    data: dataObj,
                });
            })
        }).catch(msg => {
            reject(msg);
        });
    });
}

/**
 * Get template code
 * @param {string} file - File or path
 * @returns {Promise} - resolve(string) | reject(string)
 */
function getTemplate(file) {
    return new Promise((resolve, reject) => {
        checkFile(file, 'template').then(res => {
            const { isFileExist } = res;
            if (!isFileExist) resolve(res);

            let templateData = '';

            fs.createReadStream(file, {
                encoding: 'utf-8',
            }).on('data', chunk => {
                templateData += chunk;
            }).on('end', () => {
                // Escape backslash
                templateData = templateData.replace(/\\(.)/g, '$1');

                resolve({
                    ...res,
                    data: templateData,
                });
            });
        }).catch(msg => {
            reject(msg);
        })
    })
}

/**
 * Generate specific file(null file)
 * @param {string} file - File or path
 * @param {string} type - "data" | "template"
 */
function genFile(file, type) {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, '', err => {
            if (err) {
                reject(`${msgObj.writeFailed[LANG]} ${err}`);
            } else {
                const msg = type === 'template' ? (
                    `${msgObj.success[LANG]}\n` +
                    `  ${msgObj.genTemplateFile[LANG]} ${path.resolve(file)}\n` +
                    `  ${msgObj.fillFile[LANG]}\n`
                ) : (
                    `${msgObj.success[LANG]}\n` +
                    `  ${msgObj.genDataFile[LANG]} ${path.resolve(file)}\n` +
                    `  ${msgObj.fillFile[LANG]}\n`
                );

                resolve(msg);
            }
        });
    });
}

/**
 * Composite data source file and template code file
 * @param {string} dataFile - Data source file
 * @param {string} templateFile - Code template file
 * @param {string} outFile - output code file
 */
function compositeCode(dataFile, templateFile, outFile) {
    Promise.all([
        getData(dataFile),
        getTemplate(templateFile),
    ]).then(([data, template]) => {
        const {
            isFileExist: isDataFileExist,
            msg: dataMsg,
            data: _data,
        } = data;
        const {
            isFileExist: isTemplateFileExist,
            msg: templateMsg,
            data: _template,
        } = template;

        if (!isDataFileExist || !isTemplateFileExist) {
            dataMsg && console.log(dataMsg);
            templateMsg && console.log(templateMsg);
            return;
        }

        let output = '';

        for (let d of _data) {
            let tmp = _template;

            for (let k in d) {
                const reg = new RegExp(`\\{\\{ *${k.trim()} *\\}\\}`, 'g');
                tmp = tmp.replace(reg, d[k]);
            }
            output += tmp + '\n';
        }
        writeOutFile(outFile, output);
    }).catch(msg => {
        console.error(msg);
        process.exit(0);
    })
}

/**
 * Generate output code file
 * @param {string} file - File or path
 * @param {string} data - Output data
 */
function writeOutFile(file, data) {
    fs.writeFile(file, data, err => {
        if (err) {
            console.error(msgObj.writeFailed[LANG], err);
            process.exit(0);
        } else {
            console.log(
                `${msgObj.success[LANG]}\n  ${msgObj.outFile[LANG]}`,
                path.resolve(file)
            );
        }
    });
}

/**
 *  Show help information
 */
function showHelp() {
    console.log(msgObj.help[LANG]);
    process.exit(0);
}

/** 
 * Show version information
 */
function showVersion() {
    const { version } = packageData;
    console.log(`${msgObj.version[LANG]}\n\n${version}`);
}

function main() {
    setLanguage();
    parseArgs();
    initArgFlags();
    setArgFlags();
    executeArgs();
}

main();