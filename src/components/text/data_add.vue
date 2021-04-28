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
		            <input type="text" name="id"  placeholder="数字とアルファベットのみ" class="id" v-on:input="check_word($event)" v-model="id"  maxlength="7" >
		        </div>
				<p id="id" class="id_t"></p>
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
						 :picker-options="pickerOptions"
						
						>
						</el-date-picker>
					</div>
						<p id="join_date" class="joindate_t"></p>

					</div>
                 

				<div class="eara2">
					 <div class="_get_cre">
					 資格：
		            <input  type="text" name="get_cre" placeholder="資格(20桁以内)"  class="get_cre" v-model="get_cre" v-on:input="cre_check($event)"   maxlength="20">
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
						 format="yyyy-MM-dd"
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
						 format="yyyy-MM-dd"
						:picker-options="pickerOptions">
						</el-date-picker>
					</div>

				</div>
				
		        
		        <div class="login_box">
		            <button @click="pushIn()" class="btn" :disabled="btnDisabled">提出</button>
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
					
						// imgSrc:require('../../assets/shui.jpg'),

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
				disabled:true,
			btnDisabled:false,
				
				regInfo:{}
			}
		},
		  mounted () { 

			  
       //这个属性就可以，在里面声明初始化时要调用的方法即可
      // we can implement any method here like
			const nowDate = new Date();
            const date = {
                year: nowDate.getFullYear(),
                month: nowDate.getMonth() + 1,
                date: nowDate.getDate(),
            }
            const newmonth = date.month>10?date.month:'0'+date.month
            const day = date.date>10?date.date:'0'+date.date
            this.join_date = date.year + '-' + newmonth + '-' + day


	//   var myDate = new Date();
    //   this.join_date=myDate.getDate()
    },
		
		
	
	created(){
            this.id = "TJ";
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
				 console.log( this.stringChange(self.id));
				if(self.id.substring(2,7)!="" && self.names!="" && self.name_furigana!="" && self.join_date!=null){
					if(self.get_cre!=""&&self.cre_date!="" || self.get_cre==""&&self.cre_date==""){
						//ユーザーidの半角判断(半角+非全角+非全角字符)
							//仮名の判断（片假名+非半角+非平假名+非中文+非全角+非全角記号）

							//ユーザー番号の半角判断
					if(document.getElementById("id").innerHTML == ""){
						//ユーザー名前の判断
					if(document.getElementById("names").innerHTML == ""){
							//仮名の判断	
					if(document.getElementById("name_furigana").innerHTML == ""){
						 
						
						self.$axios({
						method:'post',
						url: '/api/user/push',
						data: {
							id: this.stringChange(self.id),
							names: this.stringChange(self.names),
							name_furigana:this.stringChange(self.name_furigana),
							join_date:self.join_date,
							get_cre:this.stringChange(self.get_cre),
							cre_date:self.cre_date,
							bonus_date:self.bonus_date
						}
					})
					.then( res => {
						
						
							
						switch(res.data){
							case 0:
							
							self.btnDisabled=true;
									
									  this.$message({
										type: 'success',
										message: '新規された'
									}); 
								//alert("新規された");
								this.$router.push("/home")
								break;

							case -1:
							
								if(self.btnDisabled==true){

									  this.$message({
										type: 'error',
										message: '連打禁止'
									}); 
									//alert("連打禁止");

								}else{
									document.getElementById("id").innerHTML = "*ユーザー名もう存在している"
								}
								
								
								
								break;	
						}
					})
					.catch( err => {
						  this.$message({
										type: 'error',
										message: 'エラーが発生しました。システム管理者にご連絡ください'
									}); 
						//	alert("エラーが発生しました。システム管理者にご連絡ください");
							console.log(err);
					})

					}else{
						  this.$message({
										type: 'warning',
										message: '正しいカタカナは誤入力'
									}); 
								//alert("正しいカタカナは誤入力");
						}
					}else{

						  this.$message({
										type: 'warning',
										message: '正しい名前は誤入力'
									}); 
						//alert("正しい名前は誤入力");
					}	
					}else{
						 this.$message({
										type: 'warning',
										message: 'ユーザー番号は誤入力'
									}); 
							//	alert("ユーザー番号は誤入力");
									
						}
					

				}else{
					
					document.getElementById("cre_date").innerHTML = "*空欄不可";
				}			
				}else{
						
					//	console.log(self.join_date);
					 	if(self.join_date==null){
					 	document.getElementById("join_date").innerHTML = "*空欄不可"
					 }
					 if(self.id.substring(2,7)==0){
					 	document.getElementById("id").innerHTML = "*空欄不可"
					 }
					  if(self.names==0){
					 	document.getElementById("names").innerHTML = "*空欄不可"
					 }
					   if(self.name_furigana==0){
					 	document.getElementById("name_furigana").innerHTML = "*空欄不可"
					 }
					 
				}
				
			},
				//资格填写（要么两个都写要么两个都不写）
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
			//获取输入长度
			var z = x.length;

			

			 if(y=="id"){	
			//保留前两位
			if(z<=2) {
						 this.id = "TJ";
			document.getElementById(y).innerHTML = "*空欄不可"
				}else{
					let	q=x.substring(2,7);
					let p=x.substring(0,2);

							// console.log(p);
							//如果前面没有TJ就加上判断 有就直接判断
							if(p!="TJ"){
								
								let	w="TJ"+x;
								this.id=w
		
							}

									//console.log(q);
					 if((/[\u2E80-\uFE4F]+/).test(q)||(/[\uff61-\uff9f]+/).test(q)||(/[\u0000-\u002F\u003A-\u00ff]+/).test(q)||(/[\u00A4-\uFFE5]+/).test(x)){
						 document.getElementById(y).innerHTML = "*半角数字のみ"
						  //console.log(y);
					 }else{
						 if(z==7){
							  document.getElementById(y).innerHTML = ""
						 }else{
							 	 document.getElementById(y).innerHTML = "*5桁を入力してください"
						 }
						
					 } 
				 }
			 }
				
				  if(y=="names"){
					 	 //console.log((/\u0000-\u00ff]+/).test(x));
						   //console.log(y);
						   //非半角假名+非半角+非片假名+非各种字符+非小写全角英文
						 if(z==0){
							 		document.getElementById(y).innerHTML = "*空欄不可"
						 }else{
							  if((/[\uff61-\uff9f]+/).test(x)||(/[\u0000-\u00ff]+/).test(x)||(/[\u30A1-\u3229]+/).test(x)||(/[\u3001-\u3017]+/).test(x)||(/[\uFF01-\uFF20]+/).test(x)||(/[\uFF3B-\uFFE5]+/).test(x)){
						 document.getElementById(y).innerHTML = "*半角・記号・カタカナ・こもじ英文不可"
						  //console.log(y);
					 }else{
						 //大写英文全角或者汉字加平假名
						 if((/[\uFF21-\uFF3A]+/).test(x)&&(/[\u3041-\u9FA0]+/).test(x)){

								 	 document.getElementById(y).innerHTML = "*おおもじ英文のみ/漢字とひらがな"
							 

						 }else{
							 	//只有汉字加平假名
							 	 document.getElementById(y).innerHTML = ""	
						 }
						// document.getElementById(y).innerHTML = ""
					 } 
						 }

					
				 }

				  if(y=="name_furigana"){
					 //	 console.log((/\u0000-\u00ff]+/).test(x));
						   //console.log(y);
						   //カタカナのみ
						if(z==0){
							 		document.getElementById(y).innerHTML = "*空欄不可"
						 }else{
							 	if((/[\u0000-\u00ff]+/).test(x)||(/[\u00A4 -\u2642\u3001-\u3093]+/).test(x)||(/[\u3105-\uFFE5]+/).test(x)||(/[\uff61-\uff9f]+/).test(x)
					){
						 document.getElementById(y).innerHTML = "*半角・記号・平仮名・漢字不可"
						  //console.log(y);
					 }else{
						 document.getElementById(y).innerHTML = ""
					 } 

						 }

					 
				 }





					
			
			
			
				 	

	
			 }
			//
			



		// 	//時間の判断
		// isDate(date){
		// 	var arr =date.split("-");
		// 	if(arr.length==3){
		// 		let tim = new Date.
		// 		if(arr[0].length==4&&arr[0]<=Calendar.YEAR){
		// 		if(arr[1].length==2){
		// 			if(arr[2].length==2){
		// 				return true;

		// 			}
		// 		}
		// 		}
		// 	}
		// 		return false;
		// }
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

.btn:hover,.jbtn:hover{
	font-size: 40px;
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