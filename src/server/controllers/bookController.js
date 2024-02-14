const pool = require("../models/dbModel")

const booksController = {}

booksController.getBooks = async (req, res, next) => {
  console.log("entering getbooks middleware")
  const { ssid } = req.cookies
  console.log("running query with ssid ", ssid)
  try {
    // we will use these queries when cookies are set up on the front end:
    const queryText = `SELECT gb_id, isbn, title, author, img_url, own, read, to_read, rating FROM books WHERE user_id = $1; `
    const result = await pool.query(queryText, [ssid])
    // const queryText = `SELECT gb_id, isbn, title, author, img_url, own, read, to_read, rating FROM books; `
    // const result = await pool.query(queryText)
    //what does the data look like in results with a list of all books in the user's books db?
    console.log(result.rows)
    res.locals.books = result.rows
    return next()
  } catch (error) {
    return next({
      log: `Error happened at middleware booksController.getBooks ${error}`,
      message: { error: "gathering book information from database error" },
    })
  }
}

booksController.postBooks = async (req, res, next) => {
  // console.log("entering postBooks middleware")
  const { ssid } = req.cookies
  const { gb_id, isbn, title, author, img_url, own, read, to_read, rating } =
    req.body
  console.log(
    "server received ",
    gb_id,
    isbn,
    title,
    author,
    img_url,
    own,
    read,
    to_read,
    rating,
    ssid,
  )
  try {
    const queryText = `INSERT INTO books (gb_id, isbn, title, author, img_url, own, read, to_read, rating, user_id)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10); `
    const result = await pool.query(queryText, [
      gb_id,
      isbn,
      title,
      author,
      img_url,
      own,
      read,
      to_read,
      rating,
      ssid,
    ])
    console.log(result.rows[0])
    return next()
  } catch (error) {
    return next({
      log: `Error happened at middleware booksController.postBooks ${error}`,
      message: { error: "posting book information from database error" },
    })
  }
}

booksController.putBooks = async (req, res, next) => {
  const { ssid } = req.cookies
  const { gb_id, own, read, to_read, rating } = req.body

  try {
    const queryText = `UPDATE books SET own=$1, read=$2, to_read=$3, rating=$4 WHERE gb_id=$5 AND user_id=$6; `
    const result = await pool.query(queryText, [
      own,
      read,
      to_read,
      rating,
      gb_id,
      ssid,
    ])

    //what does the data look like in results with a list of all books in the user's books db?
    console.log(result.rows[0])
    return next()
  } catch (error) {
    return next({
      log: `Error happened at middleware booksController.putBooks ${error}`,
      message: { error: "updating book information from database error" },
    })
  }
}

booksController.deleteBooks = async (req, res, next) => {
  console.log('entering delete books middleware');
  const { ssid } = req.cookies
  const { gb_id } = req.body
  try {
    const queryText = `DELETE FROM books WHERE gb_id = $1 AND user_id=$2;`
    const result = await pool.query(queryText, [gb_id, ssid])

    //what does the data look like in results with a list of all books in the user's books db?
    console.log(result.rows[0])
    return next()
  } catch (error) {
    return next({
      log: `Error happened at middleware booksController.deleteBooks  ${error}`,
      message: { error: "deleting book information from database error" },
    })
  }
}

module.exports = booksController
