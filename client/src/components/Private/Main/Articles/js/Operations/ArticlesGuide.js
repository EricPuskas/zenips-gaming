import React from "react";

const ArticlesGuide = () => {
  return (
    <div className="guidelines">
      <h1> Guidelines </h1>
      <ul>
        <li style={{ color: "red" }}>
          Current character limits are subject to change.
        </li>
        <li>
          In the Content Editor, always add images and videos AFTER you wrote
          the article. This is neccessary due to formatting reasons, in order to
          avoid any issues, this has proven to be the most effective method.
        </li>
        <li>
          Keep it simple and avoid useless content and avoid using jargon as
          much as possible.
        </li>
        <li>
          Thumbnail image uploaded must be 1280x720.
          <ul>
            <li>
              It can be uploaded via URL or by uploading a file from your
              computer.
            </li>
            <li>
              In the Content Editor, when inserting an image, always make sure
              to select the img-responsive class and then hit OK.
            </li>
            <li>
              In the Content Editor, inserted images should not be larger than
              960x540.
            </li>
          </ul>
        </li>
        <li>Keep the introduction short and to the point.</li>
        <li>
          Against copyrights, please add the name of the author and a link to
          their website/blog/source of image/anything that can credit them.
          <ul>
            <li>
              If the image uploaded is not subject to copyright do not edit the
              Credits.
            </li>
          </ul>
        </li>
        <li>
          Do not copy other articles, in terms of structure and content, the
          articles must be unique.
          <ul>
            <li>
              If you have to quote someone, you can put that into a BLOCKQUOTE.
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default ArticlesGuide;
