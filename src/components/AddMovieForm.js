import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

import axios from "axios";

const AddMovieForm = (props) => {
  const { push } = useHistory();
  const { id } = useParams();
  const { setMovies, movies } = props;
  const [newMovie, setNewMovie] = useState({
    title: "",
    director: "",
    genre: "",
    metascore: 0,
    description: "",
    id: `${Date.now()}`,
  });

  const handleChange = (e) => {
    setNewMovie({
      ...newMovie,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:9000/api/movies/`, newMovie)
      .then((res) => {
        console.log(res.data);
        setMovies(res.data);
        push(`/movies`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const { title, director, genre, metascore, description } = newMovie;

  return (
    <div className="bg-white rounded-md shadow flex-1">
      <form onSubmit={handleSubmit}>
        <div className="p-5 pb-3 border-b border-zinc-200">
          <h4 className="text-xl font-bold">
            Ekleniyor... <strong>{newMovie.title}</strong>
          </h4>
        </div>

        <div className="px-5 py-3">
          <div className="py-2">
            <label className="block pb-1 text-lg">Title</label>
            <input onChange={handleChange} name="title" type="text" />
          </div>
          <div className="py-2">
            <label className="block pb-1 text-lg">Director</label>
            <input onChange={handleChange} name="director" type="text" />
          </div>
          <div className="py-2">
            <label className="block pb-1 text-lg">Genre</label>
            <input
              value={genre}
              onChange={handleChange}
              name="genre"
              type="text"
            />
          </div>
          <div className="py-2">
            <label className="block pb-1 text-lg">Metascore</label>
            <input onChange={handleChange} name="metascore" type="number" />
          </div>
          <div className="py-2">
            <label className="block pb-1 text-lg">Description</label>
            <textarea onChange={handleChange} name="description"></textarea>
          </div>
        </div>

        <div className="px-5 py-4 border-t border-zinc-200 flex justify-end gap-2">
          <Link to={`/movies`} className="myButton bg-zinc-500">
            Vazgeç
          </Link>
          <button
            type="submit"
            className="myButton bg-green-700 hover:bg-green-600"
          >
            Ekle
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMovieForm;
