const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thoughtController');

// /api/thought
router.route('/').get(getThoughts).post(createThought);

// /api/thought/:thoughtId
router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// /api/thought/:reactionId/responses
router.route('/:thoughtnId/responses').post(addReaction);

// /api/thought/:reactionId/responses/:responseId
router.route('/:thoughtId/responses/:responseId').delete(removeReaction);

module.exports = router;
