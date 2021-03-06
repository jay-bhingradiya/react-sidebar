import { useState } from "react";
import { useEffect } from "react";
import FormInput from "./FormInput";

const MovieForm = ({ addMovie, editMode, editMovie, closeSidebar }) => {
  const [movieData, setMovieData] = useState({
    name: "",
    rating: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setMovieData({
      name: editMode.isOn ? editMode.movie.name : "",
      rating: editMode.isOn ? editMode.movie.rating : "",
    });
  }, [editMode]);

  const closeHandler = () => {
    beforeClose();
    setMovieData({
      name: "",
      rating: "",
    });
  };

  const beforeClose = () => {
    closeSidebar();
    setErrors({});
  };

  const onChangeHandler = (e) => {
    setMovieData({
      ...movieData,
      [e.target.name]: e.target.value,
    });

    let name = e.target.name;

    if (e.target.value === "") {
      setErrors({
        ...errors,
        [e.target.name]: `Enter Movie ${e.target.name}`,
      });
    } else {
      let newList = { ...errors };
      delete newList[name];
      setErrors(newList);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (Object.keys(errors).length !== 0) return;

    let err = {};
    if (!movieData.name) err.name = "Enter Movie name";
    if (!movieData.rating) err.rating = "Enter  Movie rating";
    setErrors(err);
    if (Object.getOwnPropertyNames(err).length !== 0) return;

    if (editMode.isOn) {
      editMovie({
        id: editMode.movie.id,
        ...movieData,
      });
    } else {
      addMovie(movieData);
    }

    setMovieData({
      name: "",
      rating: "",
    });
  };

  return (
    <div>
      <h3>Add Movie</h3>
      <h4>{editMode.isOn ? editMode.movie.name : "In Add Mode"}</h4>
      <form onSubmit={submitHandler}>
        <FormInput
          label="Movie Name"
          name="name"
          type="text"
          onChange={onChangeHandler}
          value={movieData.name}
          error={errors.name}
        />
        <FormInput
          label="Rating"
          name="rating"
          type="number"
          min="1"
          max="5"
          onChange={onChangeHandler}
          value={movieData.rating}
          error={errors.rating}
          step=".01"
        />
        <input type="submit" value="Submit" />
        <button onClick={beforeClose} type="button">
          Cancel
        </button>
      </form>
    </div>
  );
};

export default MovieForm;
