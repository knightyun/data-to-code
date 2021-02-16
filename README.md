<div align="center">
    <div align="right">
        简体中文 | <a href="README-EN.md">English</a>
    </div>

![aaa](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABkCAMAAAD0WI85AAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+nhxg7wAAAARnQU1BAACxjwv8YQUAAAABc1JHQgCuzhzpAAAAgVBMVEUAAAAAvNQAvNQAvNQAvNQAvNQAvNQAvNQAvNQAvNQAvNQAvNQAvNQAvNQAvNQAvNQAvNQAvNQAvNQAvNQAvNQAvNQAvNQAvNQAvNQAvNQAvNQAvNQAvNQAvNQAvNQAvNQAvNQAvNQAvNQAvNQAvNQAvNQAvNQAvNQAvNQAvNQAvNS8eC6oAAAAKnRSTlMAHsMRu6V47iJmRFozzAgCGmCcC49OIBAk+UK2IfSENDAM55oNoF9pkW6n47fKAAABGElEQVR42u3ZuRKCMBRGYUQR3MB933d5/we081LEuUkQh+J8pQO/Hm0yEgQAAAAAAACwdOw4ME/MHBbW6gdSJ5bm+9q5A/NE6LAQqSHqRI8QQgghhBBCCLEJObc0XZHKxLRl7ykLB1lIC8PqxEuunZtDnL6tht/RricLobzaUH/1gkiubRNCCCGEEEIIIVWGbPuKx+Bj7Bmyl4lRZSGR36HRKSRQD42EEEIIIYQQQkiJkGvz4xYrLuVDJvJ26W9DQvU/J01NDo2EEEIIIYQQQkgdQ1baQSmWU04zM4bsYnsbWcgKw+p9d/Ws9Y9niLnxD7ovv3qdH4YSQgghhBBCSD1DFokD88Qw8TI0r6n3nQIAAAAAAIC/egOHXeNG+Fsi0QAAAABJRU5ErkJggg==)
![npm license](https://img.shields.io/npm/l/data-to-code)
![npm version](https://img.shields.io/npm/v/data-to-code)
![npm downloads](https://img.shields.io/npm/dt/data-to-code)
![npm bundle size](https://img.shields.io/bundlephobia/min/data-to-code)

![GitHub stars](https://img.shields.io/github/stars/knightyun/data-to-code?style=flat)
![GitHub forks](https://img.shields.io/github/forks/knightyun/data-to-code?style=flat)
[![Github issues](https://img.shields.io/badge/issues-welcome-success)](https://github.com/knightyun/data-to-code/issues)
</div>

# data-to-code


一款代码生成器，可根据指定的源数据和模板代码，合成具有重复性的业务代码


## 背景

以前端开发为例（包括但不限于），有时会在功能设计文档或需求文档中，遇到一些数据量偏大的业务需求，动辄几十个字段需要写进前端代码逻辑或配置中，比如下面一个示例的功能文档：

字段名     | 描述        | 是否必输 | ...
----------|-------------|---------|-----
id        | ID          | true    | ...
firstName | Fist Name   | true    | ...
lastName  | Last Name   | true    | ...
age       | Age         | false   | ...
hobby     | Hobby       | false   | ...
...       | ...         | ...     | ...

而在前端工程中，某配置文件中需要逐个录入上述信息，编写类似下面的配置代码：
```js
{
    name: 'id',
    label: 'ID',
    required: true,
    // ...
},
{
    name: 'firstName',
    label: 'Fist Name',
    required: true,
    // ...
},
{
    name: 'age',
    label: 'Age',
    required: false,
    // ...
},
// ...
```

假设该表格有超过 20 行，甚至更多列的数据，额，简直噩梦 😱；当然，有小伙伴会选择使用正则表达式，或者一些编辑器自带的批量处理功能，似乎也不是一件轻松事儿；

于是乎，有了这个 ~~轮子~~ 工具 🐱‍🏍;

## 安装

全局安装命令行工具：
```shell
npm install -g data-to-code
```

或者：
```shell
yarn global add data-to-code
```

## 使用

获取帮助信息：
```shell
d2c --help
```

直接在当前目录下生成 `code.txt` 代码文件，但是需要当前目录中存在 `data.csv` 和 `template.txt` 文件，这两个文件的具体配置方法请参考 [配置](#配置)，如果这两个文件不存在，则该命令会在当前目录下自动生成这两个文件：
```shell
d2c -g
```
然后可以对这两个文件填充内容后，再次运行上述命令生成代码文件：

也可以选择使用其他名称，取代默认的输入或输出文件名：
```shell
d2c -g -d data.txt -t template.txt -o myCode.txt
```

## 配置

### 数据文件

##### CSV

数据文件用于提供数据源，工具识别后会结合 [模板代码文件](#模板代码文件) 生成相应的合成代码，目前可以识别 `.csv` 和 `.txt` 文件，如不指定会默认识别当前目录下的 `data.csv` 文件，可以使用 **Excel** 等工具编辑或生成该文件，以下是该项目的示例数据文件 [data.csv](https://github.com/knightyun/data-to-code/blob/main/test/data.csv) 中的内容：
```
name,label,required
id,ID,true
firstName,Fist Name,true
lastName,Last Name,true
age,Age,false
hobby,Hobby,false
```

Excel 预览：

name      | label       | required
----------|-------------|---------
id        | ID          | true
firstName | Fist Name   | true
lastName  | Last Name   | true
age       | Age         | false
hobby     | Hobby       | false

如果产品提供的功能文档中的数据表格直接就是**表格**的格式（Word, Excel），那么就可以直接批量复制粘贴到用 Excel 打开的 `csv` 文件中，然后对格式稍作处理；

##### TXT

工具同时也支持 `.txt` 格式的文档，不过字段之间需要使用一个或多个的 **空格**（`" "`） 或 **制表符**（`\t`）进行分割，如果某项数据中也包含有空格，则需要使用双引号（`""`）进行包裹；例如本项目中示例数据文件 [data.txt](https://github.com/knightyun/data-to-code/blob/main/test/data.txt) 中的内容：
```
name        label           required
id          ID              true
firstName   "Fist Name"     true
lastName    "Last Name"     true
age         Age             false
hobby       Hobby           false
```

数据中的 **表头**（第一行）代表不同的 **字段** 名，供下面会提到的模板代码使用，剩下的内容则是不同字段所对应的一系列行数据；

### 模板代码文件

模板代码指一套指定格式的代码模板，提供 “**插槽**” 让工具批量插入数据并合成总代码；模板代码文件是普通的 `.txt` 文本文件，直接编写正常的代码逻辑，只是需要使用双花括号 **`{{ }}`** 引入数据文件中的 **字段**，字段两侧有无空格无所谓，如果代码本身存在双花括号，则需要进行转义（`\{\{ \}\}`）；例如本项目中的示例模板代码文件 [template.txt](https://github.com/knightyun/data-to-code/blob/main/test/template.txt) 中的内容：
```
{
    name: '{{ name }}',
    label: '{{ label }}',
    required: {{ required }},
},

```

其中的 `name`, `label`, `required` 三个字段则分别对应前面的数据文件中的三个表头列，顺序无需固定；

## 示例

利用之前提到的数据文件和模板代码文件，可以生成合成后的输出代码示例；具体步骤为 `clone` 本项目到本地后，运行测试脚本 `npm run test`，运行成功后，会提示在项目的 `test/` 目录下生成了合成代码文件 `code.txt`，内容如下：
```js
{
    name: 'id',
    label: 'ID',
    required: true,
},
{
    name: 'firstName',
    label: 'Fist Name',
    required: true,
},
{
    name: 'lastName',
    label: 'Last Name',
    required: true,
},
{
    name: 'age',
    label: 'Age',
    required: false,
},
{
    name: 'hobby',
    label: 'Hobby',
    required: false,
},

```

然后直接复制代码粘贴到所需项目中即可；