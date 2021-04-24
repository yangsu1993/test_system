var models = require('../db');//数据库链接信息
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlfun');//sql语句
const jwt= require('jsonwebtoken');

// 连接数据库
var conn = mysql.createConnection(models.mysql);
//database open建立连接
conn.connect();





// 登录接口
router.post('/login',(req,res)=>{
	const user = req.body;
	const sel_username = $sql.user.select + " where userName = '" + user.username + "'";
	console.log(sel_username);
	conn.query(sel_username, user.username, (error, results)=>{
		if (error) {
			throw error;
		}
		console.log(results)
		if (results[0] === undefined) {
			res.send({'status':-1});  // -1 表示查询不到，用户不存在，即邮箱填写错误
		} else{
			if (results[0].userName == user.username && results[0].userPass == user.password) {

				let content ={name:user.username}; // 要生成token的主题信息
				let secretOrPrivateKey="suiyi" // 这是加密的key（密钥） 
				let token = jwt.sign(content, secretOrPrivateKey, {
						expiresIn: 60*60*1  // 1小时过期
					});
					res.send({'status':0,'token':token})


			//	res.send("0");  // 0 表示用户存在并且邮箱密码正确
			
			} else{
				res.send({'status':1});  // 1 表示用户存在，但密码不正确
			}
		}
	})
});

    // 注册接口
router.post('/add', (req, res) => {
	const params = req.body;
	const sel_sql = $sql.user.select + " where userName = '" + params.username + "'";
	const add_sql = $sql.user.add;
	console.log(sel_sql);

	conn.query(sel_sql, params.username, (error, results) => {
		if(error) {
			console.log(error);
		}
		if (results.length != 0 && params.username == results[0].userName) {
			res.send("-1");   // -1 表示用户名已经存在
		} else {
			conn.query(add_sql, [params.username,params.password], (err, rst) => {
				if (err) {
					console.log(err);
				} else{
					console.log(rst);
					res.send("0"); // 0 表示用户创建成功
				}
			});
		}
	});
});


    // 添加会员信息接口
    router.post('/push', (req, res) => {
        const params = req.body;
        const sel_sql = $sql.pushin.select + " where id = '" + params.id + "'";
        const add_sql = $sql.pushin.add;
        console.log(sel_sql);
    
        conn.query(sel_sql, params.id, (error, results) => {
            if(error) {
                console.log(error);
            }
            if (results.length != 0 && params.id == results[0].id) {
                res.send("-1");   // -1 表示用户id已经存在
            } else {
                conn.query(add_sql, [params.id,params.names,params.name_furigana,params.join_date,params.get_cre,params.cre_date,params.bonus_date], (err, rst) => {
                    if (err) {
                        console.log(err);
                    } else{
                        console.log(rst);
                        res.send("0"); // 0 表示用户创建成功
                    }
                });
            }
        });
    });



	// 查找会员信息接口
    router.post('/check', (req, res) => {
        const params = req.body;
        const sel_sql = $sql.pushin.select + " where "+params.tag +"= '" + params.key + "'";
       // const add_sql = $sql.pushin.add;
      //  console.log(sel_sql);
    
        conn.query(sel_sql, [params.key], (error, results) => {
            if(error) {
                console.log(error);
            }
            if (results.length != 0 ) {
			//	console.log(results);					
					//送所有数据
				res.send(results);
			} else {
				res.send("-1");
			}
        });
    });

	// 全员信息接口
    router.post('/allcheck', (req, res) => {
        const params = req.body;
		const　sel_sql  = $sql.pushin.select + " where 1 "
    
        conn.query(sel_sql, [params.key], (error, results) => {
            if(error) {
                console.log(error);
            }				
					//送所有数据
				res.send(results);
			
        });
    });

		//削除信息接口
		router.post('/delete_data', (req, res) => {
			const params = req.body;
			const　sel_sql  = $sql.pushin.delete+ " where id= '"+ params.id + "'";
		
			conn.query(sel_sql, [params.id], (error) => {
				if(error) {
					console.log(error);
				}
				 else {
						res.send("-1");
					}			
					
				
			});
	
		});


		
		//更新信息接口
    router.post('/update', (req, res) => {
        const params = req.body;
        const sel_sql = $sql.pushin.update  + " names='"+ params.names + "', furigana='"+ params.furigana +"', get_cre='"+ params.get_cre + "', cre_date='"+ params.cre_date + "', bonus_date='"+ params.bonus_date+"' WHERE id='" + params.id+"'" ;
        console.log(sel_sql);
    
        conn.query(sel_sql, params.id, (error,results) => {
            if(error) {
                console.log(error);
            } 
				console.log(results);
                res.send("0"); // 0 表示用户创建成功
                          
        });
    });






module.exports = router;
