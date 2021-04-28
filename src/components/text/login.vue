<template>
	<div id="login" class="background">
		<!-- タイトル -->
		<header class="top_bar">
		    <a onclick="window.history.go(-1)" class="icon_back"></a>
			<h3 class="cartname">ログイン</h3>
		    <div class="companyName">情報システム</div>
			<div class="photo1" ></div>
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
		    </div>
			 <!-- 新規ボタン -->
		    <div class="go_reg_box">
		    <button @click="goNew()" class="_new">新規</button>	
		    </div>
		    </div>
		</main>
	</div>
</template>

<script>
//import { mapMutations } from 'vuex';
import loginJs from '../js/login.js';
export default loginJs;
</script>

<style scoped src="../../components/css/login.css">
</style>