export default{
        data(){
        return{
            username:'',
            password:'',
            password_ag:'',
            click_btn:true,
            regInfo:{}
            }
        },
        methods:{

        edit(){
            this.click_btn=false;
            setTimeout(() => {
                this.$router.push('/');
         }, 100);
           
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
                            this.click_btn=false;
                            //1秒遅延
                            setTimeout(() => {
                                this.$router.push('/');
                         }, 100);
                            break;
                    case -1:
                        this.$message({
                            type: 'warning',
                             message: 'ユーザー名存在された'}); 
                           
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
                    document.getElementById(y).innerHTML = "*半角数字のみ"
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
				document.getElementById("new").appendChild(div);
				setTimeout(() => {
				   document.getElementById("new").appendChild(div_word);
			}, 200);
			 }
        },

    },
    mounted () { 
			
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