<template>
		

	
		<div class="background">
    	
		
			
		<header class="top_bar">
		    <a onclick="window.history.go(-1)" class="icon_back"></a>
		    <h3 class="cartname">社員情報新規</h3>
		<button @click="jump()" class="jbtn">戻る</button>
		<button @click="edit()" class="ebtn">ログアウト</button>
		</header>
		


		<main class="user_login_box">
				

		    <div class="login_dialog">
				
					
					<div class="eara1">

							<div class="_userid">

					<span style="color:red;">* </span>
					 ユーザー番号：
		            <input type="text" name="id"  placeholder="数字とアルファベットのみ" class="id" v-on:input="check_word($event)" v-model="id"  maxlength="7"   :disabled="true">
		        </div>
				<p id="id" class="id_t">*修正不可</p>
					<div style="margin-top:10%;"></div>

		        <div class="_username">
					<span style="color:red;">* </span>
					名前：
		            <input type="text" name="names" placeholder="漢字とひらがな/アルファベット" class="names" v-model="names"  v-on:input="check_word($event)" maxlength="15">
					
		        </div>
				<p id="names" class="names_t"></p>	
				<div style="margin-top:10%;"></div>
                 <div class="_username_furigana">
					 <span style="color:red;">* </span>
					 フリガナ：
		            <input type="text" name="name_furigana" placeholder="カタカナ(15位以内)" class="name_furigana" v-on:input="check_word($event)" v-model="name_furigana" maxlength="15">
				
		        </div>
				<p id="name_furigana" class="furigana_t"></p>	
						<div style="margin-top:10%;"></div>
						
				 <div class="block1">
						<span class="demonstration">
							<span style="color:red;">* </span>
							入社年月日：</span>
						<el-date-picker class="join_date" 
						v-model="join_date"
						align="right"
						type="date"
						placeholder="日付を選択"
						 format="yyyy-MM-dd"
						 :disabled="true"
						 :picker-options="pickerOptions"
						
						>
						</el-date-picker>
					</div>
						<p id="join_date" class="joindate_t">*修正不可</p>

					</div>
                 

				<div class="eara2">
					 <div class="_get_cre">
					 資格：
		            <input  type="text" name="get_cre" placeholder="資格"  class="get_cre" v-model="get_cre" v-on:input="cre_check($event)" >
		        </div>
				<p id=" get_cre" class="getcre_t"></p>
				<div style="margin-top:10%;"></div>



					 <div class="_cre_date">
						<span class="demonstration">資格獲得日付：</span>
						<el-date-picker class="cre_date"
						v-model="cre_date"
					
						align="right"
						type="date"
						placeholder="日付を選択"
						v-on:input="date_check()"
						:disabled="disabled"
						:picker-options="pickerOptions">
						</el-date-picker>
					</div>
						<p id="cre_date" class="credate_t"></p>
				<div style="margin-top:10%;"></div>


						 <div class="_bonus_date">
						<span class="demonstration">ボーナス獲得日付：</span>
						<el-date-picker class="bonus_date"
						v-model="bonus_date"
						align="right"
						type="date"
						placeholder="日付を選択"
						:picker-options="pickerOptions">
						</el-date-picker>
					</div>

				</div>
				
		        
		        <div class="login_box">
		            <button @click="pushIn()" class="btn">提出</button>
					 <!-- <router-link  to="/home" class="edit_box">戻る</router-link> -->
		        </div>

				

				
		    </div>
		</main>
	</div>
</template>








<script>

	export default{
		data(){
			return{		

						pickerOptions: {
						disabledDate(time) {
							return time.getTime() > Date.now();
						},
						},
				

				id:'',
				names:'',
                name_furigana:'',
				join_date:'',
				get_cre:'',
				cre_date:'',
				bonus_date:'',
				regInfo:{},
					disabled:true,
	
				
			}
			
		},
		methods:{
			jump(){
          this.$router.push('/home');
      },
	  	edit(){
			  localStorage.removeItem('Authorization');
          this.$router.push('/');
      },
	  	  		  
  stringChange(word){
			
			//var rr = word.toString().replace(/'/g, "''");
				
                var tt = word.toString().trim();
            	var yy = tt.toString().replace( /\s+/g, "　");
				   return yy;
	  },
	  		  
		
	
			pushIn(){
				const self = this;
				if(self.id!=0 && self.names!=0 && self.name_furigana!=0 && self.join_date!=null){
					if(self.get_cre!=0&&self.cre_date!=0 || self.get_cre==0&&self.cre_date==0){
						if(self.cre_date==null){
							self.cre_date=""
						}
						if(self.bonus_date==null){
							self.bonus_date=""
						}
													
						self.$axios({
						method:'post',
						url: '/api/user/update',
						data: {
							

							id: this.stringChange(self.id),
							names: this.stringChange(self.names),
							furigana:this.stringChange(self.name_furigana),
							join_date:this.stringChange(self.join_date),
							get_cre:this.stringChange(self.get_cre),
							cre_date:self.cre_date,
							bonus_date:self.bonus_date
						}
					})
					.then( res => {
						switch(res.data){
							case 0:
								 this.$message({
										type: 'success',
										message: '更新された'
									}); 
							//	alert("更新された");
								this.$router.push("/home")
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
					
				}else{
					 this.$message({
										type: 'warning',
										message: '資格情報を書き終わらない'
									}); 
				//	alert("資格情報を書き終わらない");	
				}			
				}else{
					 this.$message({
										type: 'warning',
										message: '空いている項目がある'
									}); 
					//	alert("空いている項目がある");
				}
				
			},

				cre_check(n){

			//输入栏内容
			var x =  n.currentTarget.value;
			if(x!=""){
					//console.log("???"+this.cre_date);
				
						
							document.getElementById("cre_date").innerHTML = "*空欄不可";
						
						    this.disabled=false
				
					
			}else{
				document.getElementById("cre_date").innerHTML = "";
				this.cre_date=""
				this.disabled=true
			}

			},

			date_check(){
			
				if(this.cre_date ==""||this.cre_date ==null ){
						document.getElementById("cre_date").innerHTML = "*空欄不可";
						//console.log("!!!!!!!!!!!"+this.cre_date);
				}else{
						document.getElementById("cre_date").innerHTML = "";
				}

			},

			
			check_word(n){
			//提示栏内容
			var y = n.currentTarget.name;
			//输入栏内容
			var x =  n.currentTarget.value;
			
			 if(x==""){ document.getElementById(y).innerHTML = "*空欄不可"}else{
				 
				//  if(y=="id"){
				// 	 	 //console.log((/[\u2E80-\uFE4F]+/).test(x));
				// 	 if((/[\u2E80-\uFE4F]+/).test(x)){
				// 		 document.getElementById(y).innerHTML = "*全角不可"
				// 		  //console.log(y);
				// 	 }else{
						
				// 		 document.getElementById(y).innerHTML = ""

				// 	 } 
				//  }

				  if(y=="names"){
					 	 console.log((/\u0000-\u00ff]+/).test(x));
						  // console.log(y);
						   //非半角+非片假名+非各种字符+非小写全角英文
					 if((/[\u0000-\u00ff]+/).test(x)||(/[\u30A1-\u3229]+/).test(x)||(/[\u3000-\u3017]+/).test(x)
					 ||(/[\uFF01-\uFF20]+/).test(x)||(/[\uFF3B-\uFFE5]+/).test(x)){
						 document.getElementById(y).innerHTML = "*半角・記号・カタカナ・こもじ英文不可"
						  //console.log(y);
					 }else{
						 document.getElementById(y).innerHTML = ""
					 } 
				 }

				  if(y=="name_furigana"){
					 	 console.log((/\u0000-\u00ff]+/).test(x));
						 //  console.log(y);
						   //カタカナのみ
					 if((/[\u0000-\u00ff]+/).test(x)||(/[\u00A4 -\u3093]+/).test(x)||(/[\u3105-\uFFE5]+/).test(x)
					){
						 document.getElementById(y).innerHTML = "*半角・記号・平仮名・漢字不可"
						  //console.log(y);
					 }else{
						 document.getElementById(y).innerHTML = ""
					 } 
				 }
				 	

	}
			 }

		},
        //进入页面加载的方法
        created(){
            this.id = this.$route.params.id;
            this.names = this.$route.params.names;
            this.name_furigana = this.$route.params.furigana;
            this.join_date = this.$route.params.join_date;
            this.get_cre = this.$route.params.get_cre;
            this.cre_date = this.$route.params.cre_date;
            this.bonus_date = this.$route.params.bonus_date;
			if(this.get_cre!=""){
					this.disabled=false;
			}
        

        }

	}




</script>

    

<style scoped>

	.background{
	width:1900px;
	height:950px ;
  /**宽高100%是为了图片铺满屏幕 */
   
	background: white url("../../assets/yun.png") repeat;
    position: absolute;
	/* opacity: 0.7; */
}
        

	.user_login_box{
	background:  white url("../../assets/frame.png") no-repeat;
	background-size:  100%;
	 /* box-shadow:10px 10px 10px gray; */
	width: 1200px;
	height: 652px;
	position:relative;
	
	left: 350px;
	font-size: 25px;
	}


.eara1{
	width:50%;

  /* background: red; */
	position:relative;
	top: 150px;
	left: 20px;

}


.eara2{
	width:47%;

   /* background: red; */
	position:relative;
	top: -180px;
	left: 620px;

}





.id,.cre_date,.password_input,.password_again,.names,.name_furigana,.join_date,.get_cre,.bonus_date{

	width: 300px;
	height:30px;
	font-size: 20px;
	position: absolute;
	right: 7%;
	
}

/* .btn_login{

    width: 20%;
    height: 10%;
    	position: absolute;
	top: 90%;
	left: 50%;
	transform: translate(-50%,-50%);
} */


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
	top: 450px;
	left: 800px;
}



.jbtn{
	width: 160px;
	height: 80px;
	background:   url("../../assets/btn.png") no-repeat;
	background-size:  100%;
	font-size: 30px;
	border:none;
	color: white;
	text-shadow:-5px -5px 5px rgb(139, 6, 6);

}

.btn:hover,.jbtn:hover{
	font-size: 40px;
}



.ebtn{
	width: 180px;
	height: 80px;
	background:   url("../../assets/btn.png") no-repeat;
	background-size:  100%;
	font-size: 24px;
	border:none;
	color: white;
	text-shadow:-5px -5px 5px rgb(139, 6, 6);
	position: absolute;
	/* left: 200px; */
	top: 200px;
	left: 0px;
}


.ebtn:hover{
	font-size: 32px;
}



.id_t,.names_t,.furigana_t,.joindate_t,.getcre_t,.credate_t{
		color: red;
		font-size: 70%;
	width: 100%;
    height: 2%;
	position: absolute;

	left: 92%;
	transform: translate(-50%,-50%);

}

/* 
.getcre_t{
	color: red;
	font-size: 70%;
	width: 60%;
    height: 2%;
	position: absolute;
	top: 52%;
	left: 25%;
	transform: translate(-50%,-50%);
}
.credate_t{
	color: red;
	font-size: 70%;
	width: 60%;
    height: 2%;
	position: absolute;
	top: 67%;
	left: 25%;
	transform: translate(-50%,-50%);
} */

.login_dialog{
	height: 100%;
	 /* background: green;  */
}




	.cartname{
   background: rgb(182, 1, 1); 
   font-size: 200%;
   font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
   color: white;

}



</style>