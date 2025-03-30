import React from "react";

const Streakscard = () => {
  return <div className="bg-gray-200 h-4 w-4 m-1"></div>;
};

const page = () => {
  const dates = [1, 2, 3, 4, 5, 6, 7, 8, 9, 20];
  return (
    <div className="mt-20">
      {dates.map((item, idx) => (
        <div key={idx}>
          <Streakscard />
        </div>
      ))}
    </div>
  );
};

export default page;
