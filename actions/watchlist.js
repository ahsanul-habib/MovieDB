"use server";
import dbConnect from "@/db/connectMongo";
import watchListModel from "@/models/watchlist";


export default async function addToWatchList(userID, movie) {
    try {
        if (!userID || !movie) {
            return { success: false, message: "User ID and movie data are required." };
        }

        await dbConnect();

        const watchList = await watchListModel.findOne({ userID });
        if (!watchList) {
            return { success: false, message: "WatchList not found for the user." };
        }

        const isMovieInWatchList = watchList.videoList.some(
            (item) => item.id?.toString() === movie.id?.toString()
        );

        if (isMovieInWatchList) {
            return { success: false, message: "Movie is already in the watchlist." };
        }

        watchList.videoList.push({
            id: movie?.id,
            title: movie?.title,
            poster_path: movie?.poster_path,
            release_date: movie?.release_date,
        });

        await watchList.save();

        return {
            success: true,
            message: "Movie added to watchlist successfully."
        };
    } catch (error) {
        console.error("Error in addToWatchList:", error);
        return { success: false, message: "An error occurred while adding the movie to the watchlist." };
    }
}

export async function removeFromWatchList(userID, movieId) {
    try {
        if (!userID || !movieId) {
            return { success: false, message: "User ID and Movie ID are required." };
        }

        await dbConnect();

        const watchList = await watchListModel.findOne({ userID });
        if (!watchList) {
            return { success: false, message: "WatchList not found for the user." };
        }

        const isMovieInWatchList = watchList.videoList.some(
            (item) => item.id?.toString() === movieId?.toString()
        );

        if (!isMovieInWatchList) {
            return { success: false, message: "Movie not found in the watchlist." };
        }

        watchList.videoList = watchList.videoList.filter(
            (item) => item.id?.toString() !== movieId?.toString()
        );

        await watchList.save();

        return {
            success: true,
            message: "Movie removed from watchlist successfully."
        };
    } catch (error) {
        console.error("Error in removeFromWatchList:", error);
        return { success: false, message: "An error occurred while removing the movie from the watchlist." };
    }
}


export const checkIfAlreadyAddedToWatchList = async (userID, movieId) => {
    try {
        if (!userID || !movieId) {
            return { success: false, message: "User ID and movie ID are required." };
        }

        await dbConnect();

        const watchList = await watchListModel.findOne({ userID });
        if (!watchList) {
            return { success: false, message: "WatchList not found for the user." };
        }

        const isMovieInWatchList = watchList.videoList.some(
            (item) => item.id?.toString() === movieId?.toString()
        );

        return {
            success: true,
            isInWatchList: isMovieInWatchList,
            message: isMovieInWatchList
                ? "Movie is already in the watchlist."
                : "Movie is not in the watchlist.",
        };
    } catch (error) {
        console.error("Error in checkIfAlreadyAddedToWatchList:", error);
        return {
            success: false,
            message: "An error occurred while checking the watchlist.",
        };
    }
};


export const getWatchList = async (userID) => {
    try {
        if (!userID) {
            return { success: false, message: "User ID is required." };
        }

        await dbConnect();

        const watchList = await watchListModel.findOne({ userID }).lean();
        if (!watchList) {
            return { success: false, message: "WatchList not found for the user." };
        }

        return {
            success: true,
            watchList: JSON.parse(JSON.stringify(watchList.videoList)),
            message: "WatchList retrieved successfully."
        };
    } catch (error) {
        console.error("Error in getWatchList:", error);
        return {
            success: false,
            message: "An error occurred while retrieving the watchlist.",
        };
    }
};