import styles from "./Navbar.module.css";

function Navbar() {

  return (
    <div className={styles.container}>
      <span className={styles.title}>
        Air Quality Index
      </span>
    </div>
  );
}

export default Navbar;
