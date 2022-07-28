import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Layout from "../components/APIDocs/Layout";

const API_dashboard = () => {
  return (
    <>
      <Router>
        <Layout />
      </Router>
    </>
  );
};

export default API_dashboard;
