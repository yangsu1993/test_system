<template>
	<div class="m_r">
		<header class="top_bar">
		    <a onclick="window.history.go(-1)" class="icon_back"></a>
		    <h3 class="cartname">新規登録</h3>
		</header>
		<main class="user_login_box">
		    <div class="login_dialog">
                 <div class="_userid">
					 ユーザーID：
		            <input type="text" name="username" placeholder="ユーザーID" v-on:input="check_word($event)" class="id_input" v-model="username">
		        		<p id="username" class="username_t"></p>
				</div>
				<div style="margin-top:6%;"></div>
                <div class="_username u_passwd">
					暗証番号：
		            <input type="password" name="password" placeholder="暗証番号"  v-on:input="check_word($event)" class="password_input" v-model="password">
		       			<p id="password" class="password_t"></p>
			    </div>
				<div style="margin-top:6%;"></div>
		        <div class="_username u_passwd">
					再度入力：
		            <input type="password" name="passwd_ag" placeholder="暗証番号もう一度入力してください"  v-on:input="same_check()" class="password_again" v-model="password_ag">
		       			<p id="password_ag" class="pswag_t"></p>
			    </div>
		        <div style="margin-top:6%;"></div>
		        <div class="login_box">
		            <button @click="new_user_check()" class="btn_login">提出</button>
		        </div>
		    </div>
		</main>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				username:'',
				password:'',
				password_ag:'',
				regInfo:{}
			}
		},
		methods:{
			new_user_check(){
				const self = this;
				if(self.username != "" && self.password != "" && self.password_ag != ""){
					if(self.password !=self.password_ag){
						alert("暗証番号一致してない");
					
					}else{
					self.$axios({
						method:'post',
						url: '/api/user/add',
						data: {
							username: self.username,
							password: self.password
						}
					})
					.then( res => {
						switch(res.data){
							case 0:
								alert("新規された");
								this.$router.push("/")
								break;
							case -1:
								alert("ユーザー名もう存在している");
								break;
						}
					})
					.catch( err => {
						console.log(err);
					})
					}
				} else {
					if(self.username==""){
							document.getElementById("username").innerHTML = "*空欄不可"
					}
					if(self.password==""){
						document.getElementById("password").innerHTML = "*空欄不可"
					}
					if(self.password_ag==""){
						document.getElementById("password_ag").innerHTML = "*空欄不可"
					}
					
				}
			},
				check_word(n){
			//提示栏内容
			var y = n.currentTarget.name;
			//输入栏内容
			var x =  n.currentTarget.value;
			// console.log(y);
			// console.log(x);
			 if(x==""){ document.getElementById(y).innerHTML = "*空欄不可"}else{
				
					 	 //console.log((/[\u2E80-\uFE4F]+/).test(x));
					 if((/[\u2E80-\uFE4F]+/).test(x)||(/[\u4e00-\u9fb5]+/).test(x)){
						 document.getElementById(y).innerHTML = "*全角不可"
						  //console.log(y);
					 }else{
						
						 document.getElementById(y).innerHTML = ""


					 } 
				 
				 }
			 },

			 same_check(){
						  if(this.password_ag==""){
										document.getElementById("password_ag").innerHTML = "*空欄不可"
						  }else{
							  if(this.password==""){
								  	 	document.getElementById("password_ag").innerHTML = "*先にパスワードを入力してください"
									    document.getElementById("password").innerHTML = "*空欄不可"
							  }else{	
								   if(this.password!=this.password_ag){
						  document.getElementById("password_ag").innerHTML = "暗証番号を一致してください"
					 }else{
						  document.getElementById("password_ag").innerHTML = ""
					 }


							  }
							

						  }		
						  	 
			 }

		}
		
	}
</script>

<style scoped>

	.login_dialog{
		font-family: Georgia, 'Times New Roman', Times, serif;
		
		font-size: 110%;
		width: 50%;
		height: 50%;
		color: rgb(0, 0, 0);
		font-weight:900;

		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		background: white  url(https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4007190055,333743685&fm=26&gp=0.jpg) no-repeat;
		background-size: 100% 120%;
		background-position-y: 80%;
		
	}

.id_input,.password_input,.password_again{
	width: 70%;
	height: 7%;
	font-size: 90%;
	position: absolute;
	right: 4%;
	
}


.username_t,.password_t{
	font-size: 80%;
	color: red;
	width: 60%;
	height: 10%;
	position: absolute;
	left: 25%;
	top: 5%;
}

.password_t{
	font-size: 80%;
	color: red;
	width: 60%;
	height: 10%;
	position: absolute;
	left: 25%;
	top: 25%;
}

.pswag_t{
	font-size: 80%;
	color: red;
	width: 60%;
	height: 10%;
	position: absolute;
	left: 25%;
	top: 45%;
}



</style>