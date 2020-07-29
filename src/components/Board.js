import React, { useState } from "react";

function Board() {
  // Declare a new state variable, which we'll call "count"
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    const { value } = event.target;
    setValue(value);
  }

  return (
    <React.Fragment>
      <form>
        <input
          type="text"
          value={value}
          onChange={handleChange}
        />
      </form>
      {value}
    </React.Fragment>
  );
}

export default Board;
