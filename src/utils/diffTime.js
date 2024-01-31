function diffTime(current, target) {
  var sub = Math.ceil((target - current) / 1000);

  var day = parseInt(sub / (60 * 60 * 24));
  var hour = parseInt((sub % (60 * 60 * 24)) / (60 * 60));
  var minute = parseInt((sub % (60 * 60)) / 60);
  var second = sub % 60;
  var obj = {
    days: day,
    hours: hour,
    minutes: minute,
    seconds: second,
  };
  return obj;
}

export default diffTime;
