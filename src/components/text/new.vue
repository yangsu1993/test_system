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
		            <input type="text" name="username" placeholder="ユーザーID" class="id_input" v-model="username">
		        </div>
				<div style="margin-top:2%;"></div>
                <div class="_username u_passwd">
					暗証番号：
		            <input type="password" name="regpasswd" placeholder="暗証番号" class="password_input" v-model="password">
		        </div>
				<div style="margin-top:2%;"></div>
		        <div class="_username u_passwd">
					再度入力：
		            <input type="password" name="regpasswd_ag" placeholder="暗証番号もう一度入力してください" class="password_again" v-model="password_ag">
		        </div>
		        
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
					alert("空いている項目がある");
				}
			}

		}
	}
</script>

<style scoped>

	.login_dialog{
		font-family: Georgia, 'Times New Roman', Times, serif;
		box-shadow:10px 10px 10px grey;
		font-size: 110%;
		width: 40%;
		height: 50%;
		color: rgb(240, 81, 81);
		font-weight:900;

		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
			background: white  url(https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3157186938,260754809&fm=26&gp=0.jpg) no-repeat;
		background-size: 100% 100%;
	}

.id_input,.password_input,.password_again{
	width: 70%;
	height: 7%;
	font-size: 90%;
	position: absolute;
	right: 2%;
	
}


</style>