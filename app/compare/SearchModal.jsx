import { useEffect, useState } from "react"
import SearchModalMovieSkeleton from "./SearchModalMovieSkeleton";
import useDebounce from "@/hooks/useDebounce";
import Image from "next/image";

const SearchModal = ({setIndexToSearchMovie, setMovieToCompare}) => {
    const [currentMovieList,setCurrentMovieList]=useState(null);
    const [searchTerm, setSearchTerm]=useState("");

    const updateMovieList = useDebounce((term) => {
      setCurrentMovieList(term);
    }, 500);

    const handleSetMovie=async (movieID)=>{
      setIndexToSearchMovie(null);
      await setMovieToCompare(movieID);
    }

    const handleSearch=async(e)=>{
      setSearchTerm(e.target.value);
      if(!e.target.value){
        const movieList=await fetch(`/api/movies/popular`,{cache: 'force-cache'});
        if(movieList){
            setCurrentMovieList(await movieList.json());
        }
      } else{
        const movieList=await fetch(`/api/movies/search?query=${e.target.value}`);
        if(movieList){
            updateMovieList(await movieList.json());
        }
      }
    }

    useEffect(()=>{
        let isMounted=true;
        const fetchMovieList=async ()=>{
            const movieList=await fetch(`/api/movies/popular`,{cache: 'force-cache'});
            if(movieList&&isMounted){
                setCurrentMovieList(await movieList.json());
            }
        }
        fetchMovieList();
        return (()=>{
            isMounted=false;
        })
    },[])
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
  <div className="bg-zinc-900 p-6 rounded-lg w-full max-w-2xl">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold">Search Movie</h2>
      <button onClick={()=>setIndexToSearchMovie(null)} className="text-gray-400 hover:text-white">✕</button>
    </div>
    <input type="text" value={searchTerm} onChange={handleSearch} placeholder="Type movie name..." className="w-full bg-zinc-800 text-white px-4 py-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-red-600" />
    <div className="max-h-96 overflow-y-auto">
      
      {
        currentMovieList===null && (
          <>
            <SearchModalMovieSkeleton/>
            <SearchModalMovieSkeleton/>
            <SearchModalMovieSkeleton/>
            <SearchModalMovieSkeleton/>
            <SearchModalMovieSkeleton/>
          </>
        )
      }

      {
        currentMovieList!==null && currentMovieList.length===0 && (<div>No movie found by the search name</div>)
      }


      {
       currentMovieList!==null && currentMovieList.map((movie)=>(
      <div key={movie.id} onClick={async()=>await handleSetMovie(movie.id)} className="flex items-center gap-4 p-2 hover:bg-zinc-800 cursor-pointer rounded">
        <Image height={96} width={64} src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} className="w-16 h-24 object-cover rounded" />
        <div>
          <h3 className="font-bold">{movie.title}</h3>
          <p className="text-sm text-gray-400">{movie?.release_date ? movie.release_date.slice(0,4): "No data"}</p>
        </div>
      </div>

        ))
      }

    </div>
  </div>
</div>
  )
}

export default SearchModal