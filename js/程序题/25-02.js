let n= 0;
var coins = [];
for(let i = 0; i < 3;i++){
let random = Math.floor(Math.random()*10 + 1);
    coins[i] = random;
}
for(let i=0;i<coins.length;i++){
    if(coins[i]%2!==0){
        n+=(coins[i]+1)/2;
    }else{
        n+=coins[i]/2
    }
}
console.log(parseInt(n))
