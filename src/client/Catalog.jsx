import "./Catalog.css"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import Button from "@mui/material/Button"
import Checkbox from "@mui/material/Checkbox"
import FormControlLabel from "@mui/material/FormControlLabel"

const Catalog = () => {
  const [catalog, setCatalog] = useState([])
  const [alertOpen, setAlertOpen] = useState(false)

  const fetchBooks = async () => {
    try {
      const response = await fetch("/api")
      const books = await response.json()
      console.log(books)
      if (response.ok) {
        setCatalog(books)
      }
    } catch (error) {
      console.error(`Error in getCatalog ${error}`)
    }
  }

  useEffect(() => {
    console.log("useEffect in effect")
    fetchBooks()
  }, [])

  const deleteBook = async book => {
    //post request
    //pass in gb id as req.body
    const options = {
      method: "DELETE",
      body: JSON.stringify({
        gb_id: book.gb_id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
    try {
      const response = await fetch("/api", options)
      const message = await response.json()
      if (response.ok) {
        fetchBooks()
        console.log(message)
      }
    } catch (error) {
      console.error(`Error in deleting book ${error}`)
    }
  }

  // const handleAlertOpen = (book) => {
  //   setAlertOpen(true);
  //   setFocusBook(book);
  // };

  const handlePutRequest = book => {
    setAlertOpen(false);
    console.log("submit new info to db")
  }

  return (
    <div className="Catalog">
      <div>
        <Link to="/search">
          <button className="Search-Button">Search For A Book</button>
        </Link>
      </div>
      <h2>Catalog</h2>
      <div className="card-container">
        {catalog.map(book => (
          <div className="card" key={book.gb_id}>
            <h3 className="title">{book.title}</h3>
            <p>{book.authors}</p>
            <img src={book.img_url} alt="bookimg"></img>
            <div>
              <button className="add-button" onClick={() => deleteBook(book)}>
                Delete
              </button>
            </div>
            <div>
              <button className="add-button" onClick={() => setAlertOpen(true)}>
                More Options
              </button>
            </div>
            <Dialog
              open={alertOpen}
              onClose={() => setAlertOpen(false)}
              aria-describedby="More-book-options"
            >
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  <FormControlLabel
                    value="own"
                    control={<Checkbox />}
                    label="I own this book"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="want"
                    control={<Checkbox />}
                    label="I want to read this book"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="read"
                    control={<Checkbox />}
                    label="I have read this book"
                    labelPlacement="end"
                  />
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => handlePutRequest(book)}>Submit</Button>
              </DialogActions>
            </Dialog>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Catalog
