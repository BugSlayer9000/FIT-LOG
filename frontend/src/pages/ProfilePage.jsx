import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Pen } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom"

const ProfilePage = () => {
 
  const navigate = useNavigate()

  const { authUser, updateProfile, isUpdating,logout } = useAuthStore();

  const [updateInfo, setUpdateInfo] = useState({
    height: "",
    weight: "",
  });

  const [editHeight, setEditHeight] = useState(false);
  const [editWeight, setEditWeight] = useState(false);

  const [showAlert, setShowAlert] = useState(false);

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

  const handleLogOut = async () => {
    logout()
    navigate("/login")
    
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
        {/* TODO - add Charts here check figma */}
        {/* <div className="border text-zinc-50">
          
        </div> */}

        {/* Logout button */}
        <button className="btn mt-6 btn-warning" onClick={() => setShowAlert(true)}>
          <span className="font-semibold text-xl font-mono">Log Out</span>
        </button>

        <div
          role="alert"
          className={
            showAlert
              ? "alert alert-error alert-vertical sm:alert-horizontal mt-6"
              : "hidden"
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-blue-600 h-8 w-8 shrink-0"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span className="text-xl font-semibold">Are you sure ? </span>
          <div className=" flex  w-52 justify-evenly">
            <button className="btn btn-sm" onClick={() => setShowAlert(false)}>No</button>
            <button
              className="btn btn-sm btn-primary"
              onClick={() => handleLogOut()}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
