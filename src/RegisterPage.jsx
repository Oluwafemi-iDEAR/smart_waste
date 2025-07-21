import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { app } from "./helpers/authFirebase";
import useStore from "./state";
import gwaves from "./assets/gwaves.png";

const RegisterPage = () => {
  const nav = useNavigate();
    const auth = getAuth(app);
    const { setUser } = useStore();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  
  const createAccount = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setUser(userInfo);
    try {
      await createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password);
      // user is auto-logged in; redirect will happen in useEffect
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("This email is already registered.");
      } else if (err.code === "auth/weak-password") {
        setError("Password should be at least 6 characters.");
      } else {
        setError("Registration failed. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        nav("/dashboard");
      }
    });
    return () => unsubscribe();
  }, [auth, nav]);


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
      <section className="relative pt-52 xs:pt-40 pb-16 md:pb-24 lg:pb-52 bg-green-900 overflow-hidden">
         <img src={gwaves} alt="g-waves" class="absolute top-0 left-0 w-full h-full max-h-116 md:max-h-128"/>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-sm mx-auto p-8 bg-green-50 rounded-2xl shadow-md">
            <form onSubmit={createAccount}>
              <h3 className="text-4xl text-center font-medium mb-10">
                Register
              </h3>

                {error && (
                  <div className="mb-4 text-red-600 text-sm text-center">
                    {error}
                  </div>
                )}
              <label className="block pl-4 mb-1 text-sm font-medium">
                Name
              </label>
              <input
                name="name"
                onChange={handleChange}
                type="text"
                className="bg-white w-full px-4 py-3 mb-6 outline-none ring-offset-0 focus:ring-2 focus:ring-lime-500 shadow rounded-full"
              />

              <label className="block pl-4 mb-1 text-sm font-medium">
                Email
              </label>
              <input
                name="email"
                onChange={handleChange}
                type="text"
                className="bg-white w-full px-4 py-3 mb-6 outline-none ring-offset-0 focus:ring-2 focus:ring-lime-500 shadow rounded-full"
              />

              <label className="block pl-4 mb-1 text-sm font-medium">
                Password
              </label>
              <div className="relative mb-6">
                <input
                  name="password"
                  onChange={handleChange}
                  type={visible ? "text" : "password"}
                  className="relative bg-white w-full px-4 py-3 outline-none ring-offset-0 focus:ring-2 focus:ring-lime-500 shadow rounded-full"
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

              <button
                type="submit"
                disabled={loading}
                className="flex pt-8 button-33 w-full py-3 px-5 items-center justify-center font-medium text-white hover:text-teal-900 border hover:border-lime-500 bg-teal-900 hover:bg-lime-500 rounded-full transition duration-200"
              >
                {loading ? "Signing up..." : "Sign up"}
              </button>
              <p className="py-2 pt-8 text-center">
                Already have an account?{" "}
                <span
                  className="text-blue-600 cursor-pointer"
                  onClick={() => nav("/login")}
                >
                  Login
                </span>
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RegisterPage;
