import React from "react";
import { Link } from "react-router-dom";
import { Table, TableBody, TableHead } from "mdbreact";
import Moment from "react-moment";

class MessageBox extends React.Component {
  onMessageClick = msg => {
    let MSG_PROPS = {
      width: "60%",
      left: "20%",
      message: msg
    };
    this.props.loadModal("MESSAGE", MSG_PROPS);
  };
  render() {
    const { preview, inbox } = this.props;
    const preview_msg = preview.map(msg => (
      <tr
        key={msg._id}
        className="message-item"
        onClick={() => this.onMessageClick(msg)}
      >
        <td>{msg.sender.name}</td>
        <td>{msg.subject}</td>
        <td style={{ width: "15%" }}>
          <i className="fas fa-clock" />{" "}
          <Moment fromNow>{msg.createdAt}</Moment>
        </td>
      </tr>
    ));
    return (
      <div>
        <div className="message-box">
          <Table>
            <TableHead>
              <tr>
                <th>You have {inbox} messages</th>
                <th />
                <th />
              </tr>
            </TableHead>
            <TableBody>{preview_msg}</TableBody>
          </Table>
        </div>
        <Link to="/dashboard/inbox" className="btn btn-green-c">
          Inbox
        </Link>
        <Link to="/dashboard/archive" className="btn btn-red-c">
          Archive
        </Link>
      </div>
    );
  }
}

export default MessageBox;
