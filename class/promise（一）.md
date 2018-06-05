#### 用Promise对象编写一个读取文件

```
ceshi.js

var fs = require('fs')


function readFilepromise() {                               //定义一个容器
    return new Promise(function (resolve, reject) {        //定义一个Promise对象
        fs.readFile('./package.json', 'utf-8',             //fs.readFile读取文件三个参数
        function (err, content) {                          
                if (err) {
                    reject(err)
                    return;
                }
                resolve(content);
            });

    });
}

module.exports = { readFilepromise }             //提供接口
```



```
app.js

var fs = require('./ceshi')         //引入写好的读取文件

fs.readFilepromise()                //之前提供的readFilepromise接口
   .then(function(result){          //打印读取的文件
     console.log(result);
   })
   .catch(function(err){            //打印报错的信息
     console.log(err)
   })
```



#### Promise对象实例

**<u>class</u>**   ES6 提供了更接近传统语言的写法，引入了 Class（类）这个概念，作为对象的模板。通过`class`关键字，可以定义类。

 

```
   class Container {                    //定义一个Container类
    constructor(val) {                  //val参数
      this.val = val;
    }
  
    this(f) {
      return new Container(f(this.val));
    }
  }
  
var obj = new Container('js');       //赋值Container字符串js

obj
  .this(function (val) {             //现在的val是js
    return 'hello' + val;            //结果是'hellojs'返回到val参数
  })
  .this(function (val) {            //在这里的val参数里面是'hellojs'
    return val + ' first'           //以下依次这样运算
  })
  .this(function (val) {
    return val + ' Promise'
  })
  .this(function (val) {
    console.log(val)              //打印val参数结果是 'hellojs first Promise'
  })

```