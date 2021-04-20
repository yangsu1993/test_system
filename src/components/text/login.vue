

<template>
	<div id="login" class="my_l">
		<header class="top_bar">
		    <a onclick="window.history.go(-1)" class="icon_back"></a>
		    <h3 class="cartname">管理システム</h3>

		</header>
		<main class="user_login_box">
		    <div class="login_dialog">
						

				<div class="txt">
					<p >ユーザーid:	</p>
					<p >暗証番号:</p>
				</div>
				
		        <div class="_username">
					
		            <input type="text" name="username" placeholder="ユーザー名を入力してください" class="user_input" v-model="username"/>
		        </div>
		        <div class="_username u_passwd">
					
		            <input type="password" name="password" placeholder="暗証番号を入力してください" class="password_input" v-model="password"/>
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
						switch(res.data){
							case 0: 
								alert("ログインされた");
								this.$router.push("/home")
								break;
							case -1:
								alert("無効なユーザー名");
								break;
							case 1:
								alert("無効なパスワード");
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
					
				gotoPage(index) {
					this.currentIndex = index;
				}


		},
		
	}
</script>

<style>
#login {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; */

   text-align: center; 
   ;
   
  /* margin-top: 160px; */
}
</style>

<style scoped>

.cartname{
	color:black;
	font-size: 400%;
	text-shadow:5px 5px 5px gray;
	/* opacity: 0.5; */
	font-family:'Times New Roman', Times, serif;

	position: absolute;
	top: 0%;
	left: 50%;
	transform: translate(-50%,-50%);
	
}


.login_dialog{
	
	background: white  url(https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2514693331,339082709&fm=26&gp=0.jpg) no-repeat;
	background-size: 100% 120%;
	 /* box-shadow:10px 10px 10px gray; */
	width: 35%;
	height: 30%;
	position: absolute;
	top: 70%;
	left: 50%;
	transform: translate(-50%,-50%);

}
.user_input{
	
	width: 60%;
	height: 15%;
	position: absolute;
	right: 10%;
	top: 15%;
	
}

.password_input{
	
	width: 60%;
	height: 15%;
	position: absolute;
	right: 10%;
	top: 40%;
}

.btn_login{
	outline:white;
	width: 25%;
	height: 20%;
	position: absolute;
	top: 75%;
	left: 50%;
	transform: translate(-50%,-50%);
	/* box-shadow:3px 3px 3px gray; */
	
	font-size:15px;
	font-family: Georgia, 'Times New Roman', Times, serif;
	
}

.go_new_box{
	width: 30%;
	position: absolute;
	right: 5%;
	top: 65%;
}

.txt{
	width: 35%;
	position: absolute;
	top: 8%;
	left: -1%;
	color:yellow;
	font-size: 110%;
	text-shadow:2px 2px 2px red

}


			

</style>