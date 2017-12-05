class Person {
    constructor (name = 'anonymous', age= 0){
        this.name = name;
        this.age = age;
    }
    getGreeting(){
        return `Hi I am ${this.name}.`;
    }
    getDescriptoin(){
        return `Hi! I am ${this.name} & I am ${this.age} years old.`;
    }
}

class Student extends Person {
    constructor (name,age,major){
        super(name, age);
        this.major = major;
    }
    hasMajor(){
        return !!this.major;
    } 
    getDescriptoin(){
        let description = super.getDescriptoin();
        
        if (this.major){
            description += ` My major is ${this.major}.`;
        }

        return description;
    }
}

class Traveler extends Student {
    constructor (name, age, major, location){
        super(name, age, major);
        this.location = location;
    }
    getGreeting(){
        let greeting = super.getGreeting();
        if(this.location){
            greeting += ` My location is ${this.location}.`;
        }
        return greeting;
    }
}

const me = new Traveler('Fazle Rabbi', 24, 'Computer Science', 'Dhaka');
console.log(me.getGreeting());

const another = new Traveler(undefined,undefined,undefined,'Nowhere');
console.log(another.getGreeting());
console.log(another);