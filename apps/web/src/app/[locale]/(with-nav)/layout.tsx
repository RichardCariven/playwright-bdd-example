import { type NextLayoutWithParams } from "@web/app/pageTypes";
import { Footer } from "@web/components/Footer/Footer";
import HeaderNav from "@web/components/HeaderNavigation/HeaderNav";

const RootLayout: NextLayoutWithParams = ({ children }) => {
  return (
    <div className="bg-rayo-default bg-[center_top_-170px] bg-no-repeat">
      <HeaderNav
        login={{
          helloName: "Timo",
          loggedIn: true,
        }}
        premium
      />
      <main className="mx-auto w-auto space-y-20 pb-8 text-neutral">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;

export function generateStaticParams() {
  return [];
}
