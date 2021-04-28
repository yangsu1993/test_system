<template>
	<div class="background">
			<!-- タイトル -->
		<header class="top_bar">
		    <a onclick="window.history.go(-1)" class="icon_back"></a>
		    <h3 class="cartname">新規登録</h3>
			<button @click="edit()" class="ebtn">戻る</button>
		</header>
		<!-- ユーザー新規 -->
		<main class="new_box">
		    <div class="new_dialog">

			<!-- ユーザー名：1-7桁 -->
            <div class="_userid">ユーザー名：
		    <input type="text" name="username" placeholder="ユーザーID" v-on:input="check_word($event)" class="id_input" v-model="username"  maxlength="7" >
		    <p id="username" class="username_t"></p>
			</div>
			<div style="margin-top:8%;"></div>

			<!-- 暗証番号：1-10桁 -->
            <div class=" _passwd">暗証番号：
		    <input type="password" name="password" placeholder="暗証番号"  v-on:input="check_word($event)" class="password_input" v-model="password"  maxlength="10" >
		    <p id="password" class="password_t"></p>
			</div>
			<div style="margin-top:8%;"></div>

			<!-- 暗証番号の再度入力：1-10桁 -->
		    <div class="_pwdage">再度入力：
		     <input type="password" name="passwd_ag" placeholder="暗証番号もう一度入力してください"  v-on:input="same_check()" class="password_again" v-model="password_ag"  maxlength="10" >
		    <p id="password_ag" class="pswag_t"></p>
			</div>
		    <div style="margin-top:8%;"></div>

			<!-- 提出ボタン -->
		    <div class="login_box">
		    <button @click="new_user_check()" class="btn">提出</button>
				
		    </div>
		    </div>
		</main>
	</div>
</template>

<script>
	 import dataNew from '../js/new.js';
export default dataNew;
</script>

<style scoped src="../../components/css/new.css"></style>