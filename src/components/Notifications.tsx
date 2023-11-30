import React, { useState } from "react";
import Data from "../../data.json";

export default function Notifications() {
  const [userData, setUserData] = useState(Data);

  const markAsRead = () => {
    const clone = [...userData].map((item) => {
      item.hasBeenRead = true;
      return item;
    });
    setUserData(clone);
  };

  const handleSingleClick = (index) => {
    const clone = [...userData];
    clone[index].hasBeenRead = true;
    setUserData(clone);
  };

  return (
    <div className="bg-[#FFF] w-[730px] px-7 pt-8 rounded-2xl shadow-[0px_20px_60px_0px_rgba(73,97,168,0.05)]">
      <header className="flex justify-between items-center">
        <div className="flex items-center gap-[11px]">
          <p className="text-2xl font-extrabold">Notifications</p>
          <span className="bg-[#0A327B] px-[13px] py-[4px] rounded-[6px] text-white font-extrabold text-base">
            {userData.filter((item) => !item.hasBeenRead).length}
          </span>
        </div>
        <p
          onClick={markAsRead}
          className="text-[#5E6778] font-medium hover:text-[#0A327B] cursor-pointer"
        >
          Mark all as read
        </p>
      </header>

      <main className="mt-8 flex-col gap-[30px]">
        {userData.map((item, index) => {
          return (
            <>
              <div
                onClick={() => {
                  handleSingleClick(index);
                }}
                className={`flex items-start gap-[19px] mb-2 rounded-lg py-4 pl-5 ${
                  item.hasBeenRead ? "bg-transperent" : "bg-[#F7FAFD]"
                }`}
              >
                <img
                  src={`./images/avatar-${item.author
                    .replace(" ", "-")
                    .toLowerCase()}.webp`}
                  alt="author-icon"
                  className="w-[45px]"
                />

                <div className="flex-col">
                  <div className="flex items-center">
                    <span className="w-auto text-[#1C202B] font-extrabold hover:text-[#0A327B] cursor-pointer">
                      {item.author}
                    </span>
                    <span className="w-auto mx-2.5 text-[#5E6778] font-medium">
                      {item.action}
                    </span>
                    {item.link.includes(".webp") ? (
                      <img className="w-10 h-10" src={item.link} />
                    ) : (
                      <span
                        className={`${
                          item.action == "left the group" ||
                          item.action == "has joined your group"
                            ? "text-[#0A327B]"
                            : ""
                        } font-extrabold cursor-pointer w-auto ${
                          item.hasBeenRead ? "text-[#5E6778]" : "text-[#0A327B]"
                        }`}
                      >
                        {item.link}
                      </span>
                    )}
                    <span
                      className={`w-2 h-2 bg-[#F65552] ml-2 rounded-full ${
                        item.hasBeenRead ? "hidden" : "block"
                      }`}
                    ></span>
                  </div>
                  <p className="text-[#939CAD] font-medium">{item.time}</p>
                  <div
                    className={`${
                      item.private
                        ? "px-6 py-4 border-2 rounded-md mt-3 font-medium text-[#5E6778] hover:bg-[#E5EFFA] cursor-pointer"
                        : ""
                    }`}
                  >
                    {item.private}
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </main>
    </div>
  );
}
