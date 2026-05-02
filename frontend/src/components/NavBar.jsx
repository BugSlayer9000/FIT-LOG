import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"

import { CgProfile } from "react-icons/cg";
import { VscDebugStart } from "react-icons/vsc";
import { CgGym } from "react-icons/cg";

const NavBar = () => {
  // todo
  // add the functioanlity where the user can see where they are by changing the color of the button according to the location

  const navigate = useNavigate()

  return (
    <div className="navbar bg-accent-content flex items-center justify-center border-b border-secondary/60 mt-1">
      <div className=""><button className="btn btn-ghost font-semibold text-4xl tracking-widest" onClick={() =>navigate("/")} >FITLOG</button></div>

      <div className="btm-nav btm-nav-lg border-t border-secondary/60 z-50 bg-accent-content flex items-center justify-center">
        <ul
          className="flex flex-row px-1 mb-4

        [&>li]:border 
      [&>li]:border-white/10 
        [&>li]:bg-accent/5  
        [&>li]:rounded-xl  
        [&>li]:flex-1 
        [&>li]:mx-5

        [&>li>a]:flex 
        [&>li>a]:flex-col 
        [&>li>a]:items-center 

        [&>li>a>div]:mt-1 
        "
        >
          <li>
            <Link to={"/profile"}>
              <div>
                <CgProfile size={25} />
              </div>
              <span>Profile</span>
            </Link>
          </li>
          <li>
            <Link to={"/"}>
              <div>
                <VscDebugStart size={25} />
              </div>
              <span>Start</span>
            </Link>
          </li>
          <li>
            <Link to={"exercises"}>
              <div>
                <CgGym size={25} />
              </div>
              <span>Exercises</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
