const firstObject = {id: 0, firstName: 'John', lastName: 'Smith', age: 77 };
const {age, ...secondObject} = firstObject;

console.log(firstObject);
console.log(secondObject);