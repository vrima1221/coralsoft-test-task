import { FC, useEffect } from "react";
import { NavigateFunction, useNavigate } from "react-router";
import { useAppSelector } from "../store/store";
import { useGetBreedsQuery } from "../services/catsService";
import BreedsGrid from "../components/BreedsGrid";
import Charts from "../components/Charts";

const HomePage: FC = () => {
  const navigate: NavigateFunction = useNavigate();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const { data: cats, error, isLoading } = useGetBreedsQuery();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/sign-in");
    }
  }, [isAuthenticated, navigate]);

  if (isLoading || error) {
    return (
      <div className="flex items-center justify-center h-screen">
        {isLoading ? (
          <div className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full" />
        ) : (
          <div className="text-red-500">Error loading cats data</div>
        )}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 dark:bg-gray-800 dark:text-white">
      <h1 className="text-4xl font-bold mb-8 dark:text-white">
        Cat Breeds Statistics
      </h1>

      {!!cats?.length && (
        <>
          <Charts cats={cats} />
          <BreedsGrid cats={cats} />
        </>
      )}
    </div>
  );
};

export default HomePage;
