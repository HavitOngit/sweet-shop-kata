import "./App.css";
import { Hero } from "./lib/dashboard-overview";
import SweetShopDashboard from "./lib/data-table";

function App() {
  return (
    <>
      <div className="mx-52 mt-14">
        <Hero
          title="Sweet Shop Dashboard"
          description="Manage your sweet shop with ease."
        />
        <SweetShopDashboard />
      </div>
    </>
  );
}

export default App;
