// sql语句
var sqlMap = {
    // 用户
    user: {
        select: 'select * from user',
        add: 'insert into user (userName,  userPass) values (?,?)'
    },
    pushin:{
        select: 'select * from pushin',
        add: 'insert into pushin (id , names , furigana , join_date , get_cre , cre_date , bonus_date) values (?,?,?,?,?,?,?)',
        delete: 'DELETE FROM pushin',
        update:'UPDATE pushin SET'
        //UPDATE `pushin` SET `id`='1',`names`='1111',`furigana`='asffef',`join_date`='2012-02-02',`get_cre`='',`cre_date`='',`bonus_date`='' WHERE id='1'
    },
    // home:{
    //     select: 'select * from pushin',
    // }


}

module.exports = sqlMap;
