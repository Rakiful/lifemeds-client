import React from "react";
import google from "../../assets/icons/google.jpg";
import github from "../../assets/icons/github.jpg";
import { useAuth } from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";

export const SocialLogin = () => {
  const { googleSignIn, githubSignIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state || "/";

  const handleLogin = async (providerFn) => {
    try {
      await providerFn();
      Swal.fire({
        icon: "success",
        title: "Logged in successfully",
        timer: 2000,
        showConfirmButton: false,
      });
      navigate(from);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: err.message,
      });
    }
  };

  return (
    <div>
      <div className="divider">OR</div>
      <div className="flex justify-center gap-5">
        {/* GitHub */}
        <button
          onClick={() => handleLogin(githubSignIn)}
          className="btn py-6 px-12 bg-white border-[#e5e5e5] rounded-full"
        >
          <img src={github} alt="GitHub" className="w-10 h-10" />
        </button>

        {/* Google */}
        <button
          onClick={() => handleLogin(googleSignIn)}
          className="btn py-6 px-12 bg-white border-[#e5e5e5] rounded-full"
        >
          <img src={google} alt="Google" className="w-7 h-7" />
        </button>
      </div>
    </div>
  );
};
