import React from "react";
import {
  Router,
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import SideBar from "./SideBar";
import Content from "./Content";

function CoreResources() {
  return (
    <>
      <Content Category="Core Resources" />
    </>
  );
}

function Plugin() {
  return (
    <>
      <Content Category="Plugin" />
    </>
  );
}

function Layout() {
  let location = useLocation();

  // The `backgroundLocation` state is the location that we were at when one of
  // the gallery links was clicked. If it's there, use it as the location for
  // the <Routes> so we show the gallery in the background, behind the modal.
  let state = location.state as { backgroundLocation?: Location };

  return (
    <div>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/API_Dashboard" element={<SideBar />}>
          <Route
            path="/API_Dashboard/CoreResources"
            element={<CoreResources />}
          />
          <Route path="/API_Dashboard/Plugin" element={<Plugin />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

function Modal() {
  let navigate = useNavigate();

  let buttonRef = React.useRef<HTMLButtonElement>(null);
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to homepage</Link>
      </p>
    </div>
  );
}

export default Layout;
