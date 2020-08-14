// 补零
var  zero=(num)=>{
   return num<10 ? "0"+num:num
  }


//转换时间
//传入字符串和传入时间对象
export   let changetime = (ctime) => {
    var dateTime =typeof ctime=="string"? new Date(ctime):ctime;
 

    return dateTime.getFullYear() + "-" + zero(dateTime.getMonth()+1) + "-" + zero(dateTime.getDate()) + " " + zero(dateTime.getHours()) + ":" + zero(dateTime.getMinutes()) + ":" + zero(dateTime.getSeconds());
   

}
