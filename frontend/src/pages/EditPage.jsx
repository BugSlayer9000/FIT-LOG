import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import api from "../lib/axios";
import { FaArrowLeft } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { userExerciseStore } from "../store/userExerciseStore";

const EditPage = () => {
  const [exercise, setExercise] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const { id } = useParams(); // getting the id that's getting clicked on

  const navigate = useNavigate();

  const updateExercise = userExerciseStore((state) => state.updateExercise);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/exercises/${id}`);
        setExercise(res.data.data);
        updateExercise(res.data.data);
      } catch (error) {
        console.log("Error in EditPage fetching", error);
        toast.error("Error fetching the Exercise ! ");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!exercise) {
    return <div>Exercise Not found</div>;
  }

  const handleDelete = async () => {
    try {
      await api.delete(`/exercises/${id}`);
      toast.success("Exercise Deleted Sucessfully");
      navigate("/");
    } catch (error) {
      console.log("Error in deleting Exercise", error);
      toast.error("Server Error");
    }
  };

  const handleUpdate = async () => {
    if (
      !exercise.name.trim() ||
      !exercise.sets ||
      !exercise.reps ||
      !exercise.weight
    ) {
      toast.error("Must in All fields ! ");
    }

    setSaving(true);

    try {
      await api.put(`/exercises/${id}`, exercise);
      toast.success("Exercise Updated Successfully !");
      navigate("/");
    } catch (error) {
      console.log("Error Updating the Exercise!", error);
      toast.error("Failed to update the note");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className=" min-h-screen bg-base-200">
      <div className=" container mx-auto px-4 py-8">
        <div className=" max-w-xl mx-auto">
          <div className=" flex items-center justify-between mb-6">
            <Link className="btn btn-ghost" to={"/"}>
              <FaArrowLeft size={23} /> Back to Exercises
            </Link>
            <button
              onClick={handleDelete}
              className="btn btn-error btn-outline"
            >
              {" "}
              <FaTrash size={20} />
              Delete Exercise
            </button>
          </div>
          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text text-xl">TITLE</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={exercise.name}
                  onChange={(e) =>
                    setExercise({ ...exercise, name: e.target.value })
                  }
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text text-xl">SETS</span>
                </label>
                <input
                  type="number"
                  className="input input-bordered"
                  value={exercise.sets}
                  onChange={(e) =>
                    setExercise({ ...exercise, sets: e.target.value })
                  }
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text text-xl">REPS</span>
                </label>
                <input
                  type="number"
                  className="input input-bordered"
                  value={exercise.reps}
                  onChange={(e) =>
                    setExercise({ ...exercise, reps: e.target.value })
                  }
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text text-xl">WEIGHT</span>
                </label>
                <input
                  type="number"
                  className="input input-bordered"
                  value={exercise.weight}
                  onChange={(e) =>
                    setExercise({ ...exercise, weight: e.target.value })
                  }
                />
              </div>
              <div className="card-actions justify-center">
                <button
                  className="btn btn-primary btn-wide"
                  onClick={handleUpdate}
                >
                  {saving ? "Updating" : "Update"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPage;
