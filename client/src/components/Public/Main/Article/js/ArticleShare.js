import React from "react";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  EmailShareButton,
  WhatsappShareButton,
  PinterestShareButton,
  RedditShareButton,
  TumblrShareButton
} from "react-share";
import classNames from "classnames";

const ArticleShare = ({ id, thumbnail, mobile }) => {
  let shareClass = classNames({
    "share-social-media": !mobile,
    "social-media-share-box": mobile
  });
  return (
    <div className={shareClass}>
      <FacebookShareButton
        additionalProps={{ "aria-label": "Facebook Share" }}
        url={`https://zenipsgaming.herokuapp.com/articles/${id}`}
      >
        <i className="fab fa-facebook-f" />
      </FacebookShareButton>
      <TwitterShareButton
        additionalProps={{ "aria-label": "Twitter Share" }}
        url={`https://zenipsgaming.herokuapp.com/articles/${id}`}
      >
        <i className="fab fa-twitter" />
      </TwitterShareButton>
      <LinkedinShareButton
        additionalProps={{ "aria-label": "Linkedin Share" }}
        url={`https://zenipsgaming.herokuapp.com/articles/${id}`}
      >
        <i className="fab fa-linkedin" />
      </LinkedinShareButton>
      <EmailShareButton
        additionalProps={{ "aria-label": "Email Share" }}
        url={`https://zenipsgaming.herokuapp.com/articles/${id}`}
      >
        <i className="fas fa-envelope" />
      </EmailShareButton>
      <WhatsappShareButton
        additionalProps={{ "aria-label": "Whatsapp Share" }}
        url={`https://zenipsgaming.herokuapp.com/articles/${id}`}
      >
        <i className="fab fa-whatsapp" />
      </WhatsappShareButton>
      <PinterestShareButton
        additionalProps={{ "aria-label": "Pinterest Share" }}
        media={thumbnail ? thumbnail : ""}
        url={`https://zenipsgaming.herokuapp.com/articles/${id}`}
      >
        <i className="fab fa-pinterest" />
      </PinterestShareButton>
      <RedditShareButton
        additionalProps={{ "aria-label": "Reddit Share" }}
        url={`https://zenipsgaming.herokuapp.com/articles/${id}`}
      >
        <i className="fab fa-reddit" />
      </RedditShareButton>
      <TumblrShareButton
        additionalProps={{ "aria-label": "Tumblr Share" }}
        url={`https://zenipsgaming.herokuapp.com/articles/${id}`}
      >
        <i className="fab fa-tumblr" />
      </TumblrShareButton>
    </div>
  );
};

export default ArticleShare;
