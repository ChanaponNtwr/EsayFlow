const router = require('express').Router()

router.use('/api/v1/notification', require('./notification.routes'))
router.use('/api/v1/menu', require('./menu.routes'))
router.use('/api/v1/ingredient', require('./ingredient.routes'))
router.use('/api/v1/Myingredient', require('./Myingredient.routes'))
router.use('/api/v1/member', require('./member.routes'))
router.use('/api/v1/product', require('./user.routes'))

module.exports = router