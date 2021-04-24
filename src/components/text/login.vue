

<template>
	<div id="login" class="my_l">
		<header class="top_bar">
		    <a onclick="window.history.go(-1)" class="icon_back"></a>
		    <h3 class="cartname">管理システム</h3>
				<body class="photo1" ></body>
		</header>
		<main class="user_login_box">
			
		    <div class="login_dialog">
				
		        <div class="_username">
					ユーザーid:
		            <input type="text" name="username" placeholder="ユーザー名を入力してください" v-on:input="check_word($event)" class="user_input" v-model="username" maxlength="6"/>
		        		<p id="username" class="username_t"></p>
				</div>
		        <div class=" _passwd">
					暗証番号:
		            <input type="password" name="password" placeholder="暗証番号を入力してください"  v-on:input="check_word($event)" class="password_input" v-model="password" maxlength="6"/>
		       			<p id="password" class="password_t"></p>
			    </div>

		        <div class="login_box">
                    <button @click="goLogin()" class="btn_login">ログイン</button>		           
		        </div>
		     <div class="go_reg_box">
		            <router-link  to="/register" class="go_new_box">新規</router-link>
		        </div>

		    </div>
		</main>
	</div>
</template>

<script>

import { mapMutations } from 'vuex';

	export default{
        name:'login',
		data(){
			return{
				  
				username:'',
				password:'',
				//loginData:{},
				userInfo:{}
			}
		},
		methods:{
			...mapMutations(['changeLogin']),
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
								alert("ログインされた");
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
						console.log(err);
					})
				} else{
					alert("空いている項目がある");
				}
			},
			check_word(n){
			//提示栏内容
			var y = n.currentTarget.name;
			//输入栏内容
			var x =  n.currentTarget.value;
			
			 if(x==""){ document.getElementById(y).innerHTML = "*空欄不可"}else{

				if(y=="username"){
						 	 //console.log((/[\u2E80-\uFE4F]+/).test(x));
					 if((/[\u2E80-\uFE4F]+/).test(x)||(/[\uff61-\uff9f]+/).test(x)||(/[\u0000-\u002F\u003A-\u00ff]+/).test(x)||(/[\u00A4-\uFFE5]+/).test(x)){
						 document.getElementById(y).innerHTML = "数字のみ"
						  //console.log(y);
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
</script>

<style>

</style>

<style scoped>

.cartname{
	color:black;
	font-size: 70px;
	text-shadow:5px 5px 5px gray;
	width: 500px;
	height: 100px;
	/* opacity: 0.5; */
	font-family:'Times New Roman', Times, serif;
	position:relative;
	left: 650px;
	/* transform: translate(-50%,-50%); */
/* background: green; */

	
}
.photo1{
	background:  url("tian.jpg") no-repeat;
/* background: green; */
	background-size:contain;
	width: 1000px;
	height: 200px;
	position:relative;
	top: 0px;
	left: 600px;
}


.login_dialog{
	
	background:  url(https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2514693331,339082709&fm=26&gp=0.jpg) no-repeat;
	background-size:  100%;
	 /* box-shadow:10px 10px 10px gray; */
	width: 700px;
	height: 700px;
	position:relative;
	top: 50px;
	left: 500px;
	

}

._username{

	width: 600px;
	height: 100px;
	position:relative;

	top: 50px;
	left: 50px;
	font-size: 30px;
	font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
	
}

._passwd{

	width: 600px;
	height: 100px;
	position:relative;

	top: 80px;
	left: 50px;
	font-size: 30px;
	font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}


.user_input{

	width: 350px;
	height: 50px;
	font-size:25px;

	position:relative;
	left: 60px;
}
.password_input{

	width: 350px;
	height: 50px;
	font-size:25px;

	position:relative;
	left: 80px;
}

.btn_login{
	
	width: 200px;
	height: 60px;
	position:relative;
	top: 100px;
	left: 220px;
	font-size:20px;
	font-family: Georgia, 'Times New Roman', Times, serif;
	
}


.go_new_box{
	width: 100px;
	position:relative;
	left: 500px;
	top: 55px;
		font-size:20px;
}



.username_t,.password_t{
	color: red;
	width: 500px;
	height: 60px;
	position:relative;
	left: 220px;
	font-size:20px;

}


			

</style>