const express = require('express');
const router = express.Router();
const { bookController } = require("../controllers");
const auth = require("../middleware/auth");
const { route } = require('./user.route');

router.get("/list", bookController.getAllBooks);
router.get("/book/:id", bookController.getBook);

// Routes below this are protected
router.use(auth);
router.post("/create", bookController.createBook);
router.post("/update", bookController.updateBook);
router.delete("/delete", bookController.deleteBook);

module.exports = router;
