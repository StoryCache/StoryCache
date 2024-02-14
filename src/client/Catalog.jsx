import "./Catalog.css"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const Catalog = () => {
  const [catalog, setCatalog] = useState([])

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

  return (
    <div className="Catalog">
      <div>
        <Link to="/search">
          <button className="Search-Button">Search For A Book</button>
        </Link>
      </div>
      <h2>Catalog</h2>
      <div className="card-container">
        {catalog.length}
        {catalog.map(book => (
          <div className="card" key={book.gb_id}>
            <h3 className="title">{book.title}</h3>
            <p>{book.authors}</p>
            <img src={book.img_url} alt="bookimg"></img>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Catalog
