//小A 和 小B 在玩猜数字。小B 每次从 1, 2, 3 中随机选择一个，小A 每次也从 1, 2, 3 中选择一个猜。
//他们一共进行三次这个游戏，请返回 小A 猜对了几次？
var arrA = [];
var arrB = [];
var sum = 0;
//生成a
for(let i = 0; i < 3;i++){
    let randomA = Math.floor(Math.random()*3 + 1);
    arrA[i] = randomA
}
console.log("A:" + arrA);
//生成b 判断A,B
for(let j = 0; j < 3;j++){
    let randomB = Math.floor(Math.random()*3 + 1);
    arrB[j] = randomB;
    //判断A,B
    if(arrA[j] == arrB[j]){
        sum++;
    }
}
console.log("B:" + arrB);
console.log("-------------------");
console.log("A,B相同的次数：" + sum);



