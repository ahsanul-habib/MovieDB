"use client";

import { getWatchList, removeFromWatchList } from "@/actions/watchlist";
import { useAuth } from "@/providers/AuthProvider";
import { useState, useEffect } from "react";
import CardSkeleton from "./CardSkeleton";
import Link from "next/link";
import MovieCard from "./MovieCard";
import { toast } from "react-toastify";

const WatchList = () => {
  const { id: AuthID } = useAuth() || {};
  const [watchList, setWatchList] = useState(null);

  const handleRemove=async (movieID)=>{
          await toast.promise(
            (async () => {
              const result = await removeFromWatchList(AuthID,movieID);
              if (result.success) {
                setWatchList(prev=>prev.filter((each)=>each.id!=movieID));
              } else {
                throw new Error(result.message || "Failed sign in...");
              }
              return result;
            })(),
            {
              pending: "Removing from watchlist... ⏳",
              success: {
                render({ data }) {
                  return data?.message || "Removed from watchlist successfully! 🎉";
                },
              },
              error: {
                render({ data }) {
                  return data?.message || "Failed to remove from watchlist... 😢";
                },
              },
            }
          );
  }

  useEffect(() => {
    let isMounted=true;
    const fetchWatchList = async () => {
      if (AuthID) {
        const response = await getWatchList(AuthID);
        if (response.success&&isMounted) {
          setWatchList(response.watchList);
        } else {
          setWatchList([]);
        }
      }
    };

    fetchWatchList();

    return ()=>{
      isMounted=false;
    }
  }, [AuthID]);

  return (
    <div className="container mx-auto pt-24 pb-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-white">Watch Later</h1>
        <p className="text-light/70 mt-2">
          Movies you&apos;ve saved to watch in the future
        </p>
      </header>

      {!AuthID ? (
        <div className="w-full flex justify-center items-center">
          <span>Please login to see your saved movies</span>
        </div>
      ) : (
        <div id="watchLaterList" className={`${(watchList!==null&&watchList.length===0) ||"grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6" } `}>
          {watchList === null ? (
            <>
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </>
          ) : watchList.length > 0 ? (
            watchList.map((movie) => (
              <MovieCard key={movie.id} movie={movie} handleRemove={handleRemove}/>
            ))
          ) : (
            <div className="text-center py-16">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-24 w-24 mx-auto text-moviedb-gray mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                />
              </svg>
              <h2 className="text-2xl font-bold text-light mb-2">Your Watch Later list is empty</h2>
              <p className="text-light/70 mb-6">Explore movies and add them to your list to watch later</p>
              <Link href="/" className="bg-primary text-dark px-6 py-2 rounded-full hover:bg-primary/80 transition">
                Explore Movies
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WatchList;
