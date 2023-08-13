export function Signin({ loginGoogle }: { loginGoogle: () => void }) {
  return (
    <div className="flex flex-col items-center gap-y-4 mt-10">
      <h1 className="text-xl w-fit text-center">Dream Express</h1>
      <h1 className="text-xl w-fit text-center">Orgs Registration Page</h1>
      <button className="btn btn-secondary" onClick={loginGoogle}>
        Sign In with One-Bosco Google
      </button>
    </div>
  );
}
