import React from "react";
import { useEffect } from "react";

const HomePage = () => {
    useEffect(() => {
        document.title = "HOME | FITLOG"
    },[])
  return <div>
    <button className="btn btn-ghost">Button</button>
  </div>;
};

export default HomePage;
