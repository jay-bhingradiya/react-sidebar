import React from 'react';
import Sidebar from 'react-sidebar';
import {useState} from 'react';
import MovieForm from './MovieForm';

const moviesData = [
  {
    id: 1,
    name: 'Inception',
    rating: 4.8,
  },
  {
    id: 2,
    name: 'Drishyam',
    rating: 4.2,
  },
  {
    id: 3,
    name: 'The Star Trek',
    rating: 4.5,
  },
];

const SidebarComponent = ({children}) => {
  const [showSidebar, setshowSidebar] = useState (false);
  const [movies, setMovies] = useState (moviesData);
  const [editMode, setEditMode] = useState ({
    isOn: false,
    movie: null,
    name: '',
  });

  const editHandler = id => {
    const editMovie = moviesData.find (movie => movie.id === id);

    setEditMode ({
      isOn: true,
      movie: editMovie,
    });
    setshowSidebar (true);
  };

  const editMovie = movieData => {
    let newList = [...movies];
    let updatedMovie = newList.find (movie => movie.id === editMode.movie.id);
    let updatedMovieIndex = newList.findIndex (
      movie => movie.id === editMode.movie.id
    );

    updatedMovie = movieData;
    newList[updatedMovieIndex] = updatedMovie;

    setMovies (newList);
    setEditMode ({
      isOn: false,
      movie: {},
    });
    setshowSidebar (false);
  };

  const deleteHandler = id => {
    let updatedMovie = movies.filter (movie => movie.id !== id);
    setMovies (updatedMovie);
  };

  const addMovie = movieData => {
    setMovies ([
      ...movies,
      {
        id: Math.random (),
        ...movieData,
      },
    ]);
    setshowSidebar (false);
  };

  const setOpenHandler = (data = false) => {
    setEditMode ({
      isOn: false,
      movie: {},
    });
    setshowSidebar (data);
  };

  return (
    <Sidebar
      sidebar={
        <MovieForm
          editMovie={editMovie}
          addMovie={addMovie}
          editMode={editMode}
          closeSidebar={setOpenHandler}
        />
      }
      open={showSidebar}
      onSetOpen={data => setOpenHandler (data)}
      pullRight={true}
      sidebarClassName={'sidebarContentMain'}
    >
      <table border={1} cellPadding={0} cellSpacing={0}>
        <thead>
          <tr>
            <th>Movie Name</th>
            <th>Rating</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {movies.map (movie => (
            <tr key={movie.id}>
              <td>{movie.name}</td>
              <td>{movie.rating}</td>
              <td>
                <button onClick={() => editHandler (movie.id)}>Edit</button>
                <button onClick={() => deleteHandler (movie.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => setshowSidebar (true)}>
        Add Movie
      </button>
    </Sidebar>
  );
};

export default SidebarComponent;
