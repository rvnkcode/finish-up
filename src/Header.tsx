import React from "react";
import MySvg from "./MySvg";

interface NavValue {
  nav: string;
}

function Header(props: NavValue) {
  const setIcon = () => {
    switch (props.nav) {
      case "Inbox":
        return MySvg.Inbox;
      case "Today":
        return MySvg.Sun;
      case "Upcoming":
        return MySvg.Calendar;
      case "Anytime":
        return MySvg.Coffee;
      case "Someday":
        return MySvg.BoxAlt;
      case "Logbook":
        return MySvg.Book;
      case "Trash":
        return MySvg.Bin;
    }
  };
  return (
    <header>
      <img src={setIcon()} alt={props.nav + " icon"} />
      <h1>{props.nav}</h1>
    </header>
  );
}

export default Header;
