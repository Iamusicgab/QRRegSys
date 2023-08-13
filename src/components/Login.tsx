import { auth } from "./Firebase";
import { useNavigate } from "react-router-dom";
import {
  signInWithPopup,
  onAuthStateChanged,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";

export function Login() {
  const nav = useNavigate();
  const domainMatch = new RegExp(/^[A-Za-z0-9._%+-]+@donbosco\.edu\.ph$/gm);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      if (user.email.match(domainMatch)) {
        nav("/");
      } else {
        signOut(auth);
        if (document) {
          (
            document.getElementById("my_modal_5") as HTMLFormElement
          ).showModal();
        }
      }
    }
  });
  const loginGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((user) => {
        if (user.user.email.match(domainMatch)) {
          nav("/");
        } else {
          signOut(auth);
          if (document) {
            (
              document.getElementById("my_modal_5") as HTMLFormElement
            ).showModal();
          }
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <>
      <div className="flex flex-col items-center gap-y-4 mt-10">
        <h1 className="text-xl w-fit text-center">Dream Express</h1>
        <h1 className="text-xl w-fit text-center">Orgs Registration Page</h1>
        <button className="btn btn-secondary" onClick={loginGoogle}>
          Sign In with One-Bosco Google
        </button>
      </div>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <form method="dialog" className="modal-box">
          <div className="alert alert-error">
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
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>
              Login Failed!<br></br>
              <b>Please use your Don Bosco Email</b>
            </span>
          </div>
          <div className="modal-action">
            <button className="btn">Confirm</button>
          </div>
        </form>
      </dialog>
    </>
  );
}
