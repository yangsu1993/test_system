<template>
	<div class="m_r">
		<header class="top_bar">
		    <a onclick="window.history.go(-1)" class="icon_back"></a>
		    <h3 class="cartname">社員情報新規</h3>
		</header>
		<main class="user_login_box">
				

		    <div class="login_dialog">

					<div class="t_box">
						<div style="margin-top:1%;"></div>
					<p id="id" class="id_t">*修正不可</p>
					<div style="margin-top:7%;"></div>
					<p id="names" class="names_t"></p>
					<div style="margin-top:6%;"></div>
					<p id="name_furigana" class="furigana_t"></p>
					<div style="margin-top:13%;"></div>
						<p id="join_date" class="furigana_t">*修正不可</p>
					</div>	


                 <div class="_userid">
					<span style="color:red;">* </span>
					 ユーザー番号：
		            <input type="text" name="id" 	:disabled="true" placeholder="数字とアルファベットのみ"  class="id"  v-model="id"  maxlength="15" >
					
		        </div>
                <div style="margin-top:2%;"></div>
		        <div class="_username">
					<span style="color:red;">* </span>
					名前：
		            <input type="text" name="names" placeholder="名前" class="names" v-model="names"  v-on:input="check_word($event)" maxlength="15">
					
		        </div>
				<div style="margin-top:2%;"></div>
                 <div class="_username_furigana">
					 <span style="color:red;">* </span>
					 フリガナ：
		            <input type="text" name="name_furigana" placeholder="カタカナ" class="name_furigana" v-on:input="check_word($event)" v-model="name_furigana">
				
		        </div>
						<div style="margin-top:2%;"></div>
						
				 <div class="block1">
						<span class="demonstration">
							<span style="color:red;">* </span>
							入社年月日：</span>
						<el-date-picker class="join_date" 
						v-model="join_date"
						type="date"
						name="join_date"
						:disabled="true"
						placeholder="日付を選択"
						:picker-options="pickerOptions">
						</el-date-picker>
					</div>

				
			
				

				<div style="margin-top:7%;"></div>
				 <div class="_get_cre">
					 資格：
		            <input type="text" name="get_cre" placeholder="資格" class="get_cre" v-model="get_cre">
		        </div>
				<div style="margin-top:2%;"></div>



					 <div class="block2">
						<span class="demonstration">資格獲得日付：</span>
						<el-date-picker class="cre_date"
						v-model="cre_date"
						align="right"
						type="date"
						placeholder="日付を選択"
						:picker-options="pickerOptions">
						</el-date-picker>
					</div>

				<div style="margin-top:6%;"></div>


						 <div class="block3">
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
	
				
			}
			
		},
		methods:{
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
							id: self.id,
							names: self.names,
							furigana:self.name_furigana,
							join_date:self.join_date,
							get_cre:self.get_cre,
							cre_date:self.cre_date,
							bonus_date:self.bonus_date
						}
					})
					.then( res => {
						switch(res.data){
							case 0:
								alert("更新された");
								this.$router.push("/home")
								break;
						}
					})
					.catch( err => {
						console.log(err);
					})
					
				}else{
					alert("資格情報を書き終わらない");	
				}			
				}else{
						alert("空いている項目がある");
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
        

        }

	}




</script>

<style scoped>

	.user_login_box{
		font-family: Georgia, 'Times New Roman', Times, serif;
		box-shadow:10px 10px 10px grey;
		font-size: 110%;
		width: 45%;
		height: 60%;
		color: black;
		font-weight:900;

		position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%,-50%);
			background: white  url(https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1984620042,2404712648&fm=26&gp=0.jpg) no-repeat;
		background-size: 100% 100%;
	}
.cre_date,.password_input,.password_again,.join_date,.names,.name_furigana,.get_cre,.bonus_date{

	width: 60%;
	font-size: 80%;
	position: absolute;
	right: 2%;
	
}

.id{
	/* background:rgb(219, 219, 219); */
	width: 60%;
	font-size: 80%;
	position: absolute;
	right: 2%;
	top: 1%;
	/* border:rgb(126, 126, 126); */
	
}

/* .eara1{
	background:rgb(151, 151, 151);
	opacity:0.4;
	width: 60%;
	height: 10%;
	font-size: 80%;
	position: absolute;
	top: 25.7%;
	right: 2%;
	
} */

.btn_login{

    width: 20%;
    height: 10%;
    	position: absolute;
	top: 90%;
	left: 50%;
	transform: translate(-50%,-50%);
}
.edit_box{
	position: absolute;
	top: 90%;
	left: 80%;
	transform: translate(-50%,-50%);
}

.t_box{
		width: 60%;
    height: 200%;
		/* background: green; */
		position: absolute;
	 top: 2%;
	left: 38%;
}

.id_t,.names_t,.furigana_t,.join_date_t{
		/* background: green; */
	font-size: 80%;
	color: red;

	width: 60%;
    height: 2%;


}

</style>