import { useState } from "react";

export function Admin() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [org, setOrg] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("Name", name);
    formData.append("Email", email);
    formData.append("Org", org);

    fetch(
      "https://script.google.com/macros/s/AKfycbwvswAO-stZMUzqF5XkHJhta1UPhjwBEeCGxhsQhQPAY0gEZL3QQ365z74Jr7fvOS6CGg/exec",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((response) => {
        console.log("Success", response);
        if (document) {
          (
            document.getElementById("my_modal_success") as HTMLFormElement
          ).showModal();
        }
      })
      .catch((error) => {
        console.error("Error", error);
        if (document) {
          (
            document.getElementById("my_modal_failed") as HTMLFormElement
          ).showModal();
        }
        setError(error);
      });
  }
  return (
    <>
      <div className="flex justify-center">
        <form
          className="form flex flex-col gap-y-5 mx-5 mt-10 w-full md: max-w-sm"
          onSubmit={(e) => handleSubmit(e)}
        >
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name"
            name="Name"
            className="input input-bordered w-full"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
            name="Email"
            className="input input-bordered w-full"
          />
          <select
            title="Org"
            className="select select-bordered w-full"
            onChange={(e) => setOrg(e.target.value)}
            value={org}
          >
            <option>Orgs...</option>
            <option>Ad Lib (A&D)</option>
            <option>AM Cafe</option>
            <option>Basketball</option>
            <option>Boses (Advocacy)</option>
            <option>Braga Gazette - BBN</option>
            <option>Badminton Club</option>
            <option>Eskapo (Mountaineering)</option>
            <option>Football</option>
            <option>Greywolves</option>
            <option>Music Club</option>
            <option>Praxis (HUMSS Org)</option>
            <option>Reps for Jesus (Fitness)</option>
            <option>Rover Scouts</option>
            <option>Start-Up (ABM Org)</option>
            <option>Table Top</option>
            <option>Tech Team Math (STEM Org)</option>
            <option>Tech Team Science (STEM Org)</option>
            <option>Robotics (STEM Org)</option>
            <option>Test Tubes (Film-making)</option>
            <option>Volleyball</option>
            <option>Youth Power</option>
            <option>Braga Dance Crew</option>
          </select>
          <input className="btn btn-primary" type="submit" />
        </form>
      </div>
      <dialog
        id="my_modal_success"
        className="modal modal-bottom sm:modal-middle"
      >
        <form method="dialog" className="modal-box">
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
            <span>
              <b>User registered!</b>
              <br />
              {name}
              <br />
              {email}
              <br />
              {org}
            </span>
          </div>
          <div className="modal-action">
            <button className="btn btn-primary">Ok</button>
          </div>
        </form>
      </dialog>
      <dialog
        id="my_modal_failed"
        className="modal modal-bottom sm:modal-middle"
      >
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
            <span>Registration Failed! Error: {error}</span>
          </div>
          <div className="modal-action">
            <button className="btn btn-primary">Ok</button>
          </div>
        </form>
      </dialog>
    </>
  );
}
