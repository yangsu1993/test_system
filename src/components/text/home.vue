<template>

<div class="my_l">
        
    <!-- //タイトル -->
		<header class="top_bar">
		    <a onclick="window.history.go(-1)" class="icon_back"></a>
		    <h3 class="cartname">情報検索</h3>
		</header>

      
       
     
		<main class="user_login_box">
		   
                <div  >
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
         <!-- 入力枠 -->
		    <input type="text" name="key" placeholder="キーワードを入力してください" class="key_input" v-model="key"/>
        <!-- 検索ボタン -->
		     
         <button @click="goCheck()" class="btn_login">検索</button>		 
                   
            <div class="graph">
            リスト
                  <el-button
                    @click.native.prevent="add_data()"
                    type="text"
                    size="big">
                    新規
                    </el-button>

                     <el-button
                    @click.native.prevent="add_all()"
                    type="text"
                    size="big">
                    全員リスト
                    </el-button>

            <div class="=table_data"> 
                <el-table
                :data="tableData"
                style="width: 100%"
                max-height="250"
                max-width="200"
                
                >
                
                <el-table-column
                fixed
                prop="id"
                label="ユーザーID"
                 sortable
               
                width="120">
                </el-table-column>
                <el-table-column
                prop="names"
                label="ユーザー名"
                width="120">
                </el-table-column>
                <el-table-column
                prop="furigana"
                label="フリガナ"
                width="120">
                </el-table-column>
                <el-table-column
                prop="join_date"
                label="入社年月日"
                sortable
                width="120">
                </el-table-column>
                <el-table-column
                prop="get_cre"
                label="資格"
                width="120">
                </el-table-column>

                 <el-table-column

                label="資格認定日付"
                width="140"
               prop="cre_date"
                sortable 
                >
                </el-table-column>

                <el-table-column
                prop="bonus_date"
                label="奨励金日付"
                 sortable
                width="120">
                </el-table-column>
                <el-table-column
                label="操作"
                :formatter="formatter"
                width="120"
                 prop="do" 
               >
                <template slot-scope="scope">
                    <el-button
                    @click.native.prevent="deleteRow(scope.$index,scope.row)"
                    type="text"
                    size="small">
                    削除
                    </el-button>

                    <el-button
                    @click.native.prevent="change_data(scope.$index,scope.row)"
                    type="text"
                    size="small">
                    修正
                    </el-button>
                </template>
     </el-table-column>
    </el-table>
            </div>
            </div>

     
  
		</main>

        <!-- Log out -->
          <div class="go_reg_box">
          <el-button @click.native.prevent="token_edit()" >ログアウト</el-button>
	     </div>
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

      token_edit(){
          localStorage.removeItem('Authorization');
          this.$router.push('/');
      },


            // 削除ボタン
      deleteRow(index, rows) {

          
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
								alert("削除した");
								break;
						}
              
					}).catch( err => {
						console.log(err);
					})

        this.tableData.splice(index, 1); 	

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
						console.log(err);
					})
      },

    // キーワードの入力判断
			goCheck:function(){
        let self = this;
        if(self.key == ''){
   
          alert('キーワードを入力してください');
        }else if(self.value==''){
          alert('検索項目を入力してください');
        }else{

          		self.$axios({
						method:'post',
						url: '/api/user/check',
						data: {
               key:self.key,
               tag:self.value
             
						}
					})	.then( res => {
            if (res.data == -1) {

              alert("結果がない");
            } else {
              //console.log(res);

              //self.join_date(type="date")

              self.tableData=res.data
             // console.log(self.tableData);     
            }
						// switch(res.data){
						// 	case 0:
            //     console.log(res);
            //     	alert("データを展示");
  

						// 		break;
						// 	case -1:
						// 		alert("結果がない");
						// 		break;
						// }
					}).catch( err => {
						console.log(err);
					})
        }
				
			}
		},

     mounted () { 
       //这个属性就可以，在里面声明初始化时要调用的方法即可
      // we can implement any method here like
      this.add_all()
    }

  }

  


</script>

<style scoped>
.graph{

  background: rgb(226, 226, 226); 
  
		position: absolute;
  top: 40%;
	left: 10%;
	/* transform: translate(-50%,-50%); */
}

 ._check{

      position: absolute;
  	top: 30%;
  	left: 23%;
  	transform: translate(-50%,-50%);

} 

.key_input{
    width: 25%;
    height: 6%;
    font-size: 130%;
      position: absolute;
  	top: 30%;
	left: 50%;
  	transform: translate(-50%,-50%);
}
.btn_login{
  width: 10%;
    height: 6%;
      position: absolute;
  	top: 30%;
	left: 72%;
  	transform: translate(-50%,-50%);
}

.cartname{
   background: rgb(151, 173, 245); 
   font-size: 200%;
}


</style>