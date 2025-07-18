import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../helpers/authFirebase";

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);
  const auth = getAuth(app);

  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    console.log("Auth check complete. User:", currentUser);  // ✅ DEBUG
    setUser(currentUser);
    setChecking(false);
  });
  return () => unsubscribe();
}, []);

  if (checking) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
