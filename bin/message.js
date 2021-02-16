const EN = 'EN'; // English
const ZH = 'ZH'; // Chinese

const msgObj = {
    help: {
        [EN]: `
d2c - Composite source data and code template into target code file.

USAGE:

    d2c [OPTIONS]

OPTIONS:

    -g, --generate                     Generate code file from data file and template file,
                                         if these two file are not exist in current directory,
                                         this tool will generate them automatically(null fill).
    -d, --data-file <file|path>        Input data source file, type: ".txt/.csv",
                                         default: "./data.csv"
    -t, --template-file <file|path>    Input code template file, type: ".txt",
                                         default: "./template.txt"
    -o, --output-file <file|path>      Output file name, generated in current directory,
                                         default: "./code.txt"
    -h, --help                         Show this help message
    -v, --version                      Show current version

EXAMPLES:

    Directly generate code file "code.txt" in current directory, current directory should
    have "data.csv" and "template.txt", if not, this command will generate these two null
    file in current directory automatically:
        d2c -g

    Then fill them and run the command above again.

    Define another input file name or output file name:
        d2c -g -d data.txt -t template.txt -o myCode.txt

Document:
    About the configuration of "data file" and "code template file", please refer to:
    https://github.com/knightyun/data-to-code#%E9%85%8D%E7%BD%AE
        `,
        [ZH]: `
d2c - 根据数据源文件和模板代码文件，合成目标代码文件

用法：

    d2c [OPTIONS]

OPTIONS:

    -g, --generate                     合成数据文件和代码模板文件，如果当前目录没有这两个文件，
                                         该工具会自动生成（空文件）
    -d, --data-file <file|path>        数据源文件，可包含路径，文件类型为 ".txt" 或 ".csv" ，
                                         如果不指定则默认为当前目录的 "data.csv" 文件
    -t, --template-file <file|path>    模板代码文件，可包含路径，文件类型为 ".txt" ，
                                         如果不指定则默认为当前目录的 "template.txt" 文件
    -o, --output-file <file|path>      输出文件，可包含路径，默认生成在当前目录的 "code.txt" 文件重
    -h, --help                         显示帮助信息
    -v, --version                      显示当前版本信息

示例：

    直接在当前目录下生成 "code.txt" 代码文件，但是需要当前目录中存在 "data.csv" 和 "template.txt" 文件，
    如果这两个文件不存在，则该命令会在当前目录下自动生成这两个文件：
        d2c -g

    然后可以对这两个文件填充内容后，再次运行上述命令生成代码文件

    使用其他名称取代默认的输入或输出文件名：
        d2c -g -d data.txt -t template.txt -o myCode.txt

文档：

    关于 “数据文件” 和 “模板代码文件” 的相关配置，请参考：
    https://github.com/knightyun/data-to-code#%E9%85%8D%E7%BD%AE
        `,
    },
    version: {
        [EN]: 'Current version is:',
        [ZH]: '当前版本为：',
    },
    invalidOption: {
        [EN]: 'ERROR! Invalid option:',
        [ZH]: '错误！无效的参数：',
    },
    writeFailed: {
        [EN]: 'Write file failed:',
        [ZH]: '写文件失败：',
    },
    success: {
        [EN]: 'Success!',
        [ZH]: '成功！',
    },
    genDataFile: {
        [EN]: 'Generated data file is:',
        [ZH]: '生成的数据空文件位于：',
    },
    genTemplateFile: {
        [EN]: 'Generated template code file is:',
        [ZH]: '生成的模板代码空文件位于：',
    },
    fillFile: {
        [EN]: 'please fill this file and then run "d2c -g"',
        [ZH]: '请填写该文件后再运行 "d2c -g" 命令',
    },
    outFile: {
        [EN]: 'Output file is:',
        [ZH]: '生成的代码文件位于：',
    },
    needGen: {
        [EN]: 'Please specify "-g" switch to generate output code file',
        [ZH]: '请设置 "-g" 选项以生成合成的代码文件',
    },
};

module.exports = msgObj;