import React from "react";
import { useEffect } from "react";

const HomePage = () => {
    useEffect(() => {
        document.title = "HOME | FITLOG"
    },[])
  return <div>Home Page</div>;
};

export default HomePage;
