module.exports = {
    userToJson(userModel) {
        return Object.fromEntries(userModel._properties)
    }
}
