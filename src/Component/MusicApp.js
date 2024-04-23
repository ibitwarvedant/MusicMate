import React, { useEffect, useState } from 'react';

export default function MusicApp() {
    const [tracks, setTracks] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const getTracks = async (e) => {
        setIsLoading(true);
        if (keyword !== '') {
            e.preventDefault();
        }

        let res = await fetch(`https://v1.nocodeapi.com/ganeshnalkol/spotify/HRjONmIekTwAHBlS/search?q=${keyword === "" ? "trending" : keyword}&type=track`);
        let data = await res.json();
        console.log(data);

        setTracks(data.tracks.items);
        setIsLoading(false);
    }                     

    useEffect(() => {            
        getTracks();          
    }, []);
        

    return (
        <>
            <nav className='navbar navbar-expand-md bg-dark navbar-dark'>
                <div className="container">
                    <a href='#' className='navbar-brand'>
                        <h3 className='text-info'><i className="fa-solid fa-music"></i> MusicMate</h3>
                    </a>
                    <button className='navbar-toggler' data-bs-toggle='collapse' data-bs-target='#navbarContent'>
                        <span className='navbar-toggler-icon'></span>
                    </button>
                    <div className='collapse navbar-collapse mt-md-0 mt-3' id='navbarContent'>
                        <form className='d-flex ms-auto' onSubmit={(e) => getTracks(e)}>
                            <input type='search' className='form-control me-3' placeholder='Search' value={keyword}
                                onChange={(e) => setKeyword(e.target.value)} />
                            <button className='btn btn-outline-info'>Submit</button>
                        </form>
                    </div>
                </div>
            </nav>

            <div style={{backgroundColor: 'rgb(208, 227, 238)'}}>   
                <div className="container pt-5">
                    <div className={`text-center ${isLoading ? "" : "d-none"} mb-4`}>
                        <span className='spinner-border'></span>
                    </div>
                    <div className="row gy-4">
                        {
                            tracks.map(val => {
                                return (
                                    <div className="col-lg-3 col-md-6" key={val.id}>
                                        <div className="card h-100">
                                            <img src={val.album.images[1].url} alt='Image' className='w-100 card-img-top' />
                                            <div className="card-body">
                                                <h5 className="card-title fw-bold">{val.name}</h5> 
                                                <p className='mb-0'>Artist : {val.album.artists[0].name}</p>
                                                <p className='card-text'>Release Date : {val.album.release_date}</p>
                                                <audio src={val.preview_url} controls className='w-100 rounded-0'></audio>
                                            </div>  
                                        </div>
                                    </div> 
                                )
                            })
                        }
                    </div>
                </div >
            </div>
        </>
    )
}