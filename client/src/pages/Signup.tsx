import { FormEvent, useRef } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const { signup } = useAuth();
  const usernameRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const imageUrlRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (signup.isLoading) return;

    const username = usernameRef.current?.value;
    const name = nameRef.current?.value;
    const imageUrl = imageUrlRef.current?.value;

    if (username === null || username === "" || name === null || name === "") {
      return;
    }
    signup.mutate({ id: username!, name: name!, image: imageUrl });
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-8 text-center">Sign up</h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-[auto,1fr] gap-x-3 gap-y-5 items-center justify-items-end"
      >
        <label>Username</label>
        <Input id="username" required pattern="\S*" ref={usernameRef} />
        <label>Name</label>
        <Input id="name" required ref={nameRef} />
        <label>Image URL</label>
        <Input id="imageUrl" type="url" ref={imageUrlRef} />
        <Button
          disabled={signup.isLoading}
          className="col-span-full "
          type="submit"
        >
          {signup.isLoading ? "Loading..." : " Sign Up"}
        </Button>
      </form>
    </>
  );
};

export default Signup;
