"use client";
import addToWatchList, {
  checkIfAlreadyAddedToWatchList,
  removeFromWatchList,
} from "@/actions/watchlist";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AddButtonSVG, AddedButtonSVG } from "./SVG";
const AddToWatchButton = ({ movie, movieID }) => {
  const [isInWatchList, setIsInWatchList] = useState(false);
  const { id: AuthID } = useAuth() || {};
  const router = useRouter();
  const handleAddToWatchList = async () => {
    if (!AuthID) {
      router.push("/login");
    } else {
      try {
        await toast.promise(
          (async () => {
            const result = await addToWatchList(AuthID, movie);
            if (result.success) {
              setIsInWatchList(true);
            }
            if (!result.success) {
              throw new Error(result.message || "Failed to add to watchlist");
            }
            return result;
          })(),
          {
            pending: "Adding to watchlist... ⏳",
            success: {
              render({ data }) {
                return data?.message || "Added to watchlist! 🎉";
              },
            },
            error: {
              render({ data }) {
                return data?.message || "Failed to add to watchlist. 😢";
              },
            },
          }
        );
      } catch (error) {
        console.error("Error:", error.message || error);
      }
    }
  };

  const handleRemoveFromWatchList = async () => {
    if (!AuthID) {
      router.push("/login");
    } else {
      try {
        await toast.promise(
          (async () => {
            const result = await removeFromWatchList(AuthID, movieID);
            if (result.success) {
              setIsInWatchList(false);
            }
            if (!result.success) {
              throw new Error(result.message || "Failed to add to watchlist");
            }
            return result;
          })(),
          {
            pending: "Removing from watchlist... ⏳",
            success: {
              render({ data }) {
                return data?.message || "Remove from watchlist! 🎉";
              },
            },
            error: {
              render({ data }) {
                return data?.message || "Failed to remove from watchlist. 😢";
              },
            },
          }
        );
      } catch (error) {
        console.error("Error:", error.message || error);
      }
    }
  };

  useEffect(() => {
    const checkIfInWatchList = async () => {
      try {
        const response = await checkIfAlreadyAddedToWatchList(AuthID, movieID);
        if (response?.success) {
          setIsInWatchList(response.isInWatchList);
        } else {
          toast.error(response?.message);
        }
      } catch (err) {
        toast.error("Failed to check watchlist status.", err);
        console.log(err);
      }
    };

    if (AuthID && movieID) {
      checkIfInWatchList();
    }
  }, [AuthID, movieID]);

  return (
    <>
      {isInWatchList ? (
        <div className="text-center">
          <button
            onClick={handleRemoveFromWatchList}
            className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-lg text-green-600"
          >
            <AddedButtonSVG />
            Added to Watch List
          </button>
        </div>
      ) : (
        <div className="text-center">
          <button
            onClick={handleAddToWatchList}
            className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-lg"
          >
            <AddButtonSVG />
            Add to Watch List
          </button>
        </div>
      )}
    </>
  );
};

export default AddToWatchButton;
