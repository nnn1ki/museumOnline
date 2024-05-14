const Router = require('express');
const router = new Router();
const excursionController = require('../controllers/excursionController');

router.post('/', excursionController.create);
router.get('/', excursionController.getAll);
router.get('/:id', excursionController.getById);
router.delete('/:id', excursionController.deleteExcursion);
router.post('/id', excursionController.update);

module.exports = router;