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


