import React from "react";
import MySVG from "./MySVG";

function Trash() {
  return (
    <li><input id="trash" type="radio" name="nav" value="trash"/><label
      htmlFor="trash"><img src={MySVG.Bin}
                           alt="trash icon"/>Trash</label></li>
  )
}

export default Trash;