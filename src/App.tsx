import { Signin } from "./components/Signin";
import { useState } from "react";
import { loginGoogle, signOutUser, onAuthChange } from "./components/Firebase";
import { QrScanner } from "@yudiel/react-qr-scanner";
import "./index.css";

onAuthChange();

function App() {
  const [qrResult, setQrResult] = useState("null");
  return (
    <>
      <Signin loginGoogle={loginGoogle} />

      <div>
        <button className="btn" onClick={signOutUser}>
          Sign Out
        </button>
        <div id="reader" />
      </div>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <form method="dialog" className="modal-box">
          <div className="alert alert-warning">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span>
              You are about to register to {qrResult}
              <br></br>Do you want to continue? You are not allowed to register
              to another Org after confirming
            </span>
          </div>
          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-primary">Confirm</button>
            <button className="btn">Close</button>
          </div>
        </form>
      </dialog>
      <div>
        <QrScanner
          onDecode={(result) => {
            setQrResult(result);
            console.log(result);
            if (document) {
              (
                document.getElementById("my_modal_5") as HTMLFormElement
              ).showModal();
            }
          }}
          onError={(error) => {
            console.log(error);
          }}
          scanDelay={500}
        />
      </div>
    </>
  );
}

export default App;
