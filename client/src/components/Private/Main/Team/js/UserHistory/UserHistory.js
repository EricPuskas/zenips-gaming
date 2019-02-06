import React from "react";
import Tabs from "../../../../../Common/Tabs/Tabs";
import Posts from "./Posts/Posts";
import PatchNotes from "./PatchNotes/PatchNotes";
import Articles from "./Articles/Articles";

const UserHistory = () => {
  return (
    <Tabs>
      <div label="Posts">
        <Posts />
      </div>
      <div label="Patch Notes">
        <PatchNotes />
      </div>
      <div label="Articles">
        <Articles />
      </div>
    </Tabs>
  );
};

export default UserHistory;
