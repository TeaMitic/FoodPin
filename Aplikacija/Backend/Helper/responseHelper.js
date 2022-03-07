module.exports = { 
    OkResponse(content,res) { 
        try {
            res.status(200).send(content) 
        } catch (error) {
            console.log(error)
            throw error 
        }
    },
    ErrorResponse(error,res) { 
        try {
            res.status(500).send({name: error.name,message: error.message})
        } catch (error) {
            console.log(error)
            throw error 
        }
    },
    BadRequestResponse(content,res) { 
        try {
            res.status(400).send(content)
        } catch (error) {
            console.log(error)
            throw error 
        }
    },
    UnauthorizedResponse(content,res) { 
        try {
            res.status(401).send(content)
        } catch (error) {
            console.log(error)
            throw error 
        }
    }

}