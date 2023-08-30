
import Link from 'next/link';
import Image from 'next/image';
import styles from './navbar.module.css';

const Navbar = () => {


  return (
    <div className={styles.nav}>
      {/* <input type="checkbox" id="nav-check" /> */}
      <div className={styles.navHeader}>
        <div className={styles.navTitle}>
          <Image src="/logo.png" alt="" width={80} height={40} />
        </div>
      </div>
      <div className={styles.navBtn}>
        <label htmlFor="nav-check">
          <span></span>
          <span></span>
          <span></span>
        </label>
      </div>

      <div className={styles.navLinks}>
        <Link href="/">Home</Link>
        <Link href="/AboutUsPage">About Us</Link>
        <Link href="/ContactUs">Contact Us</Link>
        <Link href="/OurServicesPage">Our Services</Link>
        <Link href="/AllBlogs">Blogs</Link>
        {/* {loginStatus && <Link href="/AdminDashboard">Dashboard</Link>} */}
      </div>
    </div>
  );
};

export default Navbar;
