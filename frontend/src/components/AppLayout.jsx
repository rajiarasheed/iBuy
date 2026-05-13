import React, { memo } from "react";

import Navbar from "./ui/Navbar";

const AppLayout = ({ children }) => {

  return (
    <div>
      <Navbar/>
      <main>{children}</main>
    </div>
  );
};

export default memo(AppLayout);
