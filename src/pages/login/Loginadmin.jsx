import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/auth"; // Sesuaikan dengan struktur folder
import logo from "../../assets/images/logowithtext.png";
import { Link } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 

    try {
      const credentials = { username, password };

      const data = await login(credentials);
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("username", data.username);

      // Redirect berdasarkan role
      if (data.role === "admin") {
        navigate("/admin/dashboard"); // Redirect ke halaman admin
      } else if (data.role === "staff") {
        // Pastikan path yang digunakan sesuai dengan rute backend untuk staff
        navigate("/admin/dashboard"); // Redirect ke path dashboard staff yang disediakan backend
      } else {
        setError("Access denied. Only admin or staff can access this page.");
      }
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      
      // Tampilkan pesan error yang diterima dari API, jika ada
      setError(err.response?.data?.message || "Invalid credentials or server error.");
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
     <div className="flex flex-col items-center sm:mx-auto sm:w-full sm:max-w-md lg:mx-auto lg:w-full lg:max-w-lg">
  <img alt="logo" src={logo} className="h-20" />     
  <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Login</h2>
</div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <div className="bg-white px-6 pt-4 pb-24 shadow sm:rounded-lg sm:px-12">
                    <div className=" font-bold text-xl mb-8 ">
                      <Link to="/" className="text-black ">
                        ←
                      </Link>
                    </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Input Username */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  autoComplete="off"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* Input Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="off"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-red-600 text-sm text-center mt-2">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in as Admin
              </button>
            </div>
          </form>

          {/* Footer */}
          <div className="mt-10 text-center text-sm text-gray-500">
            Not an admin?{" "}
            <a
              href="#"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Contact Admin
            </a>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
