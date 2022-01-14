import React from "react";

export const NotFound = (props) => {
  return (
    <div className="flex flex-row justify-center items-center text-amber-500 ">
      <h1 className="text-4xl">
        Ooops. It looks like the resource you were requesting does not exist
      </h1>
    </div>
  );
};
