import React, { useState } from "react";
import { Task } from "./task";
import { v4 } from "uuid";
import MySvg from "./MySvg";
import { formatDistanceToNowStrict, isFuture, isPast, isToday } from "date-fns";

interface EntireList {
  nav: string;
  list: Array<Task>;
  inboxCounter: Function;
  todayCounter: Function;
  trashCounter: Function;
}

function isThereAnyNoTagTask(arr: Array<Task>) {
  return arr.filter((t: Task) => t.tags.length === 0).length > 0;
}

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

  const currentList: Task[] = props.list.filter((t: Task) => {
    /*    if (selectedTag === `noTag`) {
      return t.where === props.nav && t.tags.length === 0;
    }*/
    return t.where === props.nav;
  });

  currentList.forEach((t: Task) => {
    if (t.tags.length > 0) {
      t.tags.forEach((v: string) => {
        tagSet.add(v);
      });
    }
  });

  const [selectedTag, setSelectedTag] = useState("All");
  const handleTagButton = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTag(e.target.value);
  };

  const tagFiltering = currentList.filter((t: Task) => {
    switch (selectedTag) {
      case `noTag`:
        return t.where === props.nav && t.tags.length === 0;
      case `All`:
        return t.where === props.nav;
      default:
        return t.where === props.nav && t.tags.includes(selectedTag);
    }
  });

  const tagButton = (v: Set<string>) => {
    let copyFromTagSet: Array<string> = Array.from(v);
    return (
      <>
        <section>
          <ul>
            <li key={v4()} hidden={copyFromTagSet.length < 1}>
              <input
                id="tagsAll"
                type="radio"
                name="tags"
                value="All"
                className="tagsAll"
                checked={selectedTag === `All`}
                onChange={handleTagButton}
              />
              <label htmlFor="tagsAll">All</label>
            </li>
            {copyFromTagSet.map((e: string) => {
              let tempID = v4();
              return (
                <li key={tempID}>
                  <input
                    type={"radio"}
                    id={tempID}
                    name={"tags"}
                    value={e}
                    className={"tagChecked"}
                    checked={selectedTag === e}
                    onChange={handleTagButton}
                  />
                  <label htmlFor={tempID}>{e}</label>
                </li>
              );
            })}
            <li
              hidden={
                !isThereAnyNoTagTask(currentList) || copyFromTagSet.length === 0
              }
            >
              <input
                id="noTag"
                type="radio"
                name="tags"
                value="noTag"
                className="tagChecked"
                checked={selectedTag === "noTag"}
                onChange={handleTagButton}
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
          src={isFuture(t.dueDate) ? MySvg.Flag : MySvg.FlagRed}
          alt="due date icon"
          className="floatRight detailIcon"
        />
      );
    }
  };

  const calcTilDue = (t: Task) => {
    if (t.dueDate) {
      let diffDates: string = formatDistanceToNowStrict(t.dueDate);
      return (
        <>
          <span className={"floatRight" + (isFuture(t.dueDate) ? "" : " red")}>
            {isToday(t.dueDate) ? "Today" : null}
            {!isToday(t.dueDate) && isPast(t.dueDate) ? "Overdue" : null}
            {isFuture(t.dueDate) ? diffDates + " left" : null}
          </span>
        </>
      );
    }
  };

  // =================================== For Generate Counter ===================================
  const passInboxCounter = () => {
    let arrLength = props.list.filter((t: Task) => {
      return t.where === `Inbox`;
    });
    return props.inboxCounter(arrLength.length);
  };

  const passTodayCounter = () => {
    let arrLength = props.list.filter((t: Task) => {
      return t.where === `Today`;
    });
    return props.todayCounter(arrLength.length);
  };

  const passTrashCounter = () => {
    let arrLength = props.list.filter((t: Task) => {
      return t.where === `Trash`;
    });
    return props.trashCounter(arrLength.length);
  };

  const passCounter = () => {
    passInboxCounter();
    passTodayCounter();
    passTrashCounter();
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
          {tagFiltering.map((t: Task) => {
            return (
              <li key={t.index}>
                <input
                  type="checkbox"
                  id={t.index + "counting"}
                  className="forCounting"
                  name="checks"
                  hidden={true}
                />
                <label htmlFor={t.index + "counting"} className="forCounting">
                  <input
                    type="checkbox"
                    id={t.index}
                    className="forChecking"
                    name="tasks"
                  />
                  <label htmlFor={t.index}>
                    <span className="taskName">{t.body}</span>
                    {/*TODO: notes, subTasks*/}
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
