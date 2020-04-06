import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();



//
// // Array.map Great for rendering lists
// const colours = ['red', 'green', 'blue'];
// const items = colours.map(colour => '<li>${colour}</li>');
// console.log(items)
//
// // Destructuring
// const address = {
//     street: '',
//     city: '',
//     country: ''
// };
// const { street: st} = address;
//
// // Spread Operator
// const first = [1, 2, 3];
// const second = [4, 5, 6];
//
// const combined = [...first, 10, ...second];
// console.log(combined)
//
// const name = { name: 'Ben'}
// const job = { job: 'dev'};
//
// const combo = {...name, ...job, location: 'Hoboken'}
// console.log(combo)
//
// // Classes
// class Person {
//     constructor(name) {
//         this.name = name;
//     }
//
//     walk() {
//         console.log('walk');
//     }
// }
//
//     // extends allows classes to inherit methods/properties
// class Teacher extends Person {
//     constructor(name, degree) {
//         super(name);
//         this.degree = degree
//     }
//
//     teach() {
//         console.log('teach');
//     }
// }
//
// const teacher = new Teacher('Ben', 'masters');
// teacher.teach();
// teacher.walk();
//
//
//
