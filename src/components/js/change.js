
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
			click_btn:true,
			}	
		},
		methods:{
		jump(){
			this.click_btn=false;
            setTimeout(() => {
                this.$router.push('/home');
         }, 100);
		},
		edit(){
			this.click_btn=false;
			document.getElementById("door_close").style.display="block";

				//時間遅延
									setTimeout(() => {
					//console.log(res);
					localStorage.removeItem('Authorization');
					this.$router.push('/');
				 }, 1200);

			
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
					this.click_btn=false;						
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
				//获取输入长度
				var z = x.length;

			 if(x==""){ document.getElementById(y).innerHTML = "*空欄不可"}else{

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
					 // console.log(this.stringChange(this.names));
					 //只有汉字加平假名
					 //中に、１つスペースが必須
					 if((/[\u3000]+/).test(this.stringChange(this.names))){
						 document.getElementById(y).innerHTML = ""	

					 }else{
						 document.getElementById(y).innerHTML = "*姓と名の間に(全角)スペースを入力してください"
					 }
					 
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

							if((/[\u3000]+/).test(this.stringChange(this.name_furigana))){
						document.getElementById(y).innerHTML = ""
							}else{
								document.getElementById(y).innerHTML = "*姓と名の間に(全角)スペースを入力してください"
							}
						} 

					}	
				}
				}
			 },

			 	//シーンをクリックする時の表示
				 click_scene(){
			
			
					var l=getMousePos().x-50;
					var t=getMousePos().y-50;
					//ポイントの実例化
					var div = document.createElement("div");
					div.className="point";
					div.id="point";  
					div.style.width="100px"; 
					div.style.height="100px"; 
					div.style.position="absolute";
					//位置設定
					div.style.marginLeft=l+"px"; 
					div.style.marginTop=t+"px"; 
					div.style.backgroundRepeat="no-repeat"; 
					div.style.pointerEvents="none";
					//urlはホームページのフォルダに探して
					// div.style.backgroundImage='url(http://localhost:8090/static/img/point.9c42c43.png)' 
					div.style.backgroundImage='url(http://localhost:8090/static/img/ink.ff56099.png)' 
					//  div.style.backgroundImage='url(http://localhost:8090/static/img/flower.1ceb36a.png )' 
					div.style.backgroundSize="100%";
					div.style.zIndex=1008;
					
					// div.style.opacity=0.9;
						//アニメーション
						div.animate({
							opacity:0,
							transform:'rotate(90deg)',
						}, 500);
											
		
						var ll=getMousePos().x-25;
						var tt=getMousePos().y-25;
						//ランダム0~5	
						var q=Math.floor(Math.random()*6); 
						var pto_url;
						//この方法で写真は必ず＞10kb
						if(q==0){
							pto_url='http://localhost:8090/static/img/t1.8c34787.png'
						};
						if(q==1){
							pto_url='http://localhost:8090/static/img/t2.a6b908c.png'
						};
						if(q==2){
							pto_url='http://localhost:8090/static/img/t3.15cfb6c.png'
						};
						if(q==3){
							pto_url='http://localhost:8090/static/img/t4.2a44dc7.png'
						};
						if(q==4){
							pto_url='http://localhost:8090/static/img/t5.4178a31.png'	
						};
						if(q==5){
							pto_url='http://localhost:8090/static/img/t6.e9f2477.png'
						};
						var div_word = document.createElement("div");
						div_word.className="word";
						div_word.id="word";  
						div_word.style.width="50px"; 
						div_word.style.height="50px"; 
						div_word.style.position="absolute";
						//位置設定
						div_word.style.marginLeft=ll+"px"; 
						div_word.style.marginTop=tt+"px"; 
						div_word.style.backgroundRepeat="no-repeat"; 
						//urlはホームページのフォルダに探して
						div_word.style.backgroundImage='url('+pto_url+')' 
						div_word.style.backgroundSize="100%";
						div_word.style.zIndex=1009;
						div_word.style.opacity=0,
						div_word.style.pointerEvents="none";
					
						//アニメーション
	
					div_word.animate({
							opacity:1,
						}, 500);
		
					
					//時間遅延
					setTimeout(() => {
						div.style.display="none";
					
				 }, 500);
						
					 //時間遅延
					 setTimeout(() => {
						
						div_word.style.display="none";
				 }, 1200);

				 
			 //画面変わるバグ防止
			 if(this.click_btn==true){
				document.getElementById("change").appendChild(div);
				setTimeout(() => {
				   document.getElementById("change").appendChild(div_word);
			}, 200);
			 }
				},
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



						
			//時間遅延
			setTimeout(() => {
				document.getElementById("cloud").style.display="none";
			   // console.log(document.getElementById("door").style.display);
			 }, 600);
        }

	}

	function  getMousePos(event) {
		var e = event || window.event;
		var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
		var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
		var x = e.pageX || e.clientX + scrollX;
		var y = e.pageY || e.clientY + scrollY;
		//alert('x: ' + x + '\ny: ' + y);
		return { 'x': x, 'y': y };
	}

