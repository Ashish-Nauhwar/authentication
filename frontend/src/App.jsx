import React, { useState, useEffect } from "react";

export default function App() {

  const [currentUser, setCurrentUser] = useState(null);
  const [isLoginMode, setIsLoginMode] = useState(true); 

  // Form Inputs
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 

    const endpoint = isLoginMode ? "/login-user" : "/register-user";
    const url = `http://localhost:4000/api/v1/users${endpoint}`;

    const payload = isLoginMode
      ? { email, password }
      : { username, email, password };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "An error occurred");
      }

     
      const userData = {
        id: data.id,
        username: data.username,
        email: data.email,
        token: data.token,
      };

      setCurrentUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      
      
      setUsername("");
      setEmail("");
      setPassword("");

    } catch (err) {
      setError(err.message);
    }
  };

 
  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("user");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 antialiased selection:bg-indigo-500 selection:text-white">
      
      
      {currentUser ? (
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-8 transform transition-all">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 text-indigo-600 font-bold text-2xl mb-3">
              {currentUser.username.charAt(0).toUpperCase()}
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              Welcome back, {currentUser.username}!
            </h2>
            <p className="text-sm text-gray-500 mt-1">Account Dashboard</p>
          </div>

          <div className="space-y-4 bg-gray-50 p-5 rounded-xl border border-gray-200/60 mb-6">
            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">User ID</label>
              <p className="text-sm font-mono text-gray-700 mt-0.5 break-all select-all bg-white p-2 rounded border border-gray-200">
                {currentUser.id}
              </p>
            </div>
            
            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">Username</label>
              <p className="text-sm font-medium text-gray-800 mt-0.5 bg-white p-2 rounded border border-gray-200">
                {currentUser.username}
              </p>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">Email Address</label>
              <p className="text-sm font-medium text-gray-800 mt-0.5 bg-white p-2 rounded border border-gray-200">
                {currentUser.email}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full bg-red-50 text-red-600 hover:bg-red-100 font-semibold py-3 px-4 rounded-xl transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Sign Out
          </button>
        </div>
      ) : (
       
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              {isLoginMode ? "Sign In" : "Create Account"}
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              {isLoginMode ? "Access your secure portal" : "Get started with your new account"}
            </p>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-xl flex items-start">
              <p className="text-sm text-red-700 font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Show Username field only during Registration */}
            {!isLoginMode && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Username</label>
                <input
                  type="text"
                  placeholder="johndoe"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition outline-none"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-xl transition duration-200 ease-in-out shadow-lg shadow-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-2"
            >
              {isLoginMode ? "Sign In" : "Register"}
            </button>
          </form>

          {/* Toggle Button */}
          <div className="mt-8 text-center border-t border-gray-100 pt-6">
            <p className="text-sm text-gray-600">
              {isLoginMode ? "New to the platform?" : "Already have an account?"}{" "}
              <button
                onClick={() => {
                  setIsLoginMode(!isLoginMode);
                  setError(""); 
                }}
                className="font-semibold text-indigo-600 hover:text-indigo-500 transition underline underline-offset-4 focus:outline-none"
              >
                {isLoginMode ? "Create an account" : "Sign in instead"}
              </button>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}