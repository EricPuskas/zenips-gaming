import React from "react";
import {
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
  let url = `https://zenipsgaming.herokuapp.com/articles/${id}`;
  return (
    <div className={shareClass}>
      {/* <FacebookShareButton
        url={`https://zenipsgaming.herokuapp.com/articles/${id}`}
      >
        <i className="fab fa-facebook-f" />
      </FacebookShareButton> */}
      <button
        className="btn btn-primary btn-lg"
        onClick={() =>
          window.open(
            "https://www.facebook.com/sharer/sharer.php?u=" +
              encodeURIComponent(url),
            "facebook-share-dialog",
            "width=756,height=336"
          )
        }
      >
        Facebook
      </button>
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
