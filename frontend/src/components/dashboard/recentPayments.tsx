import React from "react";
import { IoIosMore } from "react-icons/io";

interface PaymentsCardProps {
  username: string;
  amount: string;
  date: string;
}

const PaymentsCard = ({ username, amount, date }: PaymentsCardProps) => {
  return (
    <div className="flex flex-row justify-between my-4 p-2 bg-white rounded-md">
      <div className="flex flex-row">
        <div className="sm:h-10 h-8 sm:w-10 w-8 rounded-full bg-amber-200 sm:my-2 my-3 p-1"></div>
        <div>
          <div className="flex flex-row my-3 ml-4 ">
            <p className="font-bold sm:text-lg text-sm">{username}</p>
          </div>
        </div>
      </div>
      <div className="flex mt-2">
        <div className="font-semibold sm:text-lg text-sm  mx-6 sm:mt-0 mt-2">
          ₹{amount}.00
        </div>
        <div className="sm:block hidden font-medium mx-2">{date} Days ago</div>
        <div className="mx-4">
          <IoIosMore className="sm:mt-1 mt-2 h-5 w-5" />
        </div>
      </div>
    </div>
  );
};

export const RecentPayments = () => {
  return (
    <div className="sm:m-6 sm:px-14 m-4 p-4 h-full rounded-lg bg-gray-100">
      <div>
        <p className="font-semibold text-xl">Recent Supporters</p>
      </div>
      <div>
        <div className="mb-10">
          <PaymentsCard username="Rajath Shettigar" amount="100" date="2" />
          <PaymentsCard username="Pavan gowda" amount="500" date="6" />
          <PaymentsCard username="Rahul Maharaj" amount="200" date="10" />
          <PaymentsCard username="kejriwal gandhi" amount="50" date="10" />
        </div>
      </div>
    </div>
  );
};
