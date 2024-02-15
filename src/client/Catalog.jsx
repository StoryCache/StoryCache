import "./Catalog.css"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
// import DialogContentText from "@mui/material/DialogContentText"
import Button from "@mui/material/Button"
import Checkbox from "@mui/material/Checkbox"
import FormControlLabel from "@mui/material/FormControlLabel"
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    background: {
      paper: '#A67C00',
    },
    primary: {
      main: '#E9E3D0',
    },
    secondary: {
      main: '#E9E3D0',
    },
    text: {
      primary: '#E9E3D0',
    },
    typography: {
      fontFamily: 'Noto Serif Display',
    },
  }
})
const Catalog = () => {
  const [catalog, setCatalog] = useState([])
  const [alertOpen, setAlertOpen] = useState(false)
  const [focusBook, setFocusBook] = useState({})

  /** below handles getting the user's books from the database
   * and rendering
   */
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

  /** below handles the delete book request to the database */
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

  /** Below handles the own/have read/want to read options
   * as well as the put request to the database
   */
  const handleDialogOpen = (book) => {
    setAlertOpen(true);
    setFocusBook(book);
  }

  const handleOwnChange = book => {
    const newCatalog = [...catalog]
    newCatalog.forEach(item => {
      if (item.title === book.title) {
        item.own = item.own ? false : true
      }
    })
    setCatalog(newCatalog)
  }
  const handleReadChange = book => {
    const newCatalog = [...catalog]
    newCatalog.forEach(item => {
      if (item.title === book.title) {
        item.read = item.read ? false : true
      }
    })
    setCatalog(newCatalog)
  }
  const handleToReadChange = book => {
    const newCatalog = [...catalog]
    newCatalog.forEach(item => {
      if (item.title === book.title) {
        item.to_read = item.to_read ? false : true
      }
    })
    setCatalog(newCatalog)
  }

  const handlePutRequest = async book => {
    setAlertOpen(false)
    // const { own, read, to_read } = book
    console.log(book.own, book.read, book.to_read)

    // TODO write fetch request
    const options = {
      method: "PUT",
      body: JSON.stringify({
        gb_id: book.gb_id,
        own: book.own,
        read: book.read,
        to_read: book.to_read,
        rating: book.rating,
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
      console.error(`Error in updating book info ${error}`)
    }
    console.log("submit updated info to db")
  }

  return (
    <ThemeProvider theme={theme}>
    <div className="Catalog">
      <div>
        <Link to="/search">
          <button className="Search-Button">Search For A Book</button>
        </Link>
      </div>
      <h2>Catalog</h2>
      <div className="catalog-container">
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
              <button className="add-button" onClick={() => handleDialogOpen(book)}>
                More Options
              </button>
            </div>

            <Dialog
              open={alertOpen}
              onClose={() => setAlertOpen(false)}
              aria-describedby="More-book-options"
              maxWidth="xs"
              // sx={{color: '#A67C00'}}
            >
              <DialogContent>
                <FormControlLabel
                  value="own"
                  control={
                    <Checkbox
                      checked={focusBook.own}
                      onChange={() => handleOwnChange(focusBook)}
                    />
                  }
                  label="I own this book"
                  labelPlacement="end"
                />
                <br></br>
                <FormControlLabel
                  value="read"
                  control={
                    <Checkbox
                      checked={focusBook.read}
                      onChange={() => handleReadChange(focusBook)}
                    />
                  }
                  label="I have read this book"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="to_read"
                  control={
                    <Checkbox
                      checked={focusBook.to_read}
                      onChange={() => handleToReadChange(focusBook)}
                    />
                  }
                  label="I want to read this book"
                  labelPlacement="end"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => handlePutRequest(focusBook)}>Submit</Button>
              </DialogActions>
            </Dialog>
          </div>
        ))}
      </div>
    </div>
    </ThemeProvider>
  )
}

export default Catalog
