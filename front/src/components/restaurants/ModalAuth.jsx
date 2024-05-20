import React from "react";
import Authentication from "../../pages/Authentication";

import { X } from "lucide-react";

function ModalAuth({ setModalAuth }) {
  return (
    <div className="bg-white p-4 opacity-90 w-[100vw] h-[100%] absolute top-0 left-0 z-10">
      <div className=" w-[80%] h-[80%] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white opacity-100 p-4 z-20 border-[1px] border-black rounded-md">
        <div className="flex justify-end">
          <button onClick={() => setModalAuth(false)}>
            <X size="24" />
          </button>
        </div>
        <Authentication modal={true} setModalAuth={setModalAuth} />
      </div>
    </div>
  );
}

export default ModalAuth;
