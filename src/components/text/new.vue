<template>
	<div class="background">
		<header class="top_bar">
		    <a onclick="window.history.go(-1)" class="icon_back"></a>
		    <h3 class="cartname">新規登録</h3>
			<button @click="edit()" class="ebtn">戻る</button>
		</header>
		<main class="new_box">
		    <div class="new_dialog">
                 <div class="_userid">
					 ユーザー名：
		            <input type="text" name="username" placeholder="ユーザーID" v-on:input="check_word($event)" class="id_input" v-model="username"  maxlength="7" >
		        		<p id="username" class="username_t"></p>
				</div>
				<div style="margin-top:8%;"></div>
                <div class=" _passwd">
					暗証番号：
		            <input type="password" name="password" placeholder="暗証番号"  v-on:input="check_word($event)" class="password_input" v-model="password"  maxlength="10" >
		       			<p id="password" class="password_t"></p>
			    </div>
				<div style="margin-top:8%;"></div>
		        <div class="_pwdage">
					再度入力：
		            <input type="password" name="passwd_ag" placeholder="暗証番号もう一度入力してください"  v-on:input="same_check()" class="password_again" v-model="password_ag"  maxlength="10" >
		       			<p id="password_ag" class="pswag_t"></p>
			    </div>
		        <div style="margin-top:8%;"></div>
		        <div class="login_box">
		            <button @click="new_user_check()" class="btn">提出</button>
				
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

			edit(){
          this.$router.push('/');
      },

	  stringChange(word){
				
                var tt = word.toString().trim();
            	var yy = tt.toString().replace( /\s+/g, "　");
				   return yy;
	  },


			new_user_check(){
				const self = this;
				if(self.username != "" && self.password != "" && self.password_ag != ""){
					if(self.password !=self.password_ag){
						//alert("暗証番号一致してない");
						this.$message({
										type: 'warning',
										message: '暗証番号一致してない'
									}); 
					
					}else{
					self.$axios({
						method:'post',
						url: '/api/user/add',
						data: {
							
							username : this.stringChange(self.username),
							password : this.stringChange(self.password)
						}
					})
					.then( res => {
						switch(res.data){
							case 0:
								 this.$message({
										type: 'success',
										message: '新規された'
									}); 
								//alert("新規された");
								this.$router.push("/")
								break;
							case -1:
								 this.$message({
										type: 'warning',
										message: 'ユーザー名存在された'
									}); 
								//alert("ユーザー名もう存在している");
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

	.background{
	width:1900px;
	height:950px ;
   
	background: white url("../../assets/yun.png") repeat;
    position: absolute;
	/* opacity: 0.7; */
}

.new_box{
	background:  white url("../../assets/frame.png") no-repeat;
	background-size:  100%;
	 /* box-shadow:10px 10px 10px gray; */
	width: 900px;
	height: 492px;
	position:relative;
	top: 50px;
	left: 500px;
}

	.new_dialog{
		
		font-size: 30px;
		width: 800px;
	height: 438px;
		position: absolute;
	top: 80px;
	left: 100px;
		
	}

.id_input,.password_input,.password_again{
	width: 400px;
	height: 50px;
	font-size: 20px;
	position: absolute;
	left: 250px;
	
}


.btn{
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
	top: 300px;
	left: 500px;
}



.ebtn{
	width: 160px;
	height: 80px;
	background:   url("../../assets/btn.png") no-repeat;
	background-size:  100%;
	font-size: 30px;
	border:none;
	color: white;
	text-shadow:-5px -5px 5px rgb(139, 6, 6);


}

.btn:hover,.ebtn:hover{
	font-size: 40px;
}

.username_t,.password_t,.pswag_t{
	font-size: 20px;
	color: red;
	width: 450px;
	height: 50px;
	position: absolute;
	left: 250px;
/* background: yellowgreen; */
}



.cartname{
   background: rgb(182, 1, 1); 
   font-size: 200%;
   font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
   color: white;
}

</style>