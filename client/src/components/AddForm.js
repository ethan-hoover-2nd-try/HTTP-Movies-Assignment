import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

const UpdateForm = (props) =>{
    const history = useHistory();

    const [movieInfo, setMovieInfo] = useState(
        {
            title: '',
            director: '',
            metascore: 0,
            stars: [],
        }
    );

    const handleChange = e =>{
        setMovieInfo({...movieInfo, [e.target.name] : e.target.value});
    };


    const handleSubmit = e =>{
        e.preventDefault();
        let movieDataObject = {
            title: movieInfo.title,
            director: movieInfo.director,
            metascore: movieInfo.metascore,
            stars: movieInfo.stars.split(','),
        }

        axios.post(`http://localhost:5000/api/movies`, movieDataObject)
        .then(res =>{
            setMovieInfo(
                {
                    title: '',
                    director: '',
                    metascore: 0,
                    stars: '',
                }
            );
            history.push(`/`);
        }).catch(error => console.log(error));

        
    };

    return (
        <form className="add-form" onSubmit={handleSubmit}>
            <h2>Add Movie to the Database</h2>
            <label htmlFor='title'>
                Title: <input type='text' name='title' id='title' placeholder='title' value={movieInfo.title} onChange={handleChange} />
            </label>

            <label htmlFor='director'>
                Director: <input type='text' name='director' id='director' placeholder='director' value={movieInfo.director} onChange={handleChange} />
            </label>

            <label htmlFor='metascore'>
                Metascore: <input type='text' name='metascore' id='metascore' placeholder='metascore' value={movieInfo.metascore} onChange={handleChange} />
            </label>

            <label htmlFor='stars'>
                Stars: <input type='text' name='stars' id='stars' placeholder='stars' value={movieInfo.stars} onChange={handleChange} />
            </label>

            <button type="submit">Add Movie</button>
        </form>
    );
};

export default UpdateForm;