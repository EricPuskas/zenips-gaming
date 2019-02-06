import React, { Component } from "react";
import classNames from "classnames";
class Tag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false
    };
  }
  toggleSelected = id => {
    if (this.state.selected === false) {
      this.setState({ selected: true });
      this.props.addTagToArray(id);
    } else {
      this.setState({ selected: false });
      this.props.removeTagFromArray(id);
    }
  };

  render() {
    let tagClasses = classNames({
      "tag-item": true,
      "tag-selected": this.state.selected
    });
    const { tag } = this.props;
    return (
      <div className={tagClasses} onClick={() => this.toggleSelected(tag._id)}>
        {tag.name}
        <input type="hidden" name="tag" value={tag._id} />
      </div>
    );
  }
}

export default Tag;
