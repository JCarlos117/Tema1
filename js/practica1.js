class Person {
    constructor(firstname, lastname, age, gender, interests) {
        this.name = {
            firstname: firstname,
            lastname: lastname
        }

        this.age = age;
        this.gender = gender;
        this.interests = interests;

        this.getName = function () {
            return this.name.first + '' + this.name.last;
        }

        this.bio = function (){ 
            return 'I am'+this.age+'years old,'
            +this.gender+',and enjoy'+ this.interests[1];
        };


        this.greeting = function () {
            alert("Hi!" + this.name + "!");
        };
    }
}

var person1 = new Person('john','smith','32', 'male', ['music', 'skiing', 'reading']);

console.log(person1.name); // mostrar por consola
console.log(person1.age);
//person1.name;
person1.greeting();

var person2 = Object.create(person1);

class Professor extends Person {
    teaches ;

    constructor(name, teaches){
        super(name.first,name.last,45, 'female', ['math', 'physics']);
        this.teaches = teaches;
    
    }

    teachingBio(){
        return 'I am a professor, teaching'+this.teaches[0]+ '.';
    }
};

var person4 = new Professor('adrian','smith',[],['math', 'science']);