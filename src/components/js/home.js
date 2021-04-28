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
		          userInfo:{},

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
			      localStorage.removeItem('Authorization');
            this.$router.push('/');
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
            console.log(index);
            console.log(rows);
            const self = this;
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
          },
 
        // 新規ボタン
        add_data:function() {
              this.$router.push('/add');
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
                  console.log(yy);

          		    self.$axios({
                      method:'post',
                      url: '/api/user/check',
                      data: {
                          key:yy,
                          tag:self.value
					    	}
				  	})	.then( res => {
            if (res.data == -1) {
             // alert("結果がない");
                  this.$message({
										  type: 'warning',
										  message: '結果がない'
									  }); 
            } else {
              self.tableData=res.data     
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
          
          },

          mounted () { 
              //这个属性就可以，在里面声明初始化时要调用的方法即可
              // we can implement any method here like
              this.add_all()
      }
  }

  

