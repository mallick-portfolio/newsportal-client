"use client";
import React from "react";
import isAuth from "../lib/utils/IsAuth";

const Dashboard = () => {
  return (
    <div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima id
      exercitationem quis ad omnis dolore aperiam corrupti, sequi praesentium
      neque voluptatum culpa obcaecati quae iste laborum tempore odit itaque
      incidunt.
    </div>
  );
};

export default isAuth(Dashboard);
