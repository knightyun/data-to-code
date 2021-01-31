# data-to-code

根据指定的源数据和模板代码，生成具有重复性的业务代码


## Install

```shell
npm install -g data-to-code
```

## Usage

```shell
d2c
```

执行后会默认识别命令执行目录下的 `data.txt` 作为数据源文件，`template.txt` 作为模板代码文件，最终在此目录下生成 `code.txt` 文件，即业务代码；

等同于：
```shell
d2c -d data.txt -t template.txt -o code.txt
```
