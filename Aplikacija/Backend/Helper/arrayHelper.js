module.exports = { 
    unwind(array) { 
        let unwinded = []
        array.forEach(element => {
            unwinded.push(`'${element}'`)
        });
        return unwinded
    }
}