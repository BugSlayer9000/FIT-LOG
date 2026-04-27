import { FaRegPlusSquare } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { userExerciseStore } from "../store/userExerciseStore";

import { CgProfile } from "react-icons/cg";
import { FaDumbbell } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";

// [border:1px_solid_white]

const NavBar = () => {
  const location = useLocation();
  const searchQuery = userExerciseStore((state) => state.searchQuery);
  const setSearchQuery = userExerciseStore((state) => state.setSearchQuery);
  const isHomePage = location.pathname === "/";

  return (
    // top nav
    <div className="flex items-center justify-center  mx-auto max-w-6xl p-4 ">
      <div className="flex flex-col items-center justify-between">
        <div className="w-full flex justify-center items-center">
          <Link
            to={"/"}
            className="text-4xl font-bold text-green-500 font-mono md:text-6xl "
          >
            FIT LOG
          </Link>
        </div>

        {/* top nav pc view */}
        <div className="w-full items-center gap-4 p-4 hidden z-50 md:flex">
          <div className="flex-1">
            <Link to={"/create"} className="btn btn-neutral">
              <FaRegPlusSquare size={23} />{" "}
              <span className="hidden sm:block md:text-xl">
                {" "}
                Add an exercise
              </span>
            </Link>
          </div>
          {isHomePage && (
            <div className="card card-title flex flex-row">
              <input
                className="input input-bordered input-secondary w-full max-w-xs md:text-xl"
                placeholder="search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              ></input>
              <FaSearch className="pl-2" size={35} />
            </div>
          )}
        </div>
        {/* bottom nav - mobile*/}
        <div className="w-full flex items-center gap-4 p-2 h-20 btm-nav z-50 md:hidden bg-accent/80 rounded-full mb-3">
          <div className="flex flex-row justify-evenly items-center w-full">
            <Link to="/" className="border-opacity-70 border border-black/15 flex flex-col items-center justify-center h-full flex-1 m-4 backdrop-blur-md bg-black/20 rounded-full">
              <div className="my-1">
                <CgProfile size={20} />
              </div>
              <span className="text-lg">Profile</span>
            </Link>
            <button className="border-opacity-70 border border-black/15 flex flex-col items-center justify-center h-full flex-1 m-4 backdrop-blur-md bg-black/20 rounded-full" onClick={"/"}>
              <div className="my-1">
                <FaPlay />
              </div>
              <span className="text-lg">start</span>
            </button>
            <button className="border-opacity-70 border border-black/15 flex flex-col items-center justify-center h-full flex-1 m-4 backdrop-blur-md bg-black/20 rounded-full">
              <div className="my-1">
                <FaDumbbell size={20} />
              </div>
              <span>Workouts</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
