import React, { useState } from "react";
import MySvg from "./MySvg";
import TaskList from "./TaskList";
import { Task } from "./task";
// import Test from "./Test";

function uploadFile(): void {
  document.getElementById(`upload`)!.click();
}

function App() {
  const [selectedNav, setSelectedNav] = useState(`Inbox`);
  const handleNavChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedNav(e.target.value);
  };

  const [textLines, setEntireText] = useState(Array<Task>);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    let file: Blob | null = null;

    if (e.target.files) {
      file = e.target.files![0];
    }

    fileReader.addEventListener("load", () => {
      setEntireText(
        fileReader
          .result!.toString()
          .trim()
          .split(`\n`)
          /*          .map((line: string) => {
            return new Task(line.trim());
          })*/
          .map((line: string) => {
            return new Task(line.trim());
          })
      );
    });

    if (file) {
      fileReader.readAsText(file);
    }
  };

  const [counts, setCounts] = useState(0);
  const getCounter = (c: number) => {
    setCounts(c);
  };

  return (
    <>
      {/*<Test />*/}
      <aside className="verticalFlexContainer">
        <nav>
          <ul className="navList">
            <li>
              <ul>
                <li>
                  <input
                    id="inbox"
                    type="radio"
                    name="nav"
                    value="Inbox"
                    defaultChecked={true}
                    onChange={handleNavChange}
                  />
                  <label htmlFor="inbox">
                    <img
                      src={MySvg.Inbox}
                      alt="todolist icon"
                      className="listIcon"
                    />
                    Inbox
                    <span className="counter" hidden={counts < 1}>
                      {counts}
                    </span>
                  </label>
                </li>
              </ul>
            </li>
            <li>
              <ul>
                <li>
                  <input
                    id="today"
                    type="radio"
                    name="nav"
                    value="Today"
                    onChange={handleNavChange}
                  />
                  <label htmlFor="today">
                    <img
                      src={MySvg.Sun}
                      alt="today icon"
                      className="listIcon"
                    />
                    Today
                  </label>
                </li>
                <li>
                  <input
                    id="upcoming"
                    type="radio"
                    name="nav"
                    value="Upcoming"
                    onChange={handleNavChange}
                  />
                  <label htmlFor="upcoming">
                    <img
                      src={MySvg.Calendar}
                      alt="upcoming icon"
                      className="listIcon"
                    />
                    Upcoming
                  </label>
                </li>
                <li>
                  <input
                    id="anytime"
                    type="radio"
                    name="nav"
                    value="Anytime"
                    onChange={handleNavChange}
                  />
                  <label htmlFor="anytime">
                    <img
                      src={MySvg.Coffee}
                      alt="anytime icon"
                      className="listIcon"
                    />
                    Anytime
                  </label>
                </li>
                <li>
                  <input
                    id="someday"
                    type="radio"
                    name="nav"
                    value="Someday"
                    onChange={handleNavChange}
                  />
                  <label htmlFor="someday">
                    <img
                      src={MySvg.BoxAlt}
                      alt="someday icon"
                      className="listIcon"
                    />
                    Someday
                  </label>
                </li>
              </ul>
            </li>
            <li>
              <ul>
                <li>
                  <input
                    id="logbook"
                    type="radio"
                    name="nav"
                    value="Logbook"
                    onChange={handleNavChange}
                  />
                  <label htmlFor="logbook">
                    <img
                      src={MySvg.Book}
                      alt="logbook icon"
                      className="listIcon"
                    />
                    Logbook
                  </label>
                </li>
                <li>
                  <input
                    id="trash"
                    type="radio"
                    name="nav"
                    value="Trash"
                    onChange={handleNavChange}
                  />
                  <label htmlFor="trash">
                    <img
                      src={MySvg.Bin}
                      alt="trash icon"
                      className="listIcon"
                    />
                    Trash
                  </label>
                </li>
              </ul>
            </li>
            {/* TODO: project list */}
            {/* TODO: area and sub project list */}
          </ul>
        </nav>
        <footer className="generalFooter">
          <button>
            <img src={MySvg.FolderAdd} alt="add project button" />
          </button>
          {/* TODO: setting feature */}
          <input
            id="upload"
            type="file"
            accept=".txt"
            hidden={true}
            onChange={handleFileChange}
          />
          <button id="uploadButton" onClick={uploadFile}>
            <img src={MySvg.Upload} alt="upload file button" />
          </button>
          <button>
            <img src={MySvg.Download} alt="export button" />
          </button>
        </footer>
      </aside>
      <section className="verticalFlexContainer">
        <TaskList nav={selectedNav} list={textLines} counter={getCounter} />
      </section>
    </>
  );
}

export default App;
