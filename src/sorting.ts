type User = { id: string, name: string, age: number };

const users: User[] = [
    {id: 'dsdf2-sdfs-23', name: 'Kate', age: 26},
    {id: 'dsdf2-sdfs-22', name: 'Corey', age: 28},
    {id: 'dsdf2-sdsd-21', name: 'Bill', age: 34},
    {id: 'dsdf2-sdfs-20', name: 'Ashley', age: 32},
    {id: 'dsdf2-sdhs-19', name: 'Kurt', age: 27},
    {id: 'dsdf2-sbns-18', name: 'Molly', age: 30},
    {id: 'dsdf2-wefs-27', name: 'Polly', age: 33},
    {id: 'dfgf4-sdio-78', name: 'Farshid', age: 28},
    {id: 'dsdf2-klfs-89', name: 'Ding', age: 35}
]

users.push(
    {id: 'sdjh9-xclk-23', name: 'Kolya', age: 22},
    {id: 'dsdf5-wers-04', name: 'Polly', age: 30},
    {id: 'dtyf1-wyus-45', name: 'Polly', age: 35}
)


/*const getUsersByName = (usersArr: User[]) => {
    return [...usersArr].sort((u1, u2) => {
        const nameCompare = u1.name.localeCompare(u2.name)
        if (nameCompare !== 0) return nameCompare
        else return u1.age - u2.age
    })
}*/

type SortType = { fieldName: keyof User, direction: 'asc' | 'desc' }

const getSortedUsers = (usersArr: User[], ...sortBy: SortType[]) => {

    return [...usersArr].sort((u1, u2) => {
        for (const sort of sortBy) {
            let compareResult: number

            if (typeof u1[sort.fieldName] === 'string' && typeof u2[sort.fieldName] === 'string') {
                compareResult = u1[sort.fieldName].toString().localeCompare(u2[sort.fieldName].toString())
            } else if (typeof u1[sort.fieldName] === 'number' && typeof u2[sort.fieldName] === 'number') {
                compareResult = Number(u1[sort.fieldName]) - Number(u2[sort.fieldName])
            } else {
                compareResult = 0
            }

            const directionMultiplier = sort.direction === 'asc' ? 1 : -1

            if (compareResult !== 0) return compareResult * directionMultiplier
        }
        return 0
    })
}

console.log(getSortedUsers(users, {fieldName: 'name', direction: 'asc'}, {fieldName: 'age', direction: 'asc'}))