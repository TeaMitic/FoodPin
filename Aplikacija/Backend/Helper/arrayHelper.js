module.exports = { 
    unwind(array) { 
        // tag = { 
        //     name: tagName
        // }
        let unwinded = []
        array.forEach(element => {
            unwinded.push(`'${element.name}'`)
        });
        return unwinded
    },
    unwindSet(set) { 
        return this.unwind(Array.from(set))

    }
}