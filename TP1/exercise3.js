"use strict"

class Student {
    constructor(lastName,firstName,id){
        this.lastName=lastName;
        this.firstName=firstName;
        this.id = id;
    }

    toString(){
        let text ="student: "+ this.lastName + ", "+this.firstName+", "+new Number(this.id).toString()
        return text
    }

}

class FrStd extends Student{
    constructor(lastName,firstName,id,nationality){
        super(lastName,firstName,id);
        this.nationality=nationality;
    }

    toString(){ return super.toString()+", "+ this.nationality;}
}


exports.Student = Student;
exports.FrStd = FrStd;