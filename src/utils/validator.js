const nameValidator = (rule, value, callback, maxLength = 10) => {
  let temp = value.match(/\w+/g);
  let [rawLength, tempLength, totalLength] = [0, 0, 0];
  if (temp !== null) {
    temp.map((item) => {
      rawLength += item.length;
      tempLength += Math.round(item.length / 2);
    });
    totalLength = value.length - rawLength + tempLength;
  } else totalLength = value.length;
  if (!/^[\u4e00-\u9fa5_a-zA-Z0-9]+$/.test(value))
    callback(new Error("团队名只能由中文、英文字母、数字以及下划线组成"));
  else if (!(1 <= totalLength && totalLength <= maxLength))
    callback(new Error("团队名长度不能超过10个字符"));
  else callback();
};
export default nameValidator;
