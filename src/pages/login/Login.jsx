import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/auth"; // Sesuaikan dengan struktur folder
import logo from "../../assets/images/logowithtext.png";


export default function Login() {
  const [username, setUsername] = useState(""); // Changed from email to username
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Logika form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error sebelum mencoba login
    try {
      const credentials = { username, password }; // Use username instead of email
      const data = await login(credentials);
      // Pastikan hanya admin yang bisa login
      if (data.role === "user") {
        // Menyimpan token dan role di localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role); // Menyimpan role
        localStorage.setItem("username", data.username); // Simpan username
        console.log("Login Response:", data); // Debugging respons API login

        // Redirect ke halaman dashboard admin
        navigate("/user/dashboard");
      } else {
        setError("You Can't Access This Page.");
      }
    } catch (err) {
      console.error("Login failed:", err.response || err.message);
      setError("Invalid credentials or server error.");
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <img alt="logo" src={logo} className="h-20" />     
       <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Login</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Input Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text" // Changed from email type to text for username
                  required
                  autoComplete="new-username" // Menggunakan nilai unik untuk menghindari autofill
                  value={username} // Bind to the username state
                  onChange={(e) => setUsername(e.target.value)} // Update username
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* Input Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && <div className="text-red-600 text-sm text-center mt-2">{error}</div>}

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
