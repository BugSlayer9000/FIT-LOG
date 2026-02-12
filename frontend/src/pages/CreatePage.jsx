import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { FaArrowLeft } from "react-icons/fa6";
import toast from "react-hot-toast";
import api from "../lib/axios";

const CreatePage = () => {
  const [name, setName] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");

  const [loading, setLoading] = useState(false);

  const Navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Handle Submit ran");

    if (!name || !sets || !reps || !weight) {
      toast.error("All fields required !");
      return;
    }

    setLoading(true);

    try {
      await api.post("/exercises", {
        name,
        sets,
        reps,
        weight,
      });
      toast.success("Exercise Added Successfully!")
      Navigate("/")
    } catch (error) {
      console.log("Error Creating Note", error);
      toast.error("Failed to create Note !! ")
    }
  };

  return (
    <div className="border rounded-4xl m-auto mt-10 flex items-center bg-base-100  justify-center h-min w-min">
      <div className="rounded-2xl mx-auto px-4 py-8">
        <Link to={"/"} className="btn btn-accent mb-6">
          <FaArrowLeft size={25} /> Back to exercises
        </Link>
        <div className="card bg-base-200 w-96 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl">Create a new exercise</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text text-xl">Name</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  placeholder="Exercise Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text text-xl">Sets</span>
                </label>
                <input
                  type="number"
                  className="input input-bordered"
                  placeholder="Number of Sets"
                  value={sets}
                  onChange={(e) => setSets(e.target.value)}
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text text-xl">Reps</span>
                </label>
                <input
                  type="number"
                  className="input input-bordered"
                  placeholder="Number of Reps"
                  value={reps}
                  onChange={(e) => setReps(e.target.value)}
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text text-xl">Weight</span>
                </label>
                <input
                  type="number"
                  className="input input-bordered"
                  placeholder="Weight in KG"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
              <div className="card-actions justify-end ">
                <button className="btn btn-wide btn-primary mt-4" type="submit" disabled={loading}>
                  {loading ? "Adding Exercise" : "Add Exercise"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
