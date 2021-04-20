<template>
	<div class="m_r">
		<header class="top_bar">
		    <a onclick="window.history.go(-1)" class="icon_back"></a>
		    <h3 class="cartname">社員情報修正</h3>
		</header>
		<main class="user_login_box">
		    <div class="login_dialog">
                 <div class="_userid" prop="id_txt">
					 ユーザー番号：
		            <input type="text" name="id"  class="id_text" readonly v-model="id">
                    <div  class="t_text">* 修正できない項目</div>
		        </div>
                <div style="margin-top:2%;"></div>
		        <div class="_username">
					名前：
		            <input type="text" name="names" placeholder="名前" class="names" v-model="names">
		        </div>
				<div style="margin-top:2%;"></div>
                 <div class="furigana">
					 フリガナ：
		            <input type="text" name="furigana" placeholder="フリガナのみ" class="furigana" v-model="furigana">
		        </div>
						<div style="margin-top:2%;"></div>
						
					  <div class="block1">
						<span class="demonstration" >入社年月日：</span>
						<el-date-picker class="join_date"
                        readonly
						v-model="join_date"
						align="right"
						type="date"
						placeholder="日付を選択"
						>
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
						>
						</el-date-picker>
					</div>

				<div style="margin-top:4%;"></div>


						 <div class="_bonus_date">
						<span class="demonstration">資格獲得日付：</span>
						<el-date-picker class="bonus_date"
						v-model="bonus_date"
						align="right"
						type="date"
						placeholder="日付を選択"
						>
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
				id:'',
				names:'',
                furigana:'',
				join_date:'',
				get_cre:'',
				cre_date:'',
				bonus_date:'',
				regInfo:{},
			rules:{
				id_txt: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
				}
			}
			
		},
		methods:{
			pushIn(){
				const self = this;
				if(self.id!=0 && self.names!=0 && self.furigana!=0 && self.join_date!=0){
					if(self.get_cre!=0&&self.cre_date!=0 || self.get_cre==0&&self.cre_date==0){
					
													
						self.$axios({
						method:'post',
						url: '/api/user/update',
						data: {
							id: self.id,
							names: self.names,
							furigana:self.furigana,
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
            this.furigana = this.$route.params.furigana;
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
.id,.cre_date,.names,.furigana,.join_date,.get_cre,.bonus_date{

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

.id_text{
     width:30%;
    background:rgb(212, 212, 212);
    position: absolute;
	top: 2%;
	left: 36%;
}
    .t_text{
    font-size: 70%;
    color: red;
    position: absolute;
	top: 2%;
	left: 70%;

    }

</style>