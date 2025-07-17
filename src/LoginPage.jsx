import { useState } from "react";
import { useNavigate } from "react-router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "./helpers/authFirebase";

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";



import chiamanda from "./assets/chiamanda.png";
import chidebelu from "./assets/chidebelu.png";
import chris from "./assets/chris.png";
import kambili from "./assets/kambili.png";
import noble from "./assets/noble.png";
import oluwafemi from "./assets/oluwafemi.png";
import steve from "./assets/steve.png";

const LoginPage = () => {
  const nav = useNavigate();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleLogin = () => {
    const auth = getAuth(app);
    const { email, password } = userInfo;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        // Signed in
        const user = userCredential.user;
        nav("/dashboard");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  useEffect(() => {
  const auth = getAuth(app);
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      nav("/dashboard"); // Redirect if already logged in
    }
  });

  return () => unsubscribe(); // Clean up listener on unmount
}, []);


  return (
    <div>
      {/* Mobile Menu */}
      {mobileNavOpen && (
        <div className="fixed top-0 left-0 bottom-0 w-full xs:w-5/6 xs:max-w-md z-50">
          <div
            onClick={() => setMobileNavOpen(false)}
            className="fixed inset-0 bg-violet-900 opacity-20"
          ></div>
          <nav className="relative flex flex-col py-7 px-10 w-full h-full bg-white overflow-y-auto">
            {/* Mobile Menu content */}
          </nav>
        </div>
      )}

      {/* Login Form Section */}
        {/* <section class="overflow-hidden relative pt-52 xs:pt-40 pb-16 md:pb-24 lg:pb-52 bg-orange-50" x-data="{ mobileNavOpen: false }"> */}
      <section class="py-12 lg:py-24 relative overflow-hidden"><img class="absolute top-0 left-0 w-full h-full max-h-116 md:max-h-128" src="fauna-assets/contact/waves-bg-lime-half.png" alt=""/>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-sm mx-auto p-8 bg-white rounded-2xl shadow-md">
            <form>
              <h3 className="text-4xl text-center font-medium mb-10">Login</h3>
              <label className="block pl-4 mb-1 text-sm font-medium">
                Email
              </label>
              <input
                name="email"
                onChange={handleChange}
                type="text"
                className="w-full px-4 py-3 mb-6 outline-none ring-offset-0 focus:ring-2 focus:ring-lime-500 shadow rounded-full"
              />

              <label className="block pl-4 mb-1 text-sm font-medium">
                Password
              </label>
              <div className="relative mb-6">
                <input
                  name="password"
                  onChange={handleChange}
                  type={visible ? "text" : "password"}
                  className="relative w-full px-4 py-3 outline-none ring-offset-0 focus:ring-2 focus:ring-lime-500 shadow rounded-full"
                />
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setVisible(!visible);
                  }}
                  className="absolute top-1/2 right-0 transform -translate-y-1/2 mr-4"
                >
                  {/* Eye Toggle SVG */}
                </a>
              </div>

              <div className="text-right mb-10">
                <a
                  href="#"
                  className="inline-block text-sm underline font-medium"
                >
                  Forgot password?
                </a>
              </div>

              <p
                onClick={handleLogin}
                className="inline-flex w-full py-3 px-6 items-center justify-center text-lg font-medium text-white hover:text-teal-900 border border-teal-900 hover:border-lime-500 bg-teal-900 hover:bg-lime-500 rounded-full transition duration-200"
              >
                Login
              </p>
              <p className="py-2 text-center">
                Don't have an account?{" "}
                <span
                  className="text-blue-600 cursor-pointer"
                  onClick={() => nav("/register")}
                >
                  Sign Up
                </span>
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
