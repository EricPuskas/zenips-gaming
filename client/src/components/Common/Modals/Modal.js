import React from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";

class Modal extends React.Component {
  render() {
    const {
      width,
      left,
      top,
      overlayDiv,
      dialogDiv,
      onOverlayClick,
      onDialogClick
    } = this.props;
    return (
      <div>
        <CSSTransitionGroup
          transitionName="modal-overlay-div"
          transitionAppear={true}
          transitionAppearTimeout={200}
          transitionEnter={false}
          transitionLeave={false}
        >
          <div className={overlayDiv} />
        </CSSTransitionGroup>
        <div className="modal-content-div" onClick={() => onOverlayClick()}>
          <CSSTransitionGroup
            transitionName="modal-dialog-div"
            transitionAppear={true}
            transitionAppearTimeout={200}
            transitionEnter={false}
            transitionLeave={false}
          >
            <div
              className={dialogDiv}
              style={{ width, left, top }}
              onClick={e => onDialogClick(e)}
            >
              <div className="modal-content">{this.props.children}</div>
            </div>
          </CSSTransitionGroup>
        </div>
      </div>
    );
  }
}

export default Modal;
