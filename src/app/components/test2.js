// const { useEffect } = require("react");

// class Component extend ReactComponent {
//     componentDidMount() {
//         // request data from api
//     }

//     render() {
//         return 'This is component layout'
//     }
// }

// const FunctionalComponent = () => {
//     const [isOpened, setIsOpen] = useState(true);


//     useEffect(() => {
//          // request data from api
//     }, []);

//     return 'This is component layout'
// }

// const component = new Component();

// console.log(component.render())

const useState = (initialValue) => {
    let value = initialValue;

    const setter = (newValue) => {
        value = newValue;
    }

    return [value, setter]
}