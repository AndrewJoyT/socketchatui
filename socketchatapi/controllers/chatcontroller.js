module.exports = {
    getMessages: (req,res) => {
        res.status(200).send(req.app.arrMsg)
    },
    sendMessages: (req,res) => {
        req.app.arrMsg.push(req.body)
        req.app.io.emit('chat message', req.app.arrMsg)
        res.status(200).send({message: 'send Message Success'})
    },
    clearMessages: (req,res) => {
        req.app.arrMsg = []
        req.app.io.emit('chat message', req.app.arrMsg)
        res.status(200).send({message: 'clear Message Success'})
    }
}