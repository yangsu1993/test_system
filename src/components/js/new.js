export default{
        data(){
        return{
            username:'',
            password:'',
            password_ag:'',
            regInfo:{}
            }
        },
        methods:{

        edit(){
            this.$router.push('/');
        },

        stringChange(word){  
            var tt = word.toString().trim();
            var yy = tt.toString().replace( /\s+/g, "　");
            return yy;
        },

        new_user_check(){
            const self = this;
            if(self.username != "" && self.password != "" && self.password_ag != ""){
            if(self.password !=self.password_ag){
                    //alert("暗証番号一致してない");
            this.$message({
                            type: 'warning',
                             message: '暗証番号一致してない'}); 
                }else{
                self.$axios({
                    method:'post',
                    url: '/api/user/add',
                    data: {
                        username : this.stringChange(self.username),
                        password : this.stringChange(self.password)
                    }
                })
                .then( res => {
                    switch(res.data){
                    case 0:
                        this.$message({
                            type: 'success',
                            message: '新規された'}); 
                            //alert("新規された");
                        this.$router.push("/")
                            break;
                    case -1:
                        this.$message({
                            type: 'warning',
                             message: 'ユーザー名存在された'}); 
                            //alert("ユーザー名もう存在している");
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
                }
            } else {
                if(self.username==""){
                        document.getElementById("username").innerHTML = "*空欄不可"
                }
                if(self.password==""){
                    document.getElementById("password").innerHTML = "*空欄不可"
                }
                if(self.password_ag==""){
                    document.getElementById("password_ag").innerHTML = "*空欄不可"
                }
                
            }
        },
           
        check_word(n){
            //提示栏内容
            var y = n.currentTarget.name;
            //输入栏内容
            var x =  n.currentTarget.value;
        
            if(x==""){ document.getElementById(y).innerHTML = "*空欄不可"}else{
            if(y=="username"){
                          //console.log((/[\u2E80-\uFE4F]+/).test(x));
                if((/[\u2E80-\uFE4F]+/).test(x)||(/[\uff61-\uff9f]+/).test(x)||(/[\u0000-\u002F\u003A-\u00ff]+/).test(x)||(/[\u00A4-\uFFE5]+/).test(x)){
                    document.getElementById(y).innerHTML = "*数字のみ"
                      //console.log(y);
                }else{
                    document.getElementById(y).innerHTML = ""
                 } 
            }else{
                    document.getElementById(y).innerHTML = ""
            }
             }
         },

        same_check(){
            if(this.password_ag==""){
                    document.getElementById("password_ag").innerHTML = "*空欄不可"
            }else{
                if(this.password==""){
                    document.getElementById("password_ag").innerHTML = "*先にパスワードを入力してください"
                    document.getElementById("password").innerHTML = "*空欄不可"
            }else{	
                if(this.password!=this.password_ag){
                    document.getElementById("password_ag").innerHTML = "暗証番号を一致してください"
            }else{
                    document.getElementById("password_ag").innerHTML = ""
                 }
                }
            }		
                           
         }

    }
    
}