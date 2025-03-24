import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "../store/store";
import { clearError, loginUser } from "../store/slices/authSlice";
import { useNavigate } from "react-router";

// 🔹 **Define Validation Schema with Yup**
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const SignInPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated, loading, error } = useAppSelector(
    (state) => state.auth
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  const onSubmit = (data: { email: string; password: string }) => {
    dispatch(loginUser(data));
  };
  const handleInputChange = () => {
    if (error) {
      dispatch(clearError()); // Dispatch to clear error from Redux store
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-8">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-6">
            Sign In
          </h1>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                {...register("email")}
                onChange={handleInputChange}
                className="py-3 px-4 block w-full border border-gray-200 dark:border-gray-700 rounded-lg text-sm transition duration-300 ease-in-out focus:border-blue-500 focus:ring-blue-500 outline-none dark:bg-gray-700 dark:text-white"
              />
              {errors.email && (
                <div className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </div>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                {...register("password")}
                onChange={handleInputChange}
                className="py-3 px-4 block w-full border border-gray-200 dark:border-gray-700 rounded-lg text-sm transition duration-300 ease-in-out focus:border-blue-500 focus:ring-blue-500 outline-none dark:bg-gray-700 dark:text-white"
              />
              {errors.password && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </div>
              )}
            </div>

            {error && (
              <div className="py-2 text-red-500 text-xs text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
