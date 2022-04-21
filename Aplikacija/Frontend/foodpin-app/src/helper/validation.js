export default { 
    validatePassword(password,repeatedPassword) { 
        if (password == null || password == "") {
            return 'Field "New password" not filled.'
        }
        if (repeatedPassword == null || repeatedPassword == "") {
            return "Field 'Repeat password' not filled."
        }
        if (password !== repeatedPassword) { 
            return "Passwords doesn't match."
        }
        return 'OK'
    },
    validateInput(input) { 
        if (input.value == null || input.value == "") { 
            return `Field ${input.name} cannot be empty.`
        } 
        return 'OK'
    }

}