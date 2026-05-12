import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { Dumbbell } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SignInPage = () => {
  const { signUp, isSigningUp } = useAuthStore();

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    weight: "",
    height: "",
    birthday: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signUp(formData);
    navigate("/");
  };

  return (
    <div className="h-screen flex flex-col justify-center align-middleborder-t border-secondary/60">
      <form
        onSubmit={handleSubmit}
        className="bg-neutral rounded-2xl p-4 flex flex-col mx-6"
      >
        <div className="items-center justify-center flex mb-4">
          <Dumbbell size={50} />
        </div>
        <span className="text-center text-2xl font-serif font-bold text-accent">
          Sign Up
        </span>
        <span className="text-center text-xl text-zinc-500 mb-4">
          Welcome To FITLOG !
        </span>
        <span className="mb-2 text-md ml-3">Full Name</span>
        <input
          type="text"
          className="input border-accent mb-4 bg-accent/10"
          required
          placeholder="Will Smith"
          value={formData.fullname}
          onChange={(e) =>
            setFormData({ ...formData, fullname: e.target.value })
          }
        />
        <span className="mb-2 text-md ml-3">Email</span>
        <input
          type="email"
          className="input border-accent mb-4 bg-accent/10"
          required
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <span className="mb-2 text-md ml-3 flex">
          Password{" "}
          <button
          className="mx-2  w-7"
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-base-content/40" />
            ) : (
              <Eye className="h-5 w-5 text-base-content/40" />
            )}
          </button>
        </span>
        <input
          type={showPassword ? "text" : "password"}
          className="input border-accent mb-4 bg-accent/10"
          required
          placeholder="••••••••"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />

        {/* Height and weight section */}
        <div className="flex items-center justify-evenly">
          <div className="flex-1  ">
            <span className="mb-2 text-md ml-3">
              Height in CM{" "}
              <span className="text-sm text-zinc-500">(optional)</span>
            </span>
            <input
              type="number"
              className="input input-sm border-accent mb-4 mt-2 bg-accent/10"
              required
              placeholder="Height here"
              value={formData.height}
              onChange={(e) =>
                setFormData({ ...formData, height: e.target.value })
              }
            />
          </div>
          <div className="flex-1 ">
            <span className="mb-2 text-md ml-3">
              Weight in KG{" "}
              <span className="text-sm text-zinc-500">(optional)</span>
            </span>
            <input
              type="number"
              className="input input-sm border-accent mb-4 mt-2 bg-accent/10"
              required
              placeholder="Wight here"
              value={formData.weight}
              onChange={(e) =>
                setFormData({ ...formData, weight: e.target.value })
              }
            />
          </div>
        </div>
        <span className="mb-2 text-md ml-3">Birthday</span>
        <input
          type="date"
          className="input border-accent mb-4 bg-accent/10"
          required
          placeholder="DD/MM/YYYY"
          value={formData.birthday}
          onChange={(e) =>
            setFormData({ ...formData, birthday: e.target.value })
          }
        />
        <button
          type="submit"
          className="btn btn-secondary mt-4"
          disabled={isSigningUp}
        >
          {isSigningUp ? "Signing Up" : "Create Account"}
        </button>
        <Link to={"/login"} className="text-md text-center mt-6 underline">
          Log in
        </Link>
      </form>
    </div>
  );
};

export default SignInPage;
