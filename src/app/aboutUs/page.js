// import ScrollToTop from '../components/ScrollToTop'; // Adjust the import path as needed
import styles from './page.module.css'; // Adjust the import path and module name as needed
import metaData from '../../../public/metaData.json'

export const metadata = {
  title: `${metaData.about.title}`,
  description: `${metaData.about.description}`,
  keywords: `${metaData.about.keywords}`
}

const AboutUsPage = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={`${styles.responsiveContainerBlock} ${styles.bigContainer}`}>
          <div className={`${styles.responsiveContainerBlock} ${styles.Container} ${styles.bottomContainer}`}>
            <div className={`${styles.allText} ${styles.bottomText}`}>
              {/* <p className={`${styles.textBlk} ${styles.headingText}`}>
                About Us
              </p> */}
              <p className={`${styles.textBlk} ${styles.subHeadingText}`}>
                We build to your bespoke
              </p>
              <p className={`${styles.textBlk} ${styles.description}`}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fermentum pulvinar ullamcorper suspendisse ac eget. Pellentesque tempus leo in ullamcorper quis vestibulum ligula elementum ut. Congue in dignissim tincidunt ut dolor eu. Mi, eget posuere vitae sed purus nisl lorem.
              </p>
              <a>
                <button className={styles.explore}>
                  View More
                </button>
              </a>
            </div>
            <div className={styles.videoContainer}>
              <iframe
                allowFullScreen
                className={styles.mainVideo}
                controls
                src="https://www.youtube.com/embed/svg%3E?"
              ></iframe>
              {/* <img
                className={`${styles.dotsImg} ${styles.imageBlock}`}
                src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/cw3.svg"
              /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUsPage;
