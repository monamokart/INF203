"use strict"
function fibo_it(n){
    let f0 = 0;
    let f1 = 1;
    let fibo;
    if(n==0){
        return f0;
    }

    else if(n==1){
        return f1;
    }

    else {
    for (let pas = 1; pas < n; pas++)
    {
        fibo=f0+f1;
        f0 = f1;
        f1 = fibo;
    }
    return fibo;
}
}

function fibRec(n){
    if(n==0){
        return 0;
    }
    else if (n==1){
        return 1;
    }
    else{
        return fibRec(n-1)+fibRec(n-2);
    }
}

function fiboArr (a){
let b=[];
let len = a.length;
for(let i=0; i<len; i++ ){
    
b[i]=fibRec((a[i]));
}
return b;
}

function fibMap(a){
    return a.map(fibRec);
}



exports.fibo_it = fibo_it;
exports.fibRec = fibRec;
exports.fiboArr = fiboArr;
exports.fibMap = fibMap;