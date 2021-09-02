
module.exports = {
  myLog(label, obj) {
    if (obj) {
      console.log(`${label}:`, JSON.stringify(obj, null, 2));
    } else {
      console.log(label);
    }
  }
}