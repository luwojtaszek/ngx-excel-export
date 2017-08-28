export class Person {
    id: number;
    name: String;
    surname: String;
    age: number;
}


export const PERSONS: Person[] = [
    {
        id: 1,
        name: 'Very long name which needs to be wrapped',
        surname: 'Novicky',
        age: 21
    },
    {
        id: 2,
        name: 'Another long name that won\'t be wrapped',
        surname: 'Tracz',
        age: 12
    },
    {
        id: 3,
        name: 'Steve',
        surname: 'Laski',
        age: 38
    }
];
