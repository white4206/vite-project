export function getFormatterDate(date) {
    // 获取当前月份
    let nowMonth = date.getMonth() + 1;
    // 获取当前是几号
    let strDate = date.getDate();
    // 添加分隔符“-”
    let separator = "-";
    // 对月份进行处理，1-9月在前面添加一个“0”
    if (nowMonth >= 1 && nowMonth <= 9) {
        nowMonth = "0" + nowMonth;
    }
    // 对月份进行处理，1-9号在前面添加一个“0”
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    // 最后拼接字符串，得到一个格式为(yyyy-MM-dd)的日期
    return date.getFullYear() + separator + nowMonth + separator + strDate;
}