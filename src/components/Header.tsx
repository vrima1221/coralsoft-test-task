import { useAppDispatch, useAppSelector } from "../store/store";
import { logoutUser } from "../store/slices/authSlice";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <header className="flex justify-end items-center p-4 bg-gray-50 dark:bg-gray-800 shadow-lg dark:shadow-lg">
      <div className="flex items-center space-x-4">
        <ThemeToggle />

        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className="p-2 bg-red-600 text-white rounded"
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
