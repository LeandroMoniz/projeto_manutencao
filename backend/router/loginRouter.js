const router = require('express').Router()

const loginController = require('../controllers/loginController')

// middleware
const verifyToken = require('../helpers/verify-token')
const { imageUpload } = require('../helpers/image-upload')

router.post('/register', loginController.register)
router.post('/login', loginController.login)
router.get('/checkuser', loginController.checkUser)
router.get('/:id', loginController.getUserById)
router.patch('/edit/:id', verifyToken, imageUpload.single('image'), loginController.editUser)


module.exports = router