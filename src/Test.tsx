import React, { useState } from "react";

function Test() {
  const [selectedMenu, setSelectedMenu] = useState("inbox");

  const handleRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedMenu(e.target.value);
  };

  return (
    <section>
      <header>
        <h1>This is the test section</h1>
      </header>
      <ul>
        <li>
          <input
            type="radio"
            id={"inbox"}
            name={"nav"}
            value={"inbox"}
            onChange={handleRadio}
            defaultChecked={true}
          />
          <label htmlFor={"inbox"}>inbox</label>
        </li>
        <li>
          <input
            type="radio"
            id={"today"}
            name={"nav"}
            value={"today"}
            onChange={handleRadio}
          />
          <label htmlFor={"today"}>today</label>
        </li>
        <li>
          <input
            type="radio"
            id={"someday"}
            name={"nav"}
            value={"someday"}
            onChange={handleRadio}
          />
          <label htmlFor={"someday"}>someday</label>
        </li>
      </ul>
      <div>{selectedMenu}</div>
    </section>
  );
}

export default Test;
