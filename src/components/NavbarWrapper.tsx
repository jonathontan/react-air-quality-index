import { Outlet } from "react-router";
import Navbar from "./Navbar";
import styles from "./NavbarWrapper.module.css";

function NavbarWrapper() {
  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <Navbar />
      </div>
      <div className={styles.outlet}>
        <Outlet />
      </div>
    </div>
  );
}

export default NavbarWrapper;
