"use strict"
let ex3 = require ('./exercise3');
let Student = ex3.Student;
let FrStd = ex3.FrStd;
const fs = require('fs');
 

class Prom {

    constructor(){
        this.listprom = [];
    }

    add(student){
        this.listprom.push(student);
    }

    size(){
        return this.listprom.length;
    }

    get(i){
        return this.listprom[i];
    }

    print(){
    for (let i=0;i<this.size();i++){
        console.log(this.listprom[i].toString());
    }
    }
    write(){
    return JSON.stringify(this.listprom);
    }


    read(str){
    let newlist = JSON.parse(str);
    for (let i=0; i< newlist.length;i++){
        let object = newlist[i];
        let lastName = object[Object.keys(object)[0]];
        let firstName = object[Object.keys(object)[1]];
        let id =  object[Object.keys(object)[2]];
        let nat =  object[Object.keys(object)[3]];
        let frstudent = new FrStd(lastName,firstName,id,nat);
        this.add(frstudent);
    }
    }

    saveTo(fileName){
        let textJSON = this.write();
        fs.writeFileSync(fileName, textJSON);
    }

    readF(fileName){
        let fichier = fs.readFileSync(fileName);
        this.read(fichier);
    }

}

exports.Prom = Prom;