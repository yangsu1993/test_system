<template>
		<div class="background">
    	<!-- タイトル -->
		<header class="top_bar">
		    <a onclick="window.history.go(-1)" class="icon_back"></a>
		    <h3 class="cartname">社員情報新規</h3>
			<button @click="jump()" class="jbtn">戻る</button>
			<button @click="edit()" class="ebtn">ログアウト</button>
		</header>

		<!-- 社員データ新規 -->
		<main class="user_login_box">
		    <div class="login_dialog">
				
				<!-- 左側のデータ -->
				<div class="eara1">
				<!-- 社員番号：1-7桁（マイナスTJで5桁） -->
				<div class="_userid">
				<span style="color:red;">* </span>社員番号：
		        <input type="text" name="id"  placeholder="数字とアルファベットのみ" class="id" v-on:input="check_word($event)" v-model="id"  maxlength="7" >
		        </div>
				<!-- 社員番号　警告枠 -->
				<p id="id" class="id_t"></p>
				<div style="margin-top:10%;"></div>

				<!-- 名前：1-15桁 -->
		        <div class="_username">
				<span style="color:red;">* </span>名前：
		         <input type="text" name="names" placeholder="漢字とひらがな/アルファベット" class="names" v-model="names"  v-on:input="check_word($event)" maxlength="15">
		       	</div>
				<!-- 社員番号　警告枠 -->   
				<p id="names" class="names_t"></p>	
				<div style="margin-top:10%;"></div>

				<!-- ふりがな：1-15桁 -->
                 <div class="_username_furigana">
				<span style="color:red;">* </span>フリガナ：
		        <input type="text" name="name_furigana" placeholder="カタカナ(15位以内)" class="name_furigana" v-on:input="check_word($event)" v-model="name_furigana" maxlength="15">
				</div>
				<!-- ふりがな　警告枠 --> 
				<p id="name_furigana" class="furigana_t"></p>	
				<div style="margin-top:10%;"></div>
						
				<!-- 入社年月日：yyyy-mm-dd -->		
				<div class="block1">
				<span class="demonstration">
				<span style="color:red;">* </span>入社年月日：</span>
				<el-date-picker class="join_date" 
								v-model="join_date"
								align="right"
								type="date"
								placeholder="日付を選択"
								format="yyyy-MM-dd"
								:picker-options="pickerOptions">
				</el-date-picker>
				</div>
				<!-- 入社年月日　警告枠 --> 
				<p id="join_date" class="joindate_t"></p>
				</div>
                 
				<!-- 右側のデータ -->
				<div class="eara2">
				<!-- 資格 -->		
				<div class="_get_cre">資格：
		        <input  type="text" name="get_cre" placeholder="資格(20桁以内)"  class="get_cre" v-model="get_cre" v-on:input="cre_check($event)"   maxlength="20">
		        </div>
				<!-- 資格　警告枠 --> 
				<p id=" get_cre" class="getcre_t"></p>
				<div style="margin-top:10%;"></div>

				<!-- 資格獲得日付 -->	
				<div class="_cre_date">
				<span class="demonstration">資格獲得日付：</span>
				<el-date-picker class="cre_date"
								v-model="cre_date"
								align="right"
								type="date"
								placeholder="日付を選択"
								format="yyyy-MM-dd"
								v-on:input="date_check()"
								:disabled="disabled"
								:picker-options="pickerOptions">
				</el-date-picker>
				</div>
					<!-- 資格　警告枠 --> 
				<p id="cre_date" class="credate_t"></p>
				<div style="margin-top:10%;"></div>

				<!-- ボーナス獲得日付 -->	
				<div class="_bonus_date">
				<span class="demonstration">ボーナス獲得日付：</span>
				<el-date-picker class="bonus_date"
								v-model="bonus_date"
								align="right"
								type="date"
								placeholder="日付を選択"
								format="yyyy-MM-dd"
								:picker-options="pickerOptions">
				</el-date-picker>
				</div>
				</div>
				
		        <!-- 提出ボタン -->
		        <div class="login_box">
		        <button @click="pushIn()" class="btn" :disabled="btnDisabled">提出</button>
		        </div>	
		    </div>
		</main>
	</div>
</template>

<script>
import dataAdd from '../../components/js/data_add.js';
export default dataAdd;
</script>

<style scoped src="../../components/css/data_add.css"></style>