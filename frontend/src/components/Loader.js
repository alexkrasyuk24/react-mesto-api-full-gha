import React from "react";

const Loader = ({ isLoading }) => {
  return (
    <>
      {isLoading && (
        <div className="loader">
          <span className="loader__circle" />
        </div>
      )}
    </>
  );
};

export default Loader;
