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
        url={`https://zenipsgaming.herokuapp.com/articles/${id}`}
      >
        <i className="fab fa-facebook-f" />
      </FacebookShareButton>
      <TwitterShareButton
        url={`https://zenipsgaming.herokuapp.com/articles/${id}`}
      >
        <i className="fab fa-twitter" />
      </TwitterShareButton>
      <LinkedinShareButton
        url={`https://zenipsgaming.herokuapp.com/articles/${id}`}
      >
        <i className="fab fa-linkedin" />
      </LinkedinShareButton>
      <EmailShareButton
        url={`https://zenipsgaming.herokuapp.com/articles/${id}`}
      >
        <i className="fas fa-envelope" />
      </EmailShareButton>
      <WhatsappShareButton
        url={`https://zenipsgaming.herokuapp.com/articles/${id}`}
      >
        <i className="fab fa-whatsapp" />
      </WhatsappShareButton>
      <PinterestShareButton
        media={thumbnail ? thumbnail : ""}
        url={`https://zenipsgaming.herokuapp.com/articles/${id}`}
      >
        <i className="fab fa-pinterest" />
      </PinterestShareButton>
      <RedditShareButton
        url={`https://zenipsgaming.herokuapp.com/articles/${id}`}
      >
        <i className="fab fa-reddit" />
      </RedditShareButton>
      <TumblrShareButton
        url={`https://zenipsgaming.herokuapp.com/articles/${id}`}
      >
        <i className="fab fa-tumblr" />
      </TumblrShareButton>
    </div>
  );
};

export default ArticleShare;
