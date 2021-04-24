<template>
		

	
		<div class="background">
    	
		
			
		<header class="top_bar">
		    <a onclick="window.history.go(-1)" class="icon_back"></a>
		    <h3 class="cartname">社員情報新規</h3>
		
		</header>
		


		<main class="user_login_box">
				

		    <div class="login_dialog">
					<div class="t_box">
					<p id="id" class="id_t"></p>
					<p id="names" class="names_t"></p>			
					<p id="name_furigana" class="furigana_t"></p>				
					<p id="join_date" class="joindate_t"></p>
					<p id=" get_cre" class="getcre_t"></p>
					<p id="cre_date" class="credate_t"></p>
					</div>	
					

                 <div class="_userid">

					<span style="color:red;">* </span>
					 ユーザー番号：
		            <input type="text" name="id"  placeholder="数字とアルファベットのみ" class="id" v-on:input="check_word($event)" v-model="id"  maxlength="7" >
					
		        </div>
                <div class="eara1"></div>
		        <div class="_username">
					<span style="color:red;">* </span>
					名前：
		            <input type="text" name="names" placeholder="漢字とひらがな/アルファベットのみ" class="names" v-model="names"  v-on:input="check_word($event)" maxlength="15">
					
		        </div>
				<div style="margin-top:5%;"></div>
                 <div class="_username_furigana">
					 <span style="color:red;">* </span>
					 フリガナ：
		            <input type="text" name="name_furigana" placeholder="カタカナ(17位以内)" class="name_furigana" v-on:input="check_word($event)" v-model="name_furigana" maxlength="17">
				
		        </div>
						<div style="margin-top:5%;"></div>
						
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

				<div style="margin-top:7%;"></div>
				 <div class="_get_cre">
					 資格：
		            <input  type="text" name="get_cre" placeholder="資格"  class="get_cre" v-model="get_cre" v-on:input="cre_check($event)" >
		        </div>
				<div style="margin-top:5%;"></div>



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

				<div style="margin-top:7%;"></div>


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
		        
		        <div class="login_box">
		            <button @click="pushIn()" class="btn_login">提出</button>
					 <router-link  to="/home" class="edit_box">戻る</router-link>
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
    }, created(){
            this.id = "TJ";
        },
		methods:{

				
		
			
			pushIn(){
				const self = this;
				if(self.id.substring(2,7)!=0 && self.names!=0 && self.name_furigana!=0 && self.join_date!=null){
					if(self.get_cre!=0&&self.cre_date!=0 || self.get_cre==0&&self.cre_date==0){
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
							id: self.id,
							names: self.names,
							name_furigana:self.name_furigana,
							join_date:self.join_date,
							get_cre:self.get_cre,
							cre_date:self.cre_date,
							bonus_date:self.bonus_date
						}
					})
					.then( res => {
						switch(res.data){
							case 0:
								alert("新規された");
								this.$router.push("/home")
								break;
							case -1:
								
								document.getElementById("id").innerHTML = "*ユーザー名もう存在している"
								break;
						}
					})
					.catch( err => {
						console.log(err);
					})

					}else{
								alert("正しいカタカナは誤入力");
						}
					}else{
						alert("正しい名前は誤入力");
					}	
					}else{
								alert("ユーザー番号は誤入力");
									//console.log(document.getElementById("id").innerHTML);
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
		font-family: Georgia, 'Times New Roman', Times, serif;
		box-shadow:30px 30px 30px grey;
	
		font-size: 30px;
		width: 700px;
		height: 700px;
		color: black;
		font-weight:900;
		z-index: 0;
			 overflow: hidden;
		 position: relative;	
			left: 400px;
			
			/* background: white  url(https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1984620042,2404712648&fm=26&gp=0.jpg) no-repeat; */
		background-size: 100% 100%;
	}

.user_login_box::before{
	 content:'';
    position:absolute;  /* 固定模糊层位置 */
    top:0;
    left:0;
    right:0;
    bottom:0;
   	background: white  url("../../assets/yun.png") repeat;/* 与上面的 bg 中的background设置一样 */
    filter:blur(5px) contrast(.8);  /* 值越大越模糊 */
    z-index:-1;  /* 模糊层在最下面 */
}


.id,.cre_date,.password_input,.password_again,.names,.name_furigana,.join_date,.get_cre,.bonus_date{

	width: 60%;
	height:5%;
	font-size: 80%;
	position: absolute;
	right: 2%;

	
}

.btn_login{

    width: 20%;
    height: 10%;
    	position: absolute;
	top: 90%;
	left: 50%;
	transform: translate(-50%,-50%);
}
.edit_box{
		 /* background: green;  */
	position: absolute;
	top: 90%;
	left: 80%;
	transform: translate(-50%,-50%);
}

.t_box{
		width: 60%;
    height: 100%;
		 /* background: green;  */
		position: absolute;
	 top: 1%;
	left: 38%;
}

.id_t{
	color: red;
		font-size: 70%;
	width: 100%;
    height: 2%;
	position: absolute;
	top: 4%;
	left: 45%;
	transform: translate(-50%,-50%);
}
.names_t{
	color: red;
	font-size: 70%;
	 /* background: green;  */
	width: 100%;
    height: 2%;
	position: absolute;
	top: 15%;
	left: 45%;
	transform: translate(-50%,-50%);
}
.furigana_t{
	color: red;
	font-size: 70%;
	width: 100%;
    height: 2%;
	position: absolute;
	top: 27%;
	left: 45%;
	transform: translate(-50%,-50%);
}
.joindate_t{
	color: red;
	font-size: 70%;
	width: 60%;
    height: 2%;
	position: absolute;
	top: 41%;
	left: 25%;
	transform: translate(-50%,-50%);
}
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
}

.login_dialog{
	height: 100%;
	 /* background: green;  */
}

.eara1{
	    height: 5%;
		 /* background: green;  */
}

.cartname{
	font-size: 50px;
}



</style>