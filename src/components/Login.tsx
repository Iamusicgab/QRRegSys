import logo from "../assets/logo.png";
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
      <div className="flex flex-col items-center gap-y-4 mt-10 mx-8">
        <img src={logo} title="Dream Express" className="p-2" />
        <h1 className="text-xl w-fit text-center">Orgs Registration Page</h1>
        <button className="btn btn-secondary w-full" onClick={loginGoogle}>
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAd1JREFUSEvdlU2ITlEYx3+/ha+Qha3NpCkiGgtfkeWQLMWUBVaWRikLzcIkTSFbq7HxlQVJrJQyFlaKEFJigxSRUHh0pjt13Pee971NTcqzees9//P8zvO/9/yvzHA5w/3594CIWAMMAuuAjTB5qKfAc+CGeq2bC8UJImI2MAYc7GHjBLBTfdukawRExHLgCrCi5TMaU4+0AkTEXOAh0N+w4RnwE1gKJF2qi8Ae9XdbwGlgOBP/AI4DZ9X36f+ImAWMAGnSXeqv0qR/WRQRW4A7mfgLMKC+bGlVh6wOuAAMZar96vh0m6d9dcB9YG3V8LO6KG8eEfOAWz2Ao+rtKU0d8AFYXC1OqJtrgAVAsq1bHVZPlgBvgCXV4j110zQAw+qZEuA6sKNa/AbMV2NKXLAoTbwyO8hu9XIJMAoczcT71HPd/IiIU8ChTNOnvioB+oAn2SX6BKxWXzdBImIVkKJiYbX+WM2n6UzTiEhX/kTW8COwV032TVaVUweAY0D+pg2pl/LDdGRRdUsfNORQAr0A0puUomJObaqb6vb6pKWwWwZcBdJvm7oLbFO/tgJkNiSr8gdY3/8dSNk1Usqjnl+0iBgAtgIbgPXV7X+UPjbAefVdtxF7Atr4838D/gALIpUZ0F7UGAAAAABJRU5ErkJggg=="
            alt=""
          />
          Sign In with One-Bosco
        </button>
        <button
          className="btn btn-primary w-full"
          onClick={() => {
            if (document) {
              (
                document.getElementById("my_modal_use") as HTMLFormElement
              ).showModal();
            }
          }}
        >
          How to use
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
      <dialog id="my_modal_use" className="modal modal-bottom sm:modal-middle">
        <form method="dialog" className="modal-box text-center">
          <b>
            <i>May org na ba ang beshie ko? 🤣🤣🤣</i>
          </b>
          <br />
          <br />
          <i>👇 Kung wala, register na! 👇</i>
          <br />
          <br />
          1: Sign in with your Don Bosco Email
          <br />
          2: Scan the QR Code from your Org
          <br />
          3: Confirm and you're now registered!
          <br />
          <br />
          <i>✨ Ayun lang beh, registered ka na ✨</i>
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
          <div className="modal-action">
            <button className="btn">Ok</button>
          </div>
        </form>
      </dialog>
    </>
  );
}
