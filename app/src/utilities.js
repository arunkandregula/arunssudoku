module.exports = new function(){
      this.generateRandomNumberBetweenMinAnMax = function(min, max){
        if(min > max) {
            var temp = min;
            min = max;
            max = temp;
        }
        var diff = max - min;
        return (min - 1) + Math.floor(Math.random()*(diff + 1)+1);
    };
}