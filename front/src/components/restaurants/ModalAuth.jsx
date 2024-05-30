import Authentication from "../../pages/Authentication";

import { X } from "lucide-react";

function ModalAuth({ setModalAuth }) {
  return (
    <div className=" p-4 w-[100vw] h-[100%] absolute top-0 left-0 z-3">
      <div className=" w-screen h-screen fixed top-0 left-0 backdrop-blur-sm "></div>
      <div className=" w-[80%] h-screen/2 lg:w-1/3  absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 z-20 border-2 border-Washed-blue/200 rounded-md overflow-x-auto shadow-xl ">
        <div className="flex justify-end">
          <button
            onClick={() => setModalAuth(false)}
            className="bg-Washed-blue/600 text-white py-2 rounded-b-none rounded-tr-md"
          >
            <X size="24" />
          </button>
        </div>
        <Authentication modal={true} setModalAuth={setModalAuth} />
      </div>
    </div>
  );
}

export default ModalAuth;
