	
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
 		   },


		created(){this.id = "TJ";},


		methods:{

			jump(){this.$router.push('/home'); },

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
				//console.log( this.stringChange(self.id));
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

						// if(this.stringChange(self.name_furigana).replace(/ /g,"").length==0){
						// 		console.log("################3");

						// }

						console.log( this.stringChange(self.name_furigana).toString().replace(/ /g,"").length);
	
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
										this.$router.push("/home")
										break;
									case -1:
										if(self.btnDisabled==true){
										this.$message({
											type: 'error',
											message: '連打禁止'
											}); 
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
									//如果前面没有TJ就加上判断 有就直接判断
									// もし前にTJがなければ、TJを前に増加
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
						   //非半角假名+非半角+非片假名+非各种字符+非小写全角英文
						if(z==0){
							document.getElementById(y).innerHTML = "*空欄不可"
						}else{
							if((/[\uff61-\uff9f]+/).test(x)||(/[\u0000-\u00ff]+/).test(x)||(/[\u30A1-\u3229]+/).test(x)||(/[\u3001-\u3017]+/).test(x)||(/[\uFF01-\uFF20]+/).test(x)||(/[\uFF3B-\uFFE5]+/).test(x)){
						 	document.getElementById(y).innerHTML = "*半角・記号・カタカナ・こもじ英文不可"
						
						}else{
							//大写英文全角或者汉字加平假名
							if((/[\uFF21-\uFF3A]+/).test(x)&&(/[\u3041-\u9FA0]+/).test(x)){
							document.getElementById(y).innerHTML = "*おおもじ英文のみ/漢字とひらがな"
						}else{
							//只有汉字加平假名
							document.getElementById(y).innerHTML = ""	
						 }
					 	} 
					}		
				 }

				  	if(y=="name_furigana"){
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
		}
	}



