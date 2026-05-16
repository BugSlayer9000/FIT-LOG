import React, { useState } from "react";

const AddExercisePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    muscleGroup:"",
  });

  return (
    <div className="border h-screen flex flex-col justify-center align-middleborder-t ">
      <form className="form-control rounded-xl mx-5 p-2 bg-primary/50">
        <span className=" mb-2 text-center text-xl font-thin">
          Enter your exercise details below
        </span>
        <span className=" my-2 ml-4">Name</span>
        <input
          type="text"
          className="input bg-accent/50"
          required
          placeholder="name of the exercise  "
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <span className=" my-2  ml-4">Category</span>
        <input
          type="text"
          className="input bg-accent/50"
          required
          placeholder="select the category"
          list="categories"
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
        />
        <datalist id="categories">
          <option value="Compound"></option>
          <option value="Isolated"></option>
        </datalist>
        <span className=" my-2  ml-4">Muscle Group</span>
        <input
          type="text"
          className="input bg-accent/50"
          required
          placeholder="select the muscleGroup"
          list="muscleGroup"
          value={formData.muscleGroup}
          onChange={(e) =>
            setFormData({ ...formData, muscleGroup: e.target.value })
          }
          
        />
        <datalist id="muscleGroup">
          <option value="Chest"></option>
          <option value="Lats"></option>
          <option value="Traps"></option>
          <option value="Rhomboids"></option>
          <option value="Shoulders"></option>
          <option value="Biceps"></option>
          <option value="Triceps"></option>
          <option value="Forearms"></option>
        </datalist>
      </form>
    </div>
  );
};

export default AddExercisePage;
