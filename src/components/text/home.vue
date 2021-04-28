<template>

<div class="background">
        
    <!-- //タイトル -->
		<header class="top_bar">
		    <a onclick="window.history.go(-1)" class="icon_back"></a>
		    <h3 class="cartname">情報検索</h3>
        <button @click="edit()" class="ebtn">ログアウト</button>
		</header>

      
		<main class="user_login_box">
             
            <div class="btnGroup">

              
                <div class="btnBack"></div>
             
                     
               <button @click="add_data()"
                    type="text"
                    class="newBtn"
                    >
                    新規</button>
              <div style="margin-top:2%;"></div>
              <button @click="add_all()"
                    type="text"
                    class="allBtn"
                    >
                    全員リスト</button>
             
              
            
                 
            </div>

		   <div class="findKey">
         
         <div>
            <!-- 入力枠 -->
		    <input type="text" name="key" placeholder="キーワードを入力してください" class="key_input" v-model="key"  maxlength="25"/>
         </div>


       <div class="checkP">
                  <!-- 選択肢 -->
              <el-select name="check" class="_check" v-model="value" placeholder="項目選択肢">
              <el-option 
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
    </el-option>
     </el-select>
       </div>
              
         
       <div class="CbtnP">
              
        <!-- 検索ボタン -->
         <button @click="goCheck()" class="Cbtn">検索</button>		 

       </div>

      <div class="tattleF"></div>

            <div class="tattleW" >キーワード検索</div>
        
             


       </div>
               
                   
            <div class="graph" >
              .
            <div class="=table_data"> 
                <el-table
                :data="tableData"
               
                style="font-size: 20px"
                max-height="500"
                max-width="2000"
               :row-style="{height:'60px'}"
             
                >
                
                <el-table-column
                fixed
                prop="id"
                label="ユーザーID"
                 sortable
                width="200"
                 align="center"
                 header-align="center"
                >
                </el-table-column>
                <el-table-column
                prop="names"
                label="ユーザー名"
                width="200"
                align="center"
                 header-align="center">
                </el-table-column>
                <el-table-column
                prop="furigana"
                label="フリガナ"
                width="200"
                 align="center"
                 header-align="center">
                </el-table-column>
                <el-table-column
                prop="join_date"
                label="入社年月日"
                sortable
                width="200"
                 align="center"
                 header-align="center">
                </el-table-column>
                <el-table-column
                prop="get_cre"
                label="資格"
                width="200"
                 align="center"
                 header-align="center">
                </el-table-column>

                 <el-table-column

                label="資格認定日付"
                width="200"
               prop="cre_date"
                sortable 
                 align="center"
                 header-align="center"
                >
                </el-table-column>

                <el-table-column
                prop="bonus_date"
                label="奨励金日付"
                 sortable
                width="200"
                 align="center"
                 header-align="center">
                </el-table-column>
                <el-table-column
                label="操作"
                :formatter="formatter"
                width="200"
                 prop="do" 
                   align="center"
                  header-align="center"
               >
                <template slot-scope="scope">
                    <el-button
                    @click.native.prevent="deleteRow(scope.$index,scope.row)"
                    type="text"
                   >
                    削除
                    </el-button>

                    <el-button
                    @click.native.prevent="change_data(scope.$index,scope.row)"
                    type="text"
                   >
                    修正
                    </el-button>
                </template>
     </el-table-column>
    </el-table>
            </div>
            </div>

     
  
		</main>

     
	</div>



 
</template>

<script>
       
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
      
      // if(prop!=""){
                  
      //            <el-button
      //               @click.native.prevent="deleteRow(scope.$index, tableData)"
      //               type="text"
      //               size="small">
      //               あり
      //               </el-button>

      //           }

    } ,
	methods:{

       formatter(row, column) {
         
        return row.address;
        
      },

      	edit(){
			  localStorage.removeItem('Authorization');
          this.$router.push('/');
      },

      // token_edit(){
      //     localStorage.removeItem('Authorization');
      //     this.$router.push('/');
      // },


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
      // //資格あるかどうかの判断
      // _bool(row,column){
      //     if(row.get_cre===""){
      //       return 'なし'
      //     }else{
      //      row.key=222
           
      //     }

      // },   
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
          cha=  this.key;



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

            
                 //tt=self.key;
                  rr=self.key.replace(/'/g, "''");
                   tt=rr.trim();
                  
                   yy=tt.replace( /\s+/g, "　");
           
               console.log(yy);
           
          		self.$axios({
						method:'post',
						url: '/api/user/check',
						data: {
              
              key:yy,
              // key: document.getElementById("key").innerHTML ,
               tag:self.value
             
						}
					})	.then( res => {
            
                	//console.log(document.write(encodeURIComponent(self.key)));
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


.graph{

    
  /* background:rgb(253, 100, 100);  */
  font-size: 40px;
  color:white;
  background:rgb(255, 145, 145);
  	
		position: absolute;
  top: 380px;
	left: 8%;
	background: url("../../assets/btn.png") repeat;
	background-size:  10%;
}

/* 検索についてUI */
.tattleF{
  width: 300px;
  height: 300px;
   position:relative;
  	top: -200px;
    left: -200px;
  font-size: 30px;
  	background:  url("../../assets/he.png") repeat;
    background-size: 100%;
    transform: rotateY(180deg)
    
}

.tattleW{
  /* background: yellowgreen; */
  width: 250px;
  height: 50px;
 
  font-size: 30px;
  
    background-size: 100%;
      position:relative;
  	top: -450px;
    left: -50px;  
}



.findKey{
  width: 500px;
  height: 272px;
 position:relative;
  	top: -10px;
	left: 1000px;
  	background:  white url("../../assets/frame.png") no-repeat;
    background-size: 100%;
  /* background: yellowgreen; */

}



.key_input{
    width:350px;
    height:50px;
    font-size: 130%;  
      position:relative;
  
	    left: 100px;
       top: 120px; 
}



 .checkP{
     width: 300px;
       position:relative;
	    left: 240px;
       top: -10px; 
} 

.CbtnP{
   position:relative;
  
	left: 150px;
  top: 90px;

}
.Cbtn{
	width: 160px;
	height: 80px;
	background:  url("../../assets/btn.png") no-repeat;
	background-size:  100%;
	font-size: 30px;
	border:none;
	color: white;
	text-shadow:-5px -5px 5px rgb(139, 6, 6);

}


.Cbtn:hover,.newBtn:hover{
	font-size: 40px;
}

/* タイトルUI */

.cartname{
   background: rgb(182, 1, 1); 
   font-size: 200%;
   font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
   color: white;
}


.ebtn{
	width: 180px;
	height: 80px;
	background:   url("../../assets/btn.png") no-repeat;
	background-size:  100%;
	font-size: 24px;
	border:none;
	color: white;
	text-shadow:-5px -5px 5px rgb(192, 2, 2);
	position: absolute;
	/* left: 200px; */
	top: 100px;
	left: 0px;
}
.ebtn:hover,.allBtn:hover{
	font-size: 32px;
}

.newBtn,.allBtn{
	width: 200px;
	height: 100px;
	background:   url("../../assets/btn.png") no-repeat;
	background-size:  100%;
	font-size: 24px;
	border:none;
	color: white;
	text-shadow:-5px -5px 5px rgb(139, 6, 6);
/* background: turquoise; */
	position:relative;

	top: -450px;
	
}
/* 
.btns{
  width: 300px;
    height:300px ;
  	position: absolute;

	top: -50px;
	left: 100px;
  background: greenyellow;

} */


.btnGroup{
  width: 500px;
    height:400px ;
  	position: absolute;

	top: 100px;
	left: 480px;
 
}


.btnBack{
    width: 500px;
    height:500px ;
    /* background: greenyellow; */
	background:   url("../../assets/bagua.png") no-repeat; 
	background-size:  100%;
  opacity: 0.9;
  position:relative;
  	animation:rotating 60s linear infinite
    
	/* -webkit-animation:rotating 5s infinite;  */
}

@keyframes rotating{
from{transform:rotate(0)}
to{transform:rotate(360deg)}
}

</style>