import React from "react";
import isEmpty from "../../../../../../utils/isEmpty";

const UserSocial = ({ member, classes }) => {
  return (
    <div className={classes}>
      <p>
        {isEmpty(member.social && member.social.twitter) ? null : (
          <a
            href={member.social.twitter}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="social-icon fab fa-twitter" />
          </a>
        )}
        {isEmpty(member.social && member.social.facebook) ? null : (
          <a
            href={member.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="social-icon fab fa-facebook-f" />
          </a>
        )}
        {isEmpty(member.social && member.social.linkedin) ? null : (
          <a
            href={member.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="social-icon fab fa-linkedin-in" />
          </a>
        )}
        {isEmpty(member.social && member.social.instagram) ? null : (
          <a
            href={member.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="social-icon fab fa-instagram" />
          </a>
        )}
      </p>
    </div>
  );
};

export default UserSocial;
