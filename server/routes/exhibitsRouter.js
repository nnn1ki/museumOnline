const Router = require('express');
const router = new Router();
const exhibitsController = require('../controllers/exhibitsController');

router.post('/', exhibitsController.create);
router.get('/', exhibitsController.getAll);
router.get('/:id', exhibitsController.getById);
router.delete('/:id', exhibitsController.deleteExhibits);
router.post('/id', exhibitsController.update);

module.exports = router;