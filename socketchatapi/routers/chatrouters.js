const express =require('express')
const { chatController } = require ('../controllers')

const router = express.Router()

router.get('/getmessages', chatController.getMessages)
router.post('/sendmessages', chatController.sendMessages)
router.delete('/clearmessages',chatController.clearMessages)

module.exports=router