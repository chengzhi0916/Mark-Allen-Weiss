### 运用axios（Promise方式）读取数据

**axios**

```
var axios = require('axios');

var readData = function(response) {
  return response.data;
};

function readTopics() {
  return axios
    .get(
      'https://cnodejs.org/api/v1/topics?page=1&tag=good&limit=1&mdrender=false'
    )
    .then(readData)
    .then(result => result.data[0].author.loginname);
}

function readUserInfo(name) {
  return axios.get('https://cnodejs.org/api/v1/user/' + name)
    .then(readData)
    .then(result => result.data)
}

readTopics()
  .then(readUserInfo)
  .then(console.log)
  .catch(console.log);
 
```

**路由没有更改之前**

```
/* GET posts lists */
router.get('/posts', function(req, res, next) {
  PostModel.find({}, {}, function(err, posts) {
    if (err) {
      next(err);
    } else {
      res.json({ postsList: posts });
    }
  });
});
```

**路由更改在之后如下**

```
/* GET posts lists */
router.get('/posts', function(req, res, next) {
  PostModel.find({}, {})
  .exec()
  .then(posts =>{
    res.json({ postsList: posts });
  })
  .catch(next)
});

```

见证了promise的强大