module.exports = { 
    unwind(array) { 
        let unwinded = []
        array.forEach(element => {
            unwinded.push(`'${element}'`)
        });
        return unwinded
    },
    unwindSet(set) { 
        return this.unwind(Array.from(set))

    }
}