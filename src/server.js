
let first = (size, ...args) => [...args].slice(0, size);

export default first;

console.log(first(2,1,2,3));
