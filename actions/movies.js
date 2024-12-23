"use server"

const fetchOptions = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_Read_Token}`
    }
};

export async function getTrendingMovies(){
    const url = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';
    const movieData=await fetch(url,fetchOptions);
    return movieData.status===200 ? await movieData.json(): null;
}

export async function getTopRatedMovies(){
    const url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';
    const movieData=await fetch(url,fetchOptions);
    return movieData.status===200 ? await movieData.json(): null;
}

export async function getPopularMovies(){
    const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
    const movieData=await fetch(url,fetchOptions);
    return movieData.status===200 ? await movieData.json(): null;
}

export async function getMovieDetails(movieID){
    const url = `https://api.themoviedb.org/3/movie/${movieID}?language=en-US`;
    const movieData=await fetch(url,fetchOptions);
    return movieData.status===200 ? await movieData.json(): null;
}

export async function getMovieCastDetails(movieID){
    const url = `https://api.themoviedb.org/3/movie/${movieID}/credits?language=en-US`;
    const movieData=await fetch(url,fetchOptions);
    return movieData.status===200 ? await movieData.json(): null;
}

export async function getSimilarMovies(movieID){
    const url = `https://api.themoviedb.org/3/movie/${movieID}/similar`;
    const movieData=await fetch(url,fetchOptions);
    return movieData.status===200 ? await movieData.json(): null;
}

export async function getSearchResult(query){
    const url = `https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US`
    const movieData=await fetch(url,fetchOptions);
    return movieData.status===200 ? await movieData.json(): null;
}