/**
 * 根据长度随机生成id
 * @param {*} num 长度
 */
function randomRangeId(num){
    var returnStr = "",
        charStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; 
    for(var i=0; i<num; i++){
        var index = Math.round(Math.random() * (charStr.length-1));
        returnStr += charStr.substring(index,index+1);
    }
    return returnStr;
}

/**
 * 随机生成id
 */
function createId() {
  return randomRangeId(10)
}