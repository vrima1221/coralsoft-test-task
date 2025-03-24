import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./app/home";
import StoreProvider from "./components/StoreProvider";
import SignInPage from "./app/signIn";
import PageWrapper from "./components/PageWrapper";

const App = () => {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <PageWrapper>
                <HomePage />
              </PageWrapper>
            }
          />
          <Route
            path="/sign-in"
            element={
              <PageWrapper>
                <SignInPage />
              </PageWrapper>
            }
          />
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  );
};

export default App;
