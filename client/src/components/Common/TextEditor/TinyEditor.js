import React, { Component } from "react";
import PropTypes from "prop-types";
import tinymce from "tinymce";
import templates from "./templates";
import "./plugins";
import style_formats from "./style";
import {
  media_url_resolver,
  toolbar,
  plugins,
  menubar,
  image_class_list
} from "./config";

class TinyEditor extends Component {
  constructor() {
    super();
    this.state = { editor: null };
  }
  componentDidMount() {
    tinymce.init({
      selector: `#${this.props.id}`,
      skin_url: `${process.env.PUBLIC_URL}/skins/lightgray`,
      menubar,
      plugins,
      toolbar,
      templates,
      media_url_resolver,
      image_class_list,
      style_formats,
      entity_encoding: "raw",
      format: "raw",
      importcss_append: true,
      image_advtab: true,
      branding: false,
      media_live_embeds: true,
      max_height: 550,
      end_container_on_empty_block: true,
      setup: editor => {
        this.setState({ editor });
        editor.on("keyup change", () => {
          const content = editor.getContent();
          this.props.onEditorChange(content);
        });
      }
    });
  }

  componentWillUnmount() {
    tinymce.remove(this.state.editor);
  }

  render() {
    const { id, value, onEditorChange, error, name } = this.props;
    return (
      <div className="form-group">
        <textarea
          id={id}
          value={value}
          onChange={e => onEditorChange(e.target.value)}
          name={name}
        />
        {error && <div className="errorMsg">{error}</div>}
      </div>
    );
  }
}

TinyEditor.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  onEditorChange: PropTypes.func.isRequired
};

export default TinyEditor;
