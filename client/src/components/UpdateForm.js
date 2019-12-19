import React, {useState, useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import axios from 'axios';

const UpdateForm = (props) =>{
    const history = useHistory();
    let {id} = useParams();

    const [movieInfo, setMovieInfo] = useState(
        {
            id:id,
            title: '',
            director: '',
            metascore: 0,
            stars: [],
        }
    );

    useEffect(()=>{
        axios.get(`http://localhost:5000/api/movies/${id}`)
        .then(res =>{
            setMovieInfo(res.data);
        }).catch(error => console.log(error));
    },[id]);

    const handleChange = e =>{
        setMovieInfo({...movieInfo, [e.target.name] : e.target.value});
    };


    const handleSubmit = e =>{
        e.preventDefault();
        let movieDataObject = {
            id: id,
            title: movieInfo.title,
            director: movieInfo.director,
            metascore: movieInfo.metascore,
            stars: (typeof(movieInfo.stars) === 'object' ) ? movieInfo.stars : movieInfo.stars.split(','),
        }

        axios.put(`http://localhost:5000/api/movies/${id}`, movieDataObject)
        .then(res =>{
            setMovieInfo(
                {
                    id:id,
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
        <form className="update-form" onSubmit={handleSubmit}>
            <h2>Update Movie in the Database</h2>
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

            <button type="submit">Update Movie</button>
        </form>
    );
};

export default UpdateForm;