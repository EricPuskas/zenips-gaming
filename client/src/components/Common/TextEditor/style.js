const style_formats = [
  {
    title: "Headers",
    items: [
      { title: "Header 1", format: "h1" },
      { title: "Header 2", format: "h2" },
      { title: "Header 3", format: "h3" },
      { title: "Header 4", format: "h4" },
      { title: "Header 5", format: "h5" },
      { title: "Header 6", format: "h6" }
    ]
  },
  {
    title: "Inline",
    items: [
      { title: "Bold", icon: "bold", format: "bold" },
      { title: "Italic", icon: "italic", format: "italic" },
      { title: "_Underline", icon: "underline", format: "underline" },
      {
        title: "Strikethrough",
        icon: "strikethrough",
        format: "strikethrough"
      },
      {
        title: "Superscript",
        icon: "superscript",
        format: "superscript"
      },
      { title: "Subscript", icon: "subscript", format: "subscript" },
      { title: "Code", icon: "code", format: "code" }
    ]
  },
  {
    title: "Blocks",
    items: [
      { title: "Paragraph", format: "p" },
      { title: "Blockquote", format: "blockquote" },
      { title: "Div", format: "div" },
      { title: "Pre", format: "pre" }
    ]
  },
  {
    title: "Font Size",
    items: [
      {
        title: "8pt",
        inline: "span",
        styles: { fontSize: "12px", "font-size": "8px" }
      },
      {
        title: "10pt",
        inline: "span",
        styles: { fontSize: "12px", "font-size": "10px" }
      },
      {
        title: "12pt",
        inline: "span",
        styles: { fontSize: "12px", "font-size": "12px" }
      },
      {
        title: "14pt",
        inline: "span",
        styles: { fontSize: "12px", "font-size": "14px" }
      },
      {
        title: "16pt",
        inline: "span",
        styles: { fontSize: "12px", "font-size": "16px" }
      }
    ]
  }
];

export default style_formats;
