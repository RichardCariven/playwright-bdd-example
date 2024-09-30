/**
 * This is just an example page. Can be removed when no longer needed.
 */

import { Suspense } from "react";

import { Heading } from "@rayo/ui/components";
import { type NextPageWithProps } from "@web/app/pageTypes";
import ErrorBoundary from "@web/components/ErrorBoundary/ErrorBoundary";
import StationsNearYou, {
  StationsNearYou_Skeleton,
} from "@web/components/Onboarding/components/StationsNearYou";
import { ThemeToggle } from "@web/components/ThemeToggle/ThemeToggle";

const Page: NextPageWithProps = () => {
  return (
    <>
      <Heading />

      <ErrorBoundary fallback={<p>We should have error UI component, maybe</p>}>
        <Suspense fallback={<StationsNearYou_Skeleton postcode />}>
          <StationsNearYou postcode="12345" />
        </Suspense>
      </ErrorBoundary>
      <ThemeToggle />
    </>
  );
};

export default Page;
