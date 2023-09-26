import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://localhost:5555/books")
      .then((res) => {
        setBooks(res.data.books);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold my-8">Books List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky=800 text-4xl" />
        </Link>
      </div>
      {isLoading ? (
          <Spinner />
        ) : (
            <table className="w=full border-separate border-spacing-2">
                <thead>
                    <tr>
                        <th className="px-4 py-2">No</th>
                        <th className="px-4 py-2">Title</th>
                        <th className="px-4 py-2">Author</th>
                        <th className="px-4 py-2">Publish Year</th>
                        <th className="px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {books?.map((book, index) => (
                        <tr key={book._id}>
                            {console.log(book._id)}
                            <td className="px-4 py-2">{index + 1}</td>
                            <td className="px-4 py-2">{book.title}</td>
                            <td className="px-4 py-2">{book.author}</td>
                            <td className="px-4 py-2">{book.publishYear}</td>
                            <td className="px-4 py-2">
                                <Link to={`/books/edit/${book._id}`}>
                                    <AiOutlineEdit className="text-sky=800 text-4xl" />
                                </Link>
                                <Link to={`/books/delete/${book._id}`}>
                                    <MdOutlineDelete className="text-sky=800 text-4xl" />
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
      )}
    </div>
  );
};

export default Home;
