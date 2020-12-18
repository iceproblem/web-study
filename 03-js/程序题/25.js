//题目： 桌上有 n 堆硬币，每堆的数量保存在数组 coins 中。
//我们每次可以选择任意一堆，只能拿走其中的一枚或者两枚，求拿完所有硬币的最少次数。

var flag = true;
//初始化硬币堆数组
var coins = [];
for(let i = 0; i < 3;i++){
    let random = Math.floor(Math.random()*30 + 1);
    coins[i] = random;
}
console.log("硬币堆：" + coins);
//判断硬币总数量
function sum(arr) {
    let s = 0;
    arr.forEach(function(val, idx, arr) {
        s += val;
    }, 0);
    if(s <= 0){
        flag = !flag;
    }
    return s;
};
sum(coins);
console.log(sum(coins));
console.log("------------");
var s = 1;
for(var i = 0;flag; i++){
    //随机选择堆
    let h =  Math.floor(Math.random()*3 + 1);
    //随机取走硬币数量
    let y =  Math.floor(Math.random()*2 + 1);
    if(coins[h] >=2 ){
        coins[h] - y;
        console.log("取走第" + h + "堆，" + y + "枚硬币");
    }
    sum(coins);

}




