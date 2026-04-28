const router = require('express').Router()
const { getUsers, getUserById ,deleteUser, updateUserRole } = require('../controllers/users.controller')
const { authenticate } = require('../middlewares/auth.middleware')
const { authorizeAdmin } = require('../middlewares/admin.middleware')
const { } = require('../controllers/users.controller')

router.get('/', authenticate, authorizeAdmin, getUsers)
router.get('/:id', authenticate, authorizeAdmin, getUserById)
router.delete('/:id', authenticate, authorizeAdmin, deleteUser)
router.put('/:id/role', authenticate, authorizeAdmin, updateUserRole)


module.exports = router
