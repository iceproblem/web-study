//给你一个 m x n 的整数网格 accounts ，其中 accounts[i][j] 是第 i 位客户在第 j 家银行托管的资产数量。
//返回最富有客户所拥有的 资产总量。

//最富有的人
var maxV = 0;
var maxC = 0;
var sum = 0;
//初始化一维数组
var arrI = []
for(let i = 0; i < 10; i++){
     arrI[i] = i;
}
//初始化二位数组并赋值
for(let i = 0; i < 10; i++){
    for(let j = 0; j < 10; j++){
        arrI[i] = [];
        arrI[i][j]= Math.floor(Math.random()*1000 + 1);
        //累加每个人的值
        sum += arrI[i][j];
    }
    if(sum > maxV){
        maxV = sum;  
        maxC = i;
    }
    console.log("第" + i + "位：" + sum);
    sum = 0;
}    
//输出最富有的结果
console.log("最富有的人是第" + maxC + "位：" + "拥有财富：" + maxV);



