<template>
	<div class="m_r">
		<header class="top_bar">
		    <a onclick="window.history.go(-1)" class="icon_back"></a>
		    <h3 class="cartname">社員情報新規</h3>
		</header>
		<main class="user_login_box">
				

		    <div class="login_dialog">

					<div class="t_box">
					<p id="id" class="id_t"></p>
					<div style="margin-top:10%;"></div>
					<p id="names" class="names_t"></p>
					<div style="margin-top:10%;"></div>
					<p id="name_furigana" class="furigana_t"></p>
					<div style="margin-top:15%;"></div>
						<p id="join_date" class="furigana_t"></p>
					</div>	


                 <div class="_userid">
					<span style="color:red;">* </span>
					 ユーザー番号：
		            <input type="text" name="id"  placeholder="数字とアルファベットのみ" class="id" v-on:input="check_word($event)" v-model="id"  maxlength="15" >
					
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
						align="right"
						type="date"
						placeholder="日付を選択"
						:picker-options="pickerOptions">
						</el-date-picker>
					
					</div>

				<div style="margin-top:5%;"></div>
				 <div class="_get_cre">
					 資格：
		            <input type="text" name="get_cre" placeholder="資格" class="get_cre" v-model="get_cre">
		        </div>
				<div style="margin-top:2%;"></div>



					 <div class="_cre_date">
						<span class="demonstration">資格獲得日付：</span>
						<el-date-picker class="cre_date"
						v-model="cre_date"
						align="right"
						type="date"
						placeholder="日付を選択"
						:picker-options="pickerOptions">
						</el-date-picker>
					</div>

				<div style="margin-top:4%;"></div>


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
				regInfo:{}
			}
		},
		methods:{
				
		
			
			pushIn(){
				const self = this;
				if(self.id!=0 && self.names!=0 && self.name_furigana!=0 && self.join_date!=0){
					if(self.get_cre!=0&&self.cre_date!=0 || self.get_cre==0&&self.cre_date==0){
						//ユーザーidの半角判断(半角+非全角+非全角字符)
							//仮名の判断（片假名+非半角+非平假名+非中文+非全角+非全角記号）

							//ユーザー番号の半角判断
					if((/[\u0000-\u00ff]+/).test(self.id) &&!(/[\uff00-\uffff]+/).test(self.id)&&!(/[\u3000 -\u303F]+/).test(self.id)){
						//ユーザー名前の判断
					if((/[\u0030-\u0039\u0041-\u005a\u0061-\u007a\u3040-\u309F\u4E00-\u9FBF\-_]+/).test(self.names) && !(/[\u0000-\u00ff]+/).test(self.names)&&!(/[\u30A0-\u30FF]+/).test(self.names) && !(/[\uff00-\uffff]+/).test(self.names)&&!(/[\u3000 -\u303F]+/).test(self.names) ){
							//仮名の判断	
					if((/[\u30A0-\u30FF]+/).test(self.name_furigana) && !(/[\u0000-\u00ff]+/).test(self.name_furigana) && !(/[\u3040-\u309F]+/).test(self.name_furigana) && !(/[\u4e00-\u9fb5]+/).test(self.name_furigana) && !(/[\uff00-\uffff]+/).test(self.name_furigana)&&!(/[\u3000 -\u303F]+/).test(self.name_furigana) ){
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
								alert("ユーザー名もう存在している");
								break;
						}
					})
					.catch( err => {
						console.log(err);
					})

					}else{
								alert("正しいカタカナを入力してください\n片假名+非半角+非平假名+非中文+非全角記号");
						}
					}else{
						alert("正しい名前を入力してください\n漢字・片仮名・全角英文を入力してください");
					}	
					}else{
								alert("ユーザー番号が半角にしてください");
						}
					

				}else{
					alert("資格情報を書き終わらない");	
				}			
				}else{
						alert("空いている項目がある");
					 	if(self.join_date==0){
					 	document.getElementById("join_date").innerHTML = "*空欄不可"
					 }
				}
				
			},
			check_word(n){
			
			var y = n.currentTarget.name;
			var x =  n.currentTarget.value;
			 console.log(y);
			 if(x==""){ document.getElementById(y).innerHTML = "*空欄不可"}else{
				 	document.getElementById(y).innerHTML = x;
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
.id,.cre_date,.password_input,.password_again,.names,.name_furigana,.join_date,.get_cre,.bonus_date{

	width: 60%;
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
	position: absolute;
	top: 90%;
	left: 80%;
	transform: translate(-50%,-50%);
}

.t_box{
		width: 60%;
    height: 60%;
		/* background: green; */
		position: absolute;
	 top: 2%;
	left: 38%;
}

.id_t,.names_t,.furigana_t,.join_date_t{
	font-size: 80%;
	color: red;

	width: 60%;
    height: 2%;


}


</style>