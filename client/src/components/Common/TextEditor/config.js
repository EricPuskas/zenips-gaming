export const media_url_resolver = (data, resolve, reject) => {
  if (data.url.indexOf("youtube") !== -1) {
    let yt = "https://www.youtube.com/watch?v=";
    let url = data.url.substr(yt.length);
    let video = `<div class="embed-responsive embed-responsive-16by9">			
    <div class="yt-player" data-id="${url}" data-related="0" data-control="1" data-info="1" data-fullscreen="1">
    <img src="//i.ytimg.com/vi/${url}/maxresdefault.jpg"> 
    <div class="yt-player-control"></div>
   </div> 						
  </div>`;
    resolve({ html: video });
  } else {
    resolve({ html: "" });
  }
};

export const toolbar =
  "fullscreen | help | styleselect formatselect | blockquote bold italic strikethrough | forecolor backcolor | link removeformat | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent";

export const plugins =
  "help template autolink charmap code colorpicker contextmenu fullscreen hr image imagetools importcss insertdatetime link lists media nonbreaking pagebreak paste preview print searchreplace tabfocus table textcolor textpattern wordcount";

export const menubar = "file edit view insert format";

export const image_class_list = [
  { title: "None", value: "" },
  { title: "img-responsive", value: "img-responsive" }
];
