//题目：求1+2!+3!+...+20!的和
var sum = 1;
var s = 1;
for(let i = 0; i < 20; i++){
    for(let j = 0;j < i+1; j++){
        s = s * (j+1);
    }
    
    sum += s;
    s = 1;
}
console.log(sum);