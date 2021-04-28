import { mapMutations } from 'vuex';

export default{
        name:'login',
		data(){
		return{
			username:'',
			password:'',
			userInfo:{}
			}
		},
		methods:{
			...mapMutations(['changeLogin']),

			goNew(){
				 this.$router.push('/register');
			},

			//登录判定
			goLogin(){
				const self = this;
				if (self.username != "" && self.password != "") {
					self.$axios({
						method:'post',
						url: 'api/user/login',
						data: {
							username: self.username,
							password: self.password,
						}
					})
					.then( res => {
						switch(res.data.status){
							case 0: 
								 this.$message({
									type: 'success',
									message: 'ログイン成功'
									}); 
									localStorage.setItem('Authorization', res.data.token);
									console.log(res);
									this.$router.push("/home")
								break;
							case -1:
								document.getElementById("username").innerHTML = "*無効なユーザー名"
								//alert("無効なユーザー名");
								break;
							case 1:	
								document.getElementById("password").innerHTML = "*パスワードが間違った"
								//alert("パスワードが間違った");
								break;
						}
					})
					.catch( err => {
						 this.$message({
										type: 'error',
										message: 'エラーが発生しました。システム管理者にご連絡ください'
									}); 
						console.log(err);
					})
				} else{
					 this.$message({
										type: 'warning',
										message: '空いている項目がある'
									}); 
					}
			},
				check_word(n){
					//提示栏内容
					var y = n.currentTarget.name;
					//输入栏内容
					var x =  n.currentTarget.value;
			
			 		if(x==""){ document.getElementById(y).innerHTML = "*空欄不可"}else{
					if(y=="username"){
	
					if((/[\u2E80-\uFE4F]+/).test(x)||(/[\uff61-\uff9f]+/).test(x)||(/[\u0000-\u002F\u003A-\u00ff]+/).test(x)||(/[\u00A4-\uFFE5]+/).test(x)){
						 document.getElementById(y).innerHTML = "*数字のみ"
					}else{
						 document.getElementById(y).innerHTML = ""
					 } 
					}else{
						 document.getElementById(y).innerHTML = ""
						}
					}
				 },
				gotoPage(index) {
					this.currentIndex = index;
				}
		},	
	}