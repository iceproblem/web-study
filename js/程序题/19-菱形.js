//字符串
var str = "";

//1-4行
for(var i = 1; i < 5;i++ ){
    //*
    var s = "";

    //空格
    var e = " ";
    
    //每行输出的空格
    for(var j = 0; j < 5 - i - 1;j++){
        e += " ";
    }
    //每行输出的*
    for(var k = 0; k < 2 * i - 1;k++){
        s += "*"
    }
    str = str + e + s + "\n";
}
//5-7行
for(var i = 3; i > 0;i-- ){
    //*
    var s = "";

    //空格
    var e = " ";
    
    //每行输出的空格
    for(var j = 0; j < 5 - i - 1;j++){
        e += " ";
    }
    //每行输出的*
    for(var k = 0; k < 2 * i - 1;k++){
        s += "*"
    }
    str = str + e + s + "\n";
}
console.log(str);