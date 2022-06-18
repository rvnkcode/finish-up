import React from 'react';
import Counter from "./Counter";
import Trash from "./Trash";
import MySVG from "./MySVG";

function Aside() {
  return (
    <aside>
      <nav>
        <ul className="navList">
          <li>
            <ul>
              <li><input id="inbox" type="radio" name="nav" value="inbox"/><label
                htmlFor="inbox"><img src={MySVG.Inbox}
                                     alt="inbox icon"/>Inbox
                <Counter/>
              </label>
              </li>
            </ul>
          </li>
          <li>
            <ul>
              <li><input id="today" type="radio" name="nav" value="today"/><label
                htmlFor="today"><img src={MySVG.Sun}
                                     alt="today icon"/>Today
                <Counter/>
              </label>
              </li>
              <li><input id="upcoming" type="radio" name="nav" value="upcoming"/><label
                htmlFor="upcoming"><img src={MySVG.Calendar}
                                        alt="upcoming icon"/>Upcoming</label>
              </li>
              <li><input id="anytime" type="radio" name="nav" value="anytime"/><label
                htmlFor="anytime"><img src={MySVG.Coffee}
                                       alt="anytime icon"/>Anytime</label>
              </li>
              <li><input id="someday" type="radio" name="nav" value="someday"/><label
                htmlFor="someday"><img src={MySVG.BoxAlt}
                                       alt="someday icon"/>Someday</label>
              </li>
            </ul>
          </li>
          <li>
            <ul>
              <li><input id="logbook" type="radio" name="nav" value="logbook"/><label
                htmlFor="logbook"><img src={MySVG.Book}
                                       alt="logbook icon"/>Logbook</label>
              </li>
              <Trash/>
            </ul>
          </li>
          {/* Project start */}
          <li>
            <ul>
              <li><input id="project1" type="radio" name="nav" value="project1"/><label htmlFor="project1"><img
                src={MySVG.LineChart} alt="project icon"/>Project1</label>
              </li>
            </ul>
          </li>
          {/* Project end */}
          {/* Area start */}
          <li>
            <ul>
              <li><input id="area1" type="radio" name="nav" value="area1"/><label htmlFor="area1"><img
                src={MySVG.Layers} alt="area icon"/>Area1</label>
              </li>
              {/* SubProject start */}
              <li>
                <ul>
                  <li><input id="project of area1" type="radio" name="nav" value="project of area1"/><label
                    htmlFor="project of area1"><img src={MySVG.LineChart} alt="project icon"/>project of
                    Area1</label></li>
                </ul>
              </li>
              {/* SubProject end */}
            </ul>
          </li>
          {/* Area end */}
        </ul>
      </nav>
      <footer>
        <button><img src={MySVG.FolderAdd} alt="add project button"/></button>
        {/* TODO: setting feature <button><img src="../public/svg/plus.svg" alt="setting button"/></button>*/}
        <input type="file" accept=".txt"/>
        <button><img src={MySVG.Upload} alt="upload file button"/></button>
        <button><img src={MySVG.Download} alt="export button"/></button>
      </footer>
    </aside>
  );
}

export default Aside;