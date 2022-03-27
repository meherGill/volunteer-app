import type { NextPage } from "next";
import { useEffect, useState } from "react";

import GMaps from "./GMaps";
import ProfilePicture from "./ProfilePicture";
import RequestAid from "./requestAid";
import Donate from "@components/Donate";

enum Components {
  MAP = "map",
  STATS = "stats",
  REQUEST_AID = "request aid",
  DONATE = "donate",
}

const MainUser = () => {
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [selectedItem, setSelectedItem] = useState("");

  useEffect(() => {
    const element = document.querySelector("#contentContainer") as HTMLElement;
    let styles = window.getComputedStyle(element);
    let height: string = styles.height;
    let width: string = styles.width;
    console.log(height, width);
    setWidth(width);
    setHeight(height);
    setSelectedItem(Components.REQUEST_AID);
    const selectedComp = document.querySelector("#requestAid") as HTMLElement;
    selectedComp.focus();
  }, []);

  const showComponent = () => {
    console.log(process.env.GCP_API_KEY);
    if (selectedItem === Components.STATS) {
      return <div></div>;
    } else if (selectedItem === Components.MAP) {
      return <GMaps width={width} height={height} />;
    } else if (selectedItem === Components.DONATE) {
      return <Donate />;
    } else if (selectedItem === Components.REQUEST_AID) {
      return <RequestAid />;
    }
  };
  return (
    <>
      <div className="flex h-full w-full justify-start">
        <div className="flex flex-col w-64 bg-btn-500 border-solid border-t-2 border-gray-800 divide-y divide-gray-800">
          <div>
            <ProfilePicture imgLocation="/profilePic.jpeg" />
          </div>
          <div>
            <button
              onClick={() => {
                setSelectedItem(Components.MAP);
              }}
              className="h-24 w-full focus:bg-gray-800 active:text-bg2-500 hover:bg-rose-200"
            >
              Find Nearby Opportunities
            </button>
          </div>
          <div>
            <button
              onClick={() => {
                setSelectedItem(Components.DONATE);
              }}
              className="h-24 w-full focus:bg-gray-800 focus:text-bg2-500 hover:bg-rose-200"
            >
              Quick Donate
            </button>
          </div>
          <div>
            <button
              onClick={() => {
                setSelectedItem(Components.REQUEST_AID);
              }}
              id="requestAid"
              className="h-24 w-full focus:bg-gray-800 focus:text-bg2-500 hover:bg-rose-200"
            >
              REQUEST AID
            </button>
          </div>
          <div>
            <button
              onClick={() => {
                setSelectedItem(Components.STATS);
              }}
              className="h-24 w-full focus:bg-gray-800 focus:text-bg2-500 hover:bg-rose-200"
            >
              STATS
            </button>
          </div>
        </div>
        <div
          id="contentContainer"
          className="grow-3 focus:bg-gray-800 focus:text-bg2-500 bg-gray-800 x-divide-2 y-divide-2"
        >
          {showComponent()}
        </div>
        <div className="w-40 bg-bg2-500 p-2"></div>
      </div>
      <div
        id="contentContainer"
        className="grow-3 focus:bg-gray-800 focus:text-bg2-500 bg-gray-800 x-divide-2 y-divide-2"
      >
        {showComponent()}
      </div>
      <div className="w-40 bg-bg2-500 p-2"></div>
    </>
  );
};

export default MainUser;
