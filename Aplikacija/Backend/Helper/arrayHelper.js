module.exports = { 
    unwind(array) { 
        // tag = { 
        //     name: tagName
        // }
        console.log('array:',array);
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