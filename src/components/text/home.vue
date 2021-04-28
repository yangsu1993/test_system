<template>
        <div class="background">
        <!-- //タイトル -->
	    	<header class="top_bar">
		        <a onclick="window.history.go(-1)" class="icon_back"></a>
		        <h3 class="cartname">情報検索</h3>
            <button @click="edit()" class="ebtn">ログアウト</button>
	    	</header>
      
        <!-- 社員検索-->
		    <main class="user_login_box">

            <!-- 左側の二つボタン   -->
            <div class="btnGroup">
              <div class="btnBack"></div>
              <!-- 新規ボタン -->
              <button @click="add_data()"
                      type="text"
                      class="newBtn"> 新規</button>
              <div style="margin-top:2%;"></div>

              <!-- 全員リストボタン -->
              <button @click="add_all()"
                      type="text"
                      class="allBtn" >全員リスト</button>
            </div>

            <!-- 検索 -->
            <div class="findKey">
            <div>
            <!-- 検索入力枠 -->
            <input type="text" name="key" placeholder="キーワードを入力してください" class="key_input" v-model="key"  maxlength="25"/>
            </div>


            <div class="checkP">
            <!-- 項目選択肢 -->
            <el-select name="check" class="_check" v-model="value" placeholder="項目選択肢">
            <el-option 
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
            </el-select>
            </div>
                  
            <!-- 検索ボタン --> 
            <div class="CbtnP">
            <button @click="goCheck()" class="Cbtn">検索</button>		 
            </div>
            <div class="tattleF"></div>
            <div class="tattleW" >キーワード検索</div>
            </div>
                  
            <!-- 主なグラフ           -->
            <div class="graph" >.
            <div class="=table_data"> 
            <el-table
                  :data="tableData"
                  style="font-size: 20px"
                  max-height="500"
                  max-width="2000"
                  :row-style="{height:'60px'}">
            <el-table-column
                  fixed
                  prop="id"
                  label="ユーザーID"
                  sortable
                  width="200"
                  align="center"
                  header-align="center" >
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
                  header-align="center">
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
                  header-align="center">
            <template slot-scope="scope">
            <el-button
                  @click.native.prevent="deleteRow(scope.$index,scope.row)"
                  type="text">削除
            </el-button>
            <el-button
                  @click.native.prevent="change_data(scope.$index,scope.row)"
                  type="text">修正
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
 import dataHome from '../js/home.js';
export default dataHome;
</script>

<style scoped src="../../components/css/home.css"></style>