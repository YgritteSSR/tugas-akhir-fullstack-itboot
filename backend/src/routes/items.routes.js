const router = require("express").Router();
const { authenticate } = require("../middlewares/auth.middleware");
const {
  createItem,
  getItems,
  getMyItems,
  updateItem,
  deleteItem,
  resetItemsSequence
} = require("../controllers/items.controller");

router.get("/", authenticate, getItems);

router.get('/my-items', authenticate, getMyItems);

router.post("/", authenticate, createItem);

router.put("/:id", authenticate, updateItem);

router.delete("/:id", authenticate, deleteItem);

router.post("/reset-sequence", authenticate, resetItemsSequence);

module.exports = router;

