import { ErrorBoundary } from "./ErrorBoundary";
import ErrorPage from "./ErrorPage";
import PageLayout from "./PageLayout";
import UIProvider from "./UIProvider";

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <ErrorBoundary fallback={ErrorPage}>
      <UIProvider>
        <PageLayout>{children}</PageLayout>
      </UIProvider>
    </ErrorBoundary>
  );
};

export default PageWrapper