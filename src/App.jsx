import { useEffect, useState } from "react";
import "./App.css";
import BookTable from "./components/BookTable";
import Loader from "./components/Loader";

const API_URL = "https://openlibrary.org/search.json?q=the+lord+of+the+rings";
function App() {
  const [books, setBooks] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedBooks, setPaginatedBooks] = useState([]);
  const totalPages = Math.ceil(books.length / pageSize);
  const [loading, setLoading] = useState(true);

  // Functionality of fetching
  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        const booksData = data.docs.map((book) => ({
          title: book.title,
          author_name: book.author_name
            ? book.author_name.join(", ")
            : "Unknown",
          ratings_average: book.ratings_average!==undefined? parseFloat(book.ratings_average.toFixed(1)) : "N/A",
          first_publish_year: book.first_publish_year || "N/A",
          subject: book.subject ? book.subject.join(", ") : "N/A",
          author_birth_date: book.author_birth_date || "N/A",
          author_top_work: book.author_top_work || "N/A",
        }));
        setBooks(booksData);
        setPaginatedBooks(booksData.slice(0, pageSize));
        setLoading(false);
      });
  }, []);

  // Functionality of handling page size
  const handlePageSizeChange = (e) => {
    let newSize = e.target.value;
    setPageSize(newSize);
    setCurrentPage(1);
    setPaginatedBooks(books.slice(0, newSize));
  };

  //  Functionality of handling page change
  const handlePageChange = (page) => {
    // console.log(page)
    setCurrentPage(page);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    setPaginatedBooks(books.slice(startIndex, endIndex));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1>Dashboard Table</h1>
          <BookTable data={paginatedBooks} />
          <div className="pagination">
            <button
              id="prevPage"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1 || totalPages === 1}
            >
              Previous
            </button>
            <span id="pageInfo">
              {currentPage} of {totalPages}
            </span>
            <button
              id="nextPage"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || totalPages === 1}
            >
              Next
            </button>
            <select
              id="pageSize"
              value={pageSize}
              onChange={handlePageSizeChange}
            >
              <option value="10">Show 10</option>
              <option value="50">Show 50</option>
              <option value="100">Show 100</option>
            </select>
          </div>
        </>
      )}
    </>
  );
}

export default App;
