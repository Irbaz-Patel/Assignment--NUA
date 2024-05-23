import React, { useState } from "react";

const BookTable = ({ data }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  //   Functionality of sorting asc & dsc
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  const sortedData = () => {
    const sortableData = [...data];
    if (sortConfig !== null) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  };

  return (
    <table id="bookTable">
      <thead>
        <tr>
          <th
            onClick={() => requestSort("title")}
            className={getClassNamesFor("title")}
          >
            Title
          </th>
          <th
            onClick={() => requestSort("author_name")}
            className={getClassNamesFor("author_name")}
          >
            Author
          </th>
          <th
            onClick={() => requestSort("ratings_average")}
            className={getClassNamesFor("ratings_average")}
          >
            Ratings
          </th>
          <th
            onClick={() => requestSort("first_publish_year")}
            className={getClassNamesFor("first_publish_year")}
          >
            First Publish Year
          </th>
          <th
            onClick={() => requestSort("subject")}
            className={getClassNamesFor("subject")}
          >
            Subject
          </th>
          <th
            onClick={() => requestSort("author_birth_date")}
            className={getClassNamesFor("author_birth_date")}
          >
            Author Birth Date
          </th>
          <th
            onClick={() => requestSort("author_top_work")}
            className={getClassNamesFor("author_top_work")}
          >
            Author Top Work
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedData().map((book, index) => (
          <tr key={index}>
            <td>{book.title}</td>
            <td>{book.author_name}</td>
            <td>{book.ratings_average}</td>
            <td>{book.first_publish_year}</td>
            <td>{book.subject}</td>
            <td>{book.author_birth_date}</td>
            <td>{book.author_top_work}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BookTable;
