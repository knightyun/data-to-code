<div align="center">
    <div align="right">
        <a href="README.md">简体中文</a> | English
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

A code generator, which synthesizes repeatable business code from specified source data and template code.


## Background

As an example of the front-end development (including but not limited to), sometimes in the functional design document or requirement document, some business requirements with large amount of data will be encountered, often dozens of fields need to be written into the front-end code logic or configuration, such as the requirement document of the following example:

Field Name| Description | Required| ...
----------|-------------|---------|-----
id        | ID          | true    | ...
firstName | Fist Name   | true    | ...
lastName  | Last Name   | true    | ...
age       | Age         | false   | ...
hobby     | Hobby       | false   | ...
...       | ...         | ...     | ...

In the front-end project, the information above needs to be typed one by one into a configuration file, and the configuration code is similar to the following:
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

Suppose the table has more than 20 rows, or even more columns, ugh, it's a nightmare 😱; Of course, some people choose to use regular expressions, or some editors have built-in batch processing capabilities, which may not be easy.

As a result, this ~~wheel~~ tool was created 🐱‍🏍.

## Installation

Install this command line tool in global environment:
```shell
npm install -g data-to-code
```

Or:
```shell
yarn global add data-to-code
```

## Usage

Get help information:
```shell
d2c --help
```

Directly generate code file "code.txt" in current directory, current directory should have "data.csv" and "template.txt" (please refer to [configuration](#configuration) for the specific configuration of these two files.), if not, this command will generate these two null file in current directory automatically:
```shell
d2c -g
```
Then fill them and run the command above again.

Define another input file name or output file name:
```shell
d2c -g -d data.txt -t template.txt -o myCode.txt
```

## Configuration

### Data file

##### CSV

The "data file" is used to provide the data source, and the tool will combine [template code file](#Template-code-file) to generate the corresponding composite code after recognition. At present, `.csv` and `.txt` files can be recognized. If not specified, the `data.csv` file in the current directory will be recognized by default, you can use tools such as **Excel** to edit or generate this file. The following content is from the project's sample data file [data.csv](https://github.com/knightyun/data-to-code/blob/main/test/data.csv):
```
name,label,required
id,ID,true
firstName,Fist Name,true
lastName,Last Name,true
age,Age,false
hobby,Hobby,false
```

Preview in Excel:

name      | label       | required
----------|-------------|---------
id        | ID          | true
firstName | Fist Name   | true
lastName  | Last Name   | true
age       | Age         | false
hobby     | Hobby       | false

If the data table in the requirement document provided by the product is directly the format of **Table** (Word, Excel), then you can directly copy and paste them to the `csv` file opened by Excel, and then handle the format slightly;

##### TXT

The tool also supports `.txt` plain text, but fields need to be separated by one or more **Spaces** (`" "`) or **tabs** (`\t`). If a data item also contains Spaces, it needs to be enclosed by double quotation marks (`""`); Such as the content of the sample data file [data.txt](https://github.com/knightyun/data-to-code/blob/main/test/data.txt) in this project:
```
name        label           required
id          ID              true
firstName   "Fist Name"     true
lastName    "Last Name"     true
age         Age             false
hobby       Hobby           false
```

The **table header** (first line) in the data file represents the names of the different **fields**, which are used by the "template code file" described below. The rest of the data is a series of rows for the different fields.

### Template code file

"Template code file" refers to a set of code templates in a specified format that provide "**slots**" for tools to bulk insert data and combine it into total code; The template code file is a normal `.txt` text file, directly write the normal code logic, just need to use double curly braces **`{{ }}`** to introduce the **field** in the data file, it dose not matter if there is space on both sides of the field, if the code itself has double curly braces, we need to escape it (`\{\{ \}\}`); Such as sample content in the project template code file [template.txt](https://github.com/knightyun/data-to-code/blob/main/test/template.txt):
```
{
    name: '{{ name }}',
    label: '{{ label }}',
    required: {{ required }},
},

```

The three fields `name`, `label` and `required` correspond to the three table header columns in the previous data file, and the order need not be fixed.

## Examples

Using the data file and template code file mentioned earlier, you can generate a sample of the synthesized output code; Once `clone` this project to local, run the test script `npm run test`, if success, it will prompt you to generate a synthetic code file `code.txt` is under the project's `test/` directory, with the following content:
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

Finally, directly copy and paste the code above into the your desired project.