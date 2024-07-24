import React from 'react';

const CardDataStats = ({
  title,
  total,
  children,
}) => {
  return (
    <div className="w-[14rem] border bg-white rounded-lg shadow-md p-4">
      <div className="mx-12 w-[100px]   rounded-full ">
        {children}
      </div>

      <div className="mt-4 text-center">
        <h4 className="text-4xl font-bold text-black dark:text-black">
          {total}
        </h4>
        <span className="text-lg font-medium text-gray-600 dark:text-gray-400">
          {title}
        </span>
      </div>
    </div>
  );
};

export default CardDataStats;
