import React, { forwardRef } from "react";
import AppProcessCards from "./AppProcessCards";

const AppInfo = forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      <AppProcessCards />
    </div>
  );
});

AppInfo.displayName = "AppInfo";
export default AppInfo;
