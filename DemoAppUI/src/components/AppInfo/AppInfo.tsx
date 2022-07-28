import React, { forwardRef } from "react";
import AppProcessCards from "./AppProcessCards";
import Slider from "react-slick";

const AppInfo = forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      <AppProcessCards />
    </div>
  );
});

AppInfo.displayName = "AppInfo";
export default AppInfo;
