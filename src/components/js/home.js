export default {
        data() {
        return{
              key:'',
              id:'',
              names:'',
              furigana:'',
              join_date:'',
              get_cre:'',
              cre_date:'',
              bonus_date:'',
              do:'',
              click_btn:true,
		          userInfo:{},

              first_in:false,
             


              options: [{
              value: 'id',
              label: 'ユーザーID'
              }, {
                value: 'names',
                label: 'ユーザー名'
              }, {
                value: 'furigana',
                label: 'フリガナ'
              }, {
                value: 'join_date',
                label: '入社年月日'
              }, {
                value: 'get_cre',
                label: '資格'
              },{
                value: 'cre_date',
                label: '資格獲得日付'
              }, {
                value: 'bonus_date',
                label: '奨励金日付'
              }],
              value: '',
              
              tableData: [],
               }
           } ,
	      methods:{
          
        formatter(row, column) {
            return row.address;
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

          // 削除ボタン
        deleteRow(index, rows) {
            this.$confirm('ユーザーデータを削除しますか', '削除確認', {
            confirmButtonText: '確定',
            cancelButtonText: '取り消し',
            type: 'warning'
            }).then(() => {
            let self = this;
            self.$axios({
						method:'post',
						url: '/api/user/delete_data',
            data: {
              id:rows.id
              }
					})	.then( res => {
             	switch(res.data){
							case -1:
								break;
						}  
					}).catch( err => {
            	this.$message({
										type: 'error',
										message: 'エラーが発生しました。システム管理者にご連絡ください'
									}); 
						console.log(err);
					})
              this.tableData.splice(index, 1); 	
              this.$message({
                    type: 'success',
                    message: '削除した'
                 });
          }).catch(() => {
              this.$message({
                    type: 'info',
                    message: '取り消し'
             });          
        });
      },

        // 修正ボタン
        change_data(index,rows) {
            const self = this;
            this.click_btn=false;
            document.getElementById("cloud").style.display="block";
            //1秒の遅延
            setTimeout(() => {
                //传递参数
                this.$router.push({
                  name:'change',
                  params:{
                    id:rows.id,
                    names:rows.names,
                    furigana:rows.furigana,
                    join_date:rows.join_date,
                    get_cre:rows.get_cre,
                    cre_date:rows.cre_date,
                    bonus_date:rows.bonus_date,
                }
              });
    
           }, 300);
          
          },
 
        // 新規ボタン
        add_data:function() {
          this.click_btn=false;
          document.getElementById("cloud").style.display="block";
          //1秒の遅延
          setTimeout(() => {
            this.$router.push('/add');
  
         }, 300);    
             },

        //全部表示
        add_all(){
            let self = this;
            self.key='',
            self.value= '',
            self.$axios({
						method:'post',
						url: '/api/user/allcheck',
					})	.then( res => {
              self.tableData=res.data    
              //console.log(self.tableData);
					}).catch( err => {
						  this.$message({
									type: 'error',
									message: 'エラーが発生しました。システム管理者にご連絡ください'
								}); 
						console.log(err);
					    })
          },

        changes(){
          cha= this.key;
        },

        // キーワードの入力判断
			  goCheck:function(){
            let self = this;
            if(self.key == ''){
                  this.$message({
										type: 'warning',
										message: 'キーワードを入力してください'
									}); 
            // alert('キーワードを入力してください');
            }else if(self.value==''){
                  this.$message({
										type: 'warning',
										message: '検索項目を入力してください'
									}); 
          // alert('検索項目を入力してください');
            }else{
                  var tt = "";
                  var rr = "";
                  var yy = "";

                  rr=self.key.replace(/'/g, "''");
                  tt=rr.trim();
                  yy=tt.replace( /\s+/g, "　");
                 // console.log(yy);

                  
          	self.$axios({
                       method:'get',
                      url: '/api/user/check',
                      params: {
                          key:yy,
                          tag:self.value
					    	}
            
				  	})	.then( res => {
             console.log(res);
            if (res.data  == -1) {
             // alert("結果がない");
                  this.$message({
										  type: 'warning',
										  message: '結果がない'
									  }); 
            } else {      
              self.tableData=res.data ;
              
              // console.log(res);
              //console.log(self.tableData); 
                }
					  }).catch( err => {
            	    this.$message({
                      type: 'error',
                      message: 'エラーが発生しました。システム管理者にご連絡ください'
									  }); 
					          	console.log(err);
                })
              }
              
            },

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
                document.getElementById("home").appendChild(div);
                setTimeout(() => {
                  document.getElementById("home").appendChild(div_word);
              }, 200);
			 }
            },
          },

          mounted () { 
              // we can implement any method here like
              this.add_all()

              this.first_in = this.$route.params.first_in;
    

               if(  this.first_in==true){
                document.getElementById("door").style.display="block";
                   
                  	//時間遅延
									setTimeout(() => {
                    document.getElementById("door").style.display="none";
                 }, 1200);

                 
               }
              
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