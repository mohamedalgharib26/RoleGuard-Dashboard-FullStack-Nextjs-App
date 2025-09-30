import Loader from "@/Components/Loader";
import React from "react";

function loading() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen ">
      <Loader loading={true} />
    </div>
  );
}

export default loading;
