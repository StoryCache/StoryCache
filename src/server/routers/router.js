const express = require("express")
const booksController = require("../controllers/bookController")

const router = express.Router()

router.get("/", booksController.getBooks, (_req, res) => {
  res.status(200).json(res.locals.books)
})

router.post("/", booksController.postBooks, (_req, res) => {
  res
    .status(200)
    .json({ message: "In the enchanted archives, your tome now rests." })
})

router.put("/", booksController.putBooks, (_req, res) => {
  res
    .status(200)
    .json({
      message:
        "In the mystical ledger, your bond with the tome has been magically transformed!",
    })
})

router.delete("/", booksController.deleteBooks, (_req, res) => {
  res
    .status(200)
    .json({
      message:
        "With a whisper of magic, the tome vanished from the ancient scrolls.",
    })
})

module.exports = router
