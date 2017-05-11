class Number {
  static randInt(intStart, intEnd){
    return Math.round(Math.random() * (intEnd - intStart) + intStart);
  }

  static formatMoney(amount, ops = {}){
    var ops = Object.assign({
      "hasSeparator" : true,
      "separator" : ",",
      "currencySymbol" : "$"
    }, ops);
    amount = amount || 0;
    var amount = ("" + amount).replace(/\W+/,''),
      ret = "",
      c = 0,
      i;
    for( i = amount.length - 1; i >= 0; i-- ){
      if ( c++ === 3 ){
        ret = "," + ret;
        c = 1;
      }
      ret = amount.charAt(i) + ret;
    }
    ret = ops.currencySymbol + ret;
    return ret;
  }
}
export default Number;
