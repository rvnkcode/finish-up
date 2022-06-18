import React from "react";
import MySVG from "./MySVG";

function MainSection() {
  return (
    <section>
      <main>
        <header>
          <img src={MySVG.Inbox} alt="inbox icon"/>
          <h1>Inbox</h1>
          <section>
            <ul>
              <li><input id="tagsAll" type="radio" name="tags" value="all" className="tagsAll"/><label
                htmlFor="tagsAll">All</label></li>
              <li><input id="tag1" type="radio" name="tags" value="tag1" className="tagChecked"/><label
                htmlFor="tag1">tag1</label>
              </li>
              <li><input id="tag2" type="radio" name="tags" value="tag2" className="tagChecked"/><label
                htmlFor="tag2">tag2</label>
              </li>
            </ul>
          </section>
        </header>
        <section className="sectionForNotification">
          <p>1 to-do was moved out of the Inbox</p>
          <button>OK</button>
        </section>
        <section>
          <ul className="todoLists">
            <li><input id="indexNo1" type="checkbox" className="forCounting"/><label htmlFor="indexNo1"
                                                                                     className="fullWidth">
              <input id="to do 1" type="checkbox" className="forChecking"/><label htmlFor="to do 1"><span
              className="todoName">To do 1</span><img
              src={MySVG.Sticker} alt="note icon"/><img
              src={MySVG.TagAlt} alt="sub list icon"/><span className="tag">tag1</span><span
              className="tag">tag2</span><span className="floatRight">12 days left</span><img
              src={MySVG.Flag} alt="due date icon"
              className="floatRight"/></label></label>
            </li>
          </ul>
        </section>
      </main>
      <footer>
        <button className="mainFooter"><img src={MySVG.Plus} alt="add task button"/></button>
        <button className="mainFooter"><img src={MySVG.Close} alt="delete button"/></button>
        <button className="mainFooter"><img src={MySVG.CalendarAdd} alt="add schedule button"/></button>
        <button className="mainFooter"><img src={MySVG.ArrowRight} alt="move task button"/></button>
        <button className="mainFooter"><img src={MySVG.Search} alt="search button"/></button>
      </footer>
    </section>
  );
}

export default MainSection;