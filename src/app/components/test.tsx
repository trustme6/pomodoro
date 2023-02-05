const showNameClasssic = (name, surname) => {
    console.log(`${name} ${surname}`);
}

showNameClasssic("pidor", "sasha");
showNameClasssic("slut", "natasa");
showNameClasssic("gay", "valeriy");

const showNameComplex = (name, surname, something, middleName, phone, dateOfBirth) => {
    console.log(name);
    console.log(surname);
    console.log(something);
    console.log(middleName);
    console.log(phone);
    console.log(dateOfBirth);
};

showNameComplex("misha", "sidorov", "something" , "mikhailovich", "88005553535", "26/12/1997");

const showNameObject = (props) => {
    console.log(props.name);
    console.log(props.surname);
    console.log(props.something);
    console.log(props.middleName);
    console.log(props.phone);
    console.log(props.dateOfBirth);
};

showNameObject({
    name: "misha", 
    surname: "sidorov",
    something: "something" , 
    middleName: "mikhailovich",
    phone:  "88005553535", 
    dateOfBirth: "26/12/1997"
});


const ShowName = (props) => {
    return <div>{props.name}</div>
};


const App = () => {

    return <div>
        <ShowName name="misha"/>
    </div>
}


interface ICharacteristic {
    attack: number;
    health: number;
}

interface IHero {
    name: string;
    surname: string;
    isAvenger: boolean;
    characteristic: ICharacteristic;
}

const hero: IHero = {
    name: "tony",
    surname: "stark",
    isAvenger: true,
    characteristic: {
        attack: 10,
        health: 10
    }
};


const heroes: Array<IHero> = [{
    name: "tony",
    surname: "stark",
    isAvenger: true,
    characteristic: {
        attack: 10,
        health: 10
    }
}, {
    name: "hulk",
    surname: "-",
    isAvenger: true,
    characteristic: {
        attack: 20,
        health: 20
    }
}, {
    name: "peter",
    surname: "parker",
    isAvenger: true,
    characteristic: {
        attack: 10,
        health: 15
    }
}];

const numbers = [10,2, 1];


const showHeroes = (dasdas: Array<IHero>) => {
    dasdas.forEach(element => {
    console.log(element);
  });  
};

showHeroes(heroes);