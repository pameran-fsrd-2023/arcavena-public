import HomeDesktopPage from "../containers/Home/HomeDesktopPage";
import HomeMobilePage from "../containers/Home/HomeMobilePage";

const HomePage = () => {
  return (
    <main className="min-h-[100vh] w-full">
      <div className="block h-fit min-h-full w-full sm:hidden">
        <HomeMobilePage />
      </div>
      <div className="hidden h-fit min-h-full w-full sm:block">
        <HomeDesktopPage />
      </div>
    </main>
  );
};

export default HomePage;
