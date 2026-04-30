import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { Dumbbell } from "lucide-react";
import { useNavigate } from "react-router-dom"



const LoginPage = () => {
  const { login, isLogginIn } = useAuthStore();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
    navigate("/exercises")
  };

  return (
    <div className="min-h-screen flex flex-col justify-center align-middleborder-t border-secondary/60">
      <form
        onSubmit={handleSubmit}
        className="bg-neutral rounded-2xl p-4 flex flex-col mx-6"
      >
        <div className="items-center justify-center flex mb-4">
          <Dumbbell size={50} />
        </div>
        <span className="text-center text-2xl font-serif font-bold text-accent">
          Log In
        </span>
        <span className="text-center text-xl text-zinc-500 mb-4">
          Welcome Back !
        </span>
        <span className="mb-2 text-md ml-3">User Email</span>
        <input
          type="email"
          className="input border-accent mb-4"
          required
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <span className="mb-2 text-md ml-3">Password</span>
        <input
          type={showPassword ? "text" : "password"}
          className="input border-accent mb-4"
          required
          placeholder="••••••••"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <button
          className="absolute inset-y-0 right-0 pr-16 mt-52"
          type="button"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5 text-base-content/40" />
          ) : (
            <Eye className="h-5 w-5 text-base-content/40" />
          )}
        </button>
        <button
          type="submit"
          className="btn btn-secondary mt-4"
          disabled={isLogginIn}
        >
          {isLogginIn ? "Logging in" : "submit"}
        </button>
        <Link to={"/signin"} className="text-md text-center mt-6 underline">
          Create Account
        </Link>
      </form>
    </div>
  );
};

export default LoginPage;
