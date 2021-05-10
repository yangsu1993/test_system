<template >

	<div id="login" class="background"  @click ="click_scene()" >
		
		<!-- タイトル -->
		<header class="top_bar">
		    <a onclick="window.history.go(-1)" class="icon_back"></a>
			<div class="appear">
					<div class="cloud_photo1" id="cloud_photo1"></div>
					<div class="bagua" id="bagua"></div>
					<div class="cloud_photo2" id="cloud_photo2"></div>
			</div>
			<h3 class="cartname">ログイン</h3>
		    <div class="companyName"></div>
			<div class="photo1" ></div>
			<div  class="system"></div>
			<div class="company_logo">
				<div class="c_mark"></div>
				<div class="c_name"> 株式会社天時情報システム</div>
				<div class="c_Tel"> TEL:03-5913-7230　　FAX:03-5913-7231</div>
				<div class="test"></div>
			</div>
		</header>
	
		<!-- ログイン -->
		<main class="login_box">
		    <div class="login_dialog">
			<!-- ユーザー名：1-7桁 -->
			<div class="_username">ユーザー名:
		    <input type="text" name="username" placeholder="ユーザー名を入力してください" v-on:input="check_word($event)" class="user_input" v-model="username" maxlength="7"/>
		    <p id="username" class="username_t"></p>
			</div>
			<!-- 暗証番号：1-10桁 -->
		    <div class=" _passwd">暗証番号:
		    <input type="password" name="password" placeholder="暗証番号を入力してください"  v-on:input="check_word($event)" class="password_input" v-model="password" maxlength="10"/>
		    <p id="password" class="password_t"></p>
			</div>
			
			 <!-- ログインボタン -->
		    <div class="login_box">
            <button @click="goLogin()" class="btn_login">ログイン</button>	
			<!-- goLogin()	            -->
		    </div>
			 <!-- 新規ボタン -->
		    <div class="go_reg_box">
		    <button @click=" goNew()" class="_new">新規</button>	
		    </div>
		    </div>
		</main>
		
		<div class="cloud" id="cloud">
			<div class="cloud_photo"></div>
		</div>
		
   		<div class="door" id="door">
			<div class="door_l">
				<div  class="door_l_photo1"></div>
                <div  class="door_l_photo2"></div>
                <div  class="door_lock"></div>
            </div>
			<div class="door_r">
				<div  class="door_r_photo1"></div>
                <div  class="door_r_photo2"></div>
                <div  class="door_key"></div>
            </div>
		</div>


	</div>




	
</template>

<script>
//import { mapMutations } from 'vuex';
import loginJs from '../js/login.js';
export default loginJs;
</script>

<style scoped src="../../components/css/login.css">
</style>