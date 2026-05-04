import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Pen } from "lucide-react";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const { authUser, updateProfile, isUpdating } = useAuthStore();

  const [updateInfo, setUpdateInfo] = useState({
    height: "",
    weight: "",
  });

  const [editHeight, setEditHeight] = useState(false);
  const [editWeight, setEditWeight] = useState(false);

  useEffect(() => {
    authUser;
  }, [authUser]);

  const handleUpdate = async () => {
    if (!updateInfo.height || !updateInfo.weight) {
      return toast.error("Please fill in the fields correctly");
    }

    await updateProfile(updateInfo);

    setEditHeight(false);
    setEditWeight(false);
  };

  return (
    <div className="h-full">
      <div className="border-secondary p-4 flex flex-col m-2 mt-4 rounded-2xl bg-secondary/20">
        <div className="avatar p-2 mx-auto mb-2">
          <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring-2 ring-offset-2 ">
            <img src="https://www.loremfaces.net/96/id/1.jpg" alt="profile" />
          </div>
        </div>
        <div className="flex items-center justify-center p-2">
          <span className="text-3xl text-center font-serif from-stone-300 ">
            {authUser.fullname}
          </span>
        </div>
      </div>
      <div className="flex flex-col m-2 mt-4 ">
        <ul
          className="  
        [&>li]:m-2 
        text-lg 
        rounded-2xl 
        bg-secondary/20 
        p-4
        px-6 
        list-disc "
        >
          {/* HEIGHT */}
          <li>
            {!editHeight ? (
              <span>{authUser.height} CM </span>
            ) : (
              <input
                type="number"
                className="input input-ghost input-bordered input-sm mr-3"
                value={updateInfo.height || ""}
                onChange={(e) =>
                  setUpdateInfo({
                    ...updateInfo,
                    height: e.target.value.trim(),
                  })
                }
              />
            )}

            <button
              className="btn btn-ghost btn-sm"
              onClick={() => setEditHeight(!editHeight)}
            >
              <Pen size={20} />
            </button>
          </li>

          {/* WEIGHT */}
          <li>
            {!editWeight ? (
              <span>{authUser.weight} KG </span>
            ) : (
              <input
                type="number"
                className="input input-ghost input-bordered input-sm mr-3"
                value={updateInfo.weight || ""}
                onChange={(e) =>
                  setUpdateInfo({
                    ...updateInfo,
                    weight: e.target.value.trim(),
                  })
                }
              />
            )}

            <button
              className="btn btn-ghost btn-sm"
              onClick={() => setEditWeight(!editWeight)}
            >
              <Pen size={20} />
            </button>
          </li>
          <li>Birthday is to be implemented</li>
          <li>Number of workouts - {authUser?.workouts?.length || 0}</li>
        </ul>
        {/*  */}
        <div className="flex justify-end mt-2">
          <button
            className={`btn btn-sm btn-outline btn-ghost  mr-5`}
            onClick={() => handleUpdate()}
            disabled={isUpdating}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
