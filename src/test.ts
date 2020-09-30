type Arr = {
    one: number,
    two: number
}

let arr1: Arr | undefined;;
arr1 = {
    one: 1,
    two: 2
}
arr1.one = 1;
arr1.two = 2;
console.log(arr1);
let arr = {
    one: 1,
    two: 2
};

let arr2 = {
    ...arr,
    two: 3
}

console.log(arr2);