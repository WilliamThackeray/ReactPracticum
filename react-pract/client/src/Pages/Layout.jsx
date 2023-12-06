import { Outlet } from "react-router-dom";
import Logo from "../Components/Logo";

function Layout(props) {
  return (
    <>
      <Logo />
      <Outlet />
    </>
  );
}
export default Layout;