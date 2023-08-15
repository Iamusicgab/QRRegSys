import { useEffect, useState } from "react";
import { auth, db } from "./Firebase";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { QrScanner } from "@yudiel/react-qr-scanner";

export function Dashboard() {
  const [qrResult, setQrResult] = useState({
    orgName: "null",
    orgManager: "null",
  });
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [uid, setUid] = useState(null);
  const [photoUrl, setPhotoUrl] = useState("");
  const [registered, setRegistered] = useState(true);
  const [orgName, setOrgName] = useState(null);
  const [loading, setLoading] = useState(null);
  const navigate = useNavigate();
  const orgConfirm = () => {
    setOrgName(qrResult.orgName);
    console.log("Button Clicked and registered to " + qrResult.orgName);
    setDoc(doc(db, "users", uid), {
      email: email,
      name: name,
      registered: true,
      orgName: qrResult.orgName,
    });
    setRegistered(true);

    const formData = new FormData();
    formData.append("Name", name);
    formData.append("Email", email);
    formData.append("Org", qrResult.orgName);

    fetch(
      "https://script.google.com/macros/s/AKfycbwvswAO-stZMUzqF5XkHJhta1UPhjwBEeCGxhsQhQPAY0gEZL3QQ365z74Jr7fvOS6CGg/exec",
      {
        method: "POST",
        body: formData,
      }
    );
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail(user.email);
        setName(user.displayName);
        setPhotoUrl(user.photoURL);
        setUid(user.uid);
        getDoc(doc(db, "users", user.uid)).then((docSnap) => {
          if (docSnap.exists()) {
            setRegistered(true);
            setOrgName(docSnap.data().orgName);
            setLoading("hidden");
          } else {
            setRegistered(false);
            setLoading("hidden");
          }
        });
      } else {
        navigate("/login", { replace: true });
      }
    });
  });

  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">Dream Express</a>
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={photoUrl} alt="" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[10] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li className="pl-2 pr-4 pt-1 mb-2 text-lg font-bold">{name}</li>
              <li>
                <button
                  onClick={() => {
                    signOut(auth);
                  }}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div
        className={
          "fixed bg-base-100 w-full h-full flex justify-center  " + loading
        }
      >
        <span className="loading loading-spinner text-primary loading-lg"></span>
      </div>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-xl">{qrResult.orgName}</h3>
          <h3 className="text-md mb-4">{qrResult.orgManager}</h3>
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
              Are you sure you want to register to this Org?<br></br>
              <b>You can only register once</b>
            </span>
          </div>
          <div className="modal-action">
            <button className="btn btn-primary" onClick={orgConfirm}>
              Register
            </button>
            <button className="btn">Cancel</button>
          </div>
        </form>
      </dialog>
      <div>
        {registered ? (
          <>
            <div className="flex flex-col px-10 mt-10">
              <div className="alert alert-success">
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Registered to {orgName}</span>
              </div>
              <div className="alert alert-info mt-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="stroke-current shrink-0 w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span>
                  For any concerns, proceed to the Registration Inquiry Booth
                </span>
              </div>
            </div>
          </>
        ) : (
          <div className="">
            <QrScanner
              onDecode={(result) => {
                setQrResult(JSON.parse(result));
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
        )}
      </div>
    </>
  );
}
