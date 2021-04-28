

<template>
	<div id="login" class="background">
		<header class="top_bar">
		    <a onclick="window.history.go(-1)" class="icon_back"></a>
			 <h3 class="cartname">ログイン</h3>
		    <div class="companyName">情報システム</div>
				<div class="photo1" ></div>
		</header>
		<main class="login_box">
			
		    <div class="login_dialog">
				<div class="allpossion">
						  <div class="_username">
					ユーザー名:
		            <input type="text" name="username" placeholder="ユーザー名を入力してください" v-on:input="check_word($event)" class="user_input" v-model="username" maxlength="7"/>
		        		<p id="username" class="username_t"></p>
				</div>
		        <div class=" _passwd">
					暗証番号:
		            <input type="password" name="password" placeholder="暗証番号を入力してください"  v-on:input="check_word($event)" class="password_input" v-model="password" maxlength="10"/>
		       			<p id="password" class="password_t"></p>
			    </div>

		        <div class="login_box">
                    <button @click="goLogin()" class="btn_login">ログイン</button>		           
		        </div>
		     <div class="go_reg_box">
		            <!-- <router-link  to="/register" class="go_new_box">新規</router-link> -->
					<button @click="goNew()" class="_new">新規</button>	
		        </div>
				</div>     

		    </div>
		</main>
	</div>
</template>

<script>

//js html css分けて*************************************************************
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
						//alert("エラーが発生しました。システム管理者にご連絡ください");
						console.log(err);
					})
				} else{
					 this.$message({
										type: 'warning',
										message: '空いている項目がある'
									}); 
				//	alert("空いている項目がある");
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
						 document.getElementById(y).innerHTML = "*数字のみ"
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

	.background{
	width:1900px;
	height:950px ;
   
	background: white url("../../assets/yun.png") repeat;
    position: absolute;
	/* opacity: 0.7; */
}

.companyName{
	color:black;
	font-size: 90px;
	/* text-shadow:10px 10px 10px rgb(241, 245, 35); */
	width: 600px;
	height: 100px;
	/* opacity: 0.5; */
	position:relative;
	top: -20px;
	left: 680px;
	/* transform: translate(-50%,-50%); */
/* background: green; */

	
}
.photo1{
	/* background:  url("tian.jpg") no-repeat;

	background-size:100%;
	
	height: 150px;
	position:relative;
	left: 750px; */


	background:  white url("../../assets/tian.jpg") no-repeat;
	background-size:  100%;
	 box-shadow:20px 20px 20px gray; 
	width: 550px;
	height: 190px;
	position:relative;
	top: 5px;
	left: 670px;
	/* opacity: 0.4; */
	
}



.login_dialog{
	background:  white url("../../assets/frame.png") no-repeat;
	background-size:  100%;
	 /* box-shadow:10px 10px 10px gray; */
	width: 800px;
	height: 438px;
	position:relative;
	top: 40px;
	left: 550px;
	
}

.allpossion{
	
	width: 800px;
	height: 438px;

}

._username{

	width: 600px;
	height: 120px;
	position:relative;

	top: 80px;
	left: 100px;
	font-size: 30px;
	font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
	
	
}

._passwd{

	width: 600px;
	height: 120px;
	position:relative;

	top: 90px;
	left: 100px;
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
	
	width: 160px;
	height: 80px;
	background:  white url("../../assets/btn.png") no-repeat;
	background-size:  100%;
	font-size: 30px;
	border:none;
	color: white;
	text-shadow:-5px -5px 5px rgb(139, 6, 6);
	position: absolute;
	/* left: 200px; */
	top: 330px;
	left: 150px;
}

._new{
	width: 160px;
	height: 80px;
	background:  white url("../../assets/btn.png") no-repeat;
	background-size:  100%;
	font-size: 30px;
	border:none;
	color: white;
	text-shadow:-5px -5px 5px rgb(139, 6, 6);
	position: absolute;
	/* left: 200px; */
	top: 330px;
	left: 450px;
}

.btn_login:hover,._new:hover{
		font-size: 35px;
}




.username_t,.password_t{
	color: red;
	width: 500px;
	height: 60px;
	position:relative;
	left: 220px;
	font-size:20px;

}

.cartname{
   background: rgb(182, 1, 1); 
   font-size: 200%;
   font-family:'Times New Roman', Times, serif;
   color: white;
}
			

</style>