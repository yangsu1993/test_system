
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
                var tt = word.toString().trim();
            	var yy = tt.toString().replace( /\s+/g, "　");
				   return yy;
	  	},
	  		  
		
	
		pushIn(){
				const self = this;
					if(self.id!=0 && self.names!=0 && self.name_furigana!=0 && self.join_date!=null){
					if(self.get_cre!=0&&self.cre_date!=0 || self.get_cre==0&&self.cre_date==0){
					
					if(self.cre_date==null){self.cre_date=""}
					if(self.bonus_date==null){self.bonus_date=""}
													
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
						}			
					}else{
					 		this.$message({
							type: 'warning',
							message: '空いている項目がある'
						}); 
				}	
			},

		cre_check(n){

				//输入栏内容
				var x =  n.currentTarget.value;
				if(x!=""){
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

				if(y=="names"){
					console.log((/\u0000-\u00ff]+/).test(x));
					//非半角+非片假名+非各种字符+非小写全角英文
					 if((/[\u0000-\u00ff]+/).test(x)||(/[\u30A1-\u3229]+/).test(x)||(/[\u3000-\u3017]+/).test(x)
					 ||(/[\uFF01-\uFF20]+/).test(x)||(/[\uFF3B-\uFFE5]+/).test(x)){
						document.getElementById(y).innerHTML = "*半角・記号・カタカナ・こもじ英文不可"
					 }else{
						document.getElementById(y).innerHTML = ""
					 } 
				 }

				if(y=="name_furigana"){
					console.log((/\u0000-\u00ff]+/).test(x));
					//カタカナのみ
					if((/[\u0000-\u00ff]+/).test(x)||(/[\u00A4 -\u3093]+/).test(x)||(/[\u3105-\uFFE5]+/).test(x)
					){
						 document.getElementById(y).innerHTML = "*半角・記号・平仮名・漢字不可"
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


