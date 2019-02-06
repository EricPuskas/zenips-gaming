const ytOptimizer = () => {
  let v = document.getElementsByClassName("yt-player");
  for (let n = 0; n < v.length; n++) {
    v[n].onclick = function() {
      let iframe = document.createElement("iframe");
      iframe.setAttribute(
        "src",
        "//www.youtube.com/embed/" +
          this.dataset.id +
          "?autoplay=1&mute=1&autohide=2&border=0&wmode=opaque&enablejsapi=1&rel=" +
          this.dataset.related +
          "&controls=" +
          this.dataset.control +
          "&showinfo=" +
          this.dataset.info
      );
      iframe.setAttribute("frameborder", "0");
      iframe.setAttribute("allow", "autoplay, fullscreen");
      iframe.setAttribute("id", "youtube-iframe");
      iframe.setAttribute(
        "style",
        "width: 100%; height: 100%; position: absolute; top: 0; left: 0;"
      );
      if (this.dataset.fullscreen === 1) {
        iframe.setAttribute("allowfullscreen", "");
      }
      while (this.firstChild) {
        this.removeChild(this.firstChild);
      }
      this.appendChild(iframe);
    };
  }
};

export default ytOptimizer;
