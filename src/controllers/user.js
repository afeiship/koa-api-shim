export default class{
  *user_index(inData) {
    const list = yield this.$http.get('http://v.juhe.cn/toutiao/index');
    return list.toJSON();
  }
}
