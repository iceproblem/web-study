var s1 = 2;
var s2 = 1;
var o = 0;
var sum = 0;


for(var i = 0; i < 20; i++){

    sum += s1/s2;

    o = s2;
    s2 = s1;

    s1 = s1 + o;

}
console.log(sum);