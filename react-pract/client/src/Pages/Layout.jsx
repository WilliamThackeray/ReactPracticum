import { Outlet } from "react-router-dom";

function Layout(props) {
  return (
    <>
      {/* <Header title={props.title} logo={props.logo}/> */}
      <Outlet />
      {/* <Footer /> */}
    </>
  );
}
export default Layout;