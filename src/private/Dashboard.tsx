import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import DashSide from "./DashSide";

const Dashboard = () => {
  return (
    <div>
      <Navbar></Navbar>
      <DashSide></DashSide>
      <Footer></Footer>
    </div>
  );
};

export default Dashboard;
