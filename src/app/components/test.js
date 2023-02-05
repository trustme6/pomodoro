class Animal {
    age;
    numberOfLimbs;

    constructor(age, numberOfLimbs) {
        this.age = age;
        this.numberOfLimbs = numberOfLimbs;
    }


    addYear() {
        this.age += 1;
    }
}

class Cat extends Animal {
    constructor(age) {
        super(age, 4)
    }

    purr() {
        console.log('purrrrrrrrrr');
    }

    addYear() {
        this.age += 2;
    }  
}

const dog = new Animal(10, 4);
const cat = new Cat(2);

console.log(cat);

