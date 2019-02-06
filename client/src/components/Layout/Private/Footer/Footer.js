import React from "react";
import classNames from "classnames";
import "./Footer.css";

const Footer = ({ expandContent }) => {
  let footerSticky = classNames({
    "footer-sticky text-center": true,
    hideFooter: !expandContent,
    showFooter: expandContent
  });
  const footer = (
    <div>
      <footer className={footerSticky}>
        &copy; {new Date().getFullYear()} Copyright. Zenips Studios
      </footer>
    </div>
  );
  return footer;
};

export default Footer;
