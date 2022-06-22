import React from "react";
import { Task } from "./task";
import { v4 } from "uuid";
import MySvg from "./MySvg";

interface EntireList {
  nav: string;
  list: Array<Task>;
  counter: Function;
}

const getToday: Date = new Date();
/*
function dateToString(date: Date | undefined): string {
  if (date) {
    return date.toISOString().split(`T`)[0]; // yyyy-MM-dd
  } else return ``;
}
*/

function TaskList(props: EntireList) {
  const setHeaderIcon = () => {
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

  /*const forDebug = () => {
    return alert(taskBase.inbox.forEach((t) => t.body));
  };*/
  const tagSet: Set<string> = new Set();

  const isThereAnyNoTagTask = (arr: Array<Task>) => {
    return arr.filter((t: Task) => t.tags.length === 0).length > 0;
  };

  const inbox: Task[] = props.list;

  inbox.forEach((t: Task) => {
    if (t.tags.length > 0) {
      t.tags.forEach((v: string) => {
        tagSet.add(v);
      });
    }
  });

  const tagButton = (v: Set<string>) => {
    let copy: Array<string> = Array.from(v);
    return (
      <>
        <section>
          <ul>
            <li key={v4()} hidden={copy.length < 1}>
              <input
                id="tagsAll"
                type="radio"
                name="tags"
                value="all"
                className="tagsAll"
                defaultChecked={true}
              />
              <label htmlFor="tagsAll">All</label>
            </li>
            {copy.map((e: string) => {
              let tempID = v4();
              return (
                <li key={tempID}>
                  <input
                    type={"radio"}
                    id={tempID}
                    name={"tags"}
                    value={e}
                    className={"tagChecked"}
                  />
                  <label htmlFor={tempID}>{e}</label>
                </li>
              );
            })}
            <li hidden={!isThereAnyNoTagTask(inbox)}>
              <input
                id="noTag"
                type="radio"
                name="tags"
                value="noTag"
                className="tagChecked"
              />
              <label htmlFor="noTag">•••</label>
            </li>
          </ul>
        </section>
      </>
    );
  };

  const tagIcon = (t: Task) => {
    if (t.tags.length > 0) {
      return t.tags.map((v: string) => {
        return (
          <span key={v} className="tag">
            {v}
          </span>
        );
      });
    }
  };

  const dueIcon = (t: Task) => {
    if (t.dueDate) {
      return (
        <img
          src={MySvg.Flag}
          alt="due date icon"
          className="floatRight detailIcon"
        />
      );
    }
  };

  const calcTilDue = (t: Task) => {
    if (t.dueDate) {
      let minus: number = Math.round(
        (t.dueDate.valueOf() - getToday.valueOf()) / (1000 * 60 * 60 * 24)
      );
      return (
        <span className="floatRight">
          {minus + (minus > 1 ? " days" : " day") + " left"}
        </span>
      );
    }
  };

  const passCounter = () => {
    return props.counter(inbox.length);
  };

  return (
    <main className="verticalFlexContainer">
      <header>
        <img src={setHeaderIcon()} alt={props.nav + " icon"} />
        <h1>{props.nav}</h1>
        {tagButton(tagSet)}
        {/*<button onClick={forDebug}>debug</button>*/}
      </header>

      <section className="verticalFlexContainer">
        <ul className="mainLists" onLoad={passCounter}>
          {inbox.map((t: Task) => {
            return (
              <li key={t.index}>
                <input
                  type="checkbox"
                  id={t.index + "counting"}
                  className="forCounting"
                  hidden={true}
                />
                <label htmlFor={t.index + "counting"} className="forCounting">
                  <input type="checkbox" id={t.index} className="forChecking" />
                  <label htmlFor={t.index}>
                    <span className="taskName">{t.body}</span>
                    {/*TODO: notes, sublist*/}
                    {tagIcon(t)}
                    {calcTilDue(t)}
                    {dueIcon(t)}
                  </label>
                </label>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default TaskList;
