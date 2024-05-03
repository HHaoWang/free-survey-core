# Free Survey Core

Free Survey Core是一个免费、开源的调查问卷库，它提供一个实现问卷功能的抽象类库和一个默认的实现，通过它你可以创建自己的问卷设计工具或是问卷功能实现而无需自己再进行问卷概念的抽象。

![npm](https://img.shields.io/npm/dt/free-survey-core?label=NPM&link=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Ffree-survey-core)
![NPM](https://img.shields.io/npm/l/free-survey-core)
![GitHub top language](https://img.shields.io/github/languages/top/HHaoWang/free-survey-core) ![npm](https://img.shields.io/npm/v/free-survey-core?label=Version)

## 安装

```shell
npm install free-survey-core
```

## 用法

```typescript
import { Survey } from "free-survey-core";
import { AbstractPage } from "free-survey-core";
import { Page } from "free-survey-core";
import { QuestionGroup } from "free-survey-core";
import { SingleTextQuestion } from "free-survey-core";

const survey = new Survey();
const page = new Page();
survey.pages.push(page);
const pages: Array<AbstractPage> = survey.pages;
const questionGroup = new QuestionGroup();
const singleTextQuestion = new SingleTextQuestion((options = { title: "a single text question" }));
questionGroup.questions.push(singleTextQuestion);
page.elements.push(questionGroup);

const answer = survey.getAnswer();
const answerFlattened = survey.getAnswerFlattened();
```

## 设计思路

free-survey-core 将问卷设计为可包含多个页面、页面又可包含不同元素的形式。即每个问卷（Survey）包含多个页面（Page），每个页面包含多个题组（QuestionGroup）或问题（AbstractQuestion），每个题组也可包含多个问题。

问卷中的问题通常有许多类型，如单项选择、下拉选择、多项选择、文本问答、时间选择等类型，free-survey-core 将各种问题抽象为 AbstractQuestion 存放在页面或是题组中，具体的实现则是各种具体的问题类（如SingleTextQuestion）。

free-survey-core 支持的所有问题类型均注册在 QuestionType 中，你可以使用以下命令导入：

```typescript
import QuestionType from "free-survey-core";
```

free-survey-core 中的主要类均被抽象为 AbstractElement ，元素类型包括有问卷（survey）、页面（page）、题组（questionGroup）、问题（question），其中题组和问题又被归类为页面元素（AbstractPageElement），你可以通过以下代码获取元素类型和页面元素类型：

```typescript
import { ElementType, PageElementType } from "free-survey-core";
```

free-survey-core 主要的责任在于对调查问卷的抽象和数据的存储而非功能实现，因而其包含的功能较为有限。

## 扩展

若需要对题型进行扩展，继承 `AbstractQuestion` 并实现即可。此外，若要支持导入导出功能，需要实例化 `QuestionParserFactory`，调用 `registerParser` 方法，提供解析器即可。解析问卷时，会逐一遍历所有元素，根据元素类型和问题类型调用对应的解析器进行解析，此时会把识别到的对应元素传入解析器，解析器需要根据元素对象实例化元素并返回，随后，实例化的元素会被插入到对应的位置。解析器定义如下：

```typescript
export type Parser = (obj: any) => AbstractQuestion;
```

## 支持的问题类型

|          问题类型          | 是否支持 | 是否规划 |
| :------------------------: | :------: | :------: |
|    单项选择(RadioGroup)    |    ✅    |          |
|     多项选择(CheckBox)     |    ✅    |          |
|    文本问答(SingleText)    |    ✅    |          |
|     下拉选择(Dropdown)     |    ✅    |          |
|    时间选择(TimePicker)    |    ✅    |          |
| 时间段选择(TimeSpanPicker) |    ✅    |          |
|      分割线(Splitter)      |    ✅    |          |
|         文件(File)         |    ❌    |    ✅    |

## 反馈建议

请在 free-survey-core 的 [Github仓库](https://github.com/HHaoWang/free-survey-core) 提起issue以便进行反馈和建议。如有使用问题也可提出issue。

## 项目未来规划

free-survey-core 目前仍处于非常早期的版本，主要专注于基础实现，因此对于一些基础功能以外的建设目前暂不考虑，例如国际化、文档补充、测试等。如果你对这些有兴趣，欢迎你参与建设。

## 交流与沟通

如果你有沟通和交流的意愿，欢迎你发送邮件至 <work@hhao.wang>。

## 开源协议

[Apache 2.0](LICENSE) &copy; HHao
