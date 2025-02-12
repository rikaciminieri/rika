import PropTypes from "prop-types";
import Hero from "./hero";
import AboutMe from "./aboutMe";
import SocialLinks from "./socialLinks";
import rikaImage from "../assets/rika.jpeg";

function MainContent({ isJapanese = false }) {
  return (
    <>
      <Hero isJapanese={isJapanese} rikaImage={rikaImage} />
      <AboutMe isJapanese={isJapanese} />
      <SocialLinks />
    </>
  );
}

MainContent.propTypes = {
  isJapanese: PropTypes.bool,
};

export default MainContent;
