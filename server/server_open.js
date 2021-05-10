// node 后端服务器

const userApi = require('./api/Userapi');
 const fs = require('fs');
 const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({extended: false}));

// 后端api路由
app.use('/api/user', userApi);

// 服务开启后访问指定编译好的dist文件下的数据
app.use(express.static(path.resolve(__dirname, '../dist')))

// app.get('*', function(req, res) {
//     const html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8')
//     res.send(html)
// });


app.get('/api/getArticle', (req, res, next) => {

            const html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8')
            res.send(html)
    res.json({
       
      data: '后台返回结果 getArticle'
    })
  })
  

// 监听端口
app.listen(3000);
console.log('success listen at port:3000......');
