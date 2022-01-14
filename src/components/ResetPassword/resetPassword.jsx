import { useState } from "react";
import useAuth from "../../contexts/useAuth";
import AppButton from "../AppButton/AppButton";
import ReactLoading from "react-loading";
export default function ResetPassword() {
  const { sendPasswordResetEmail, error } = useAuth();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  async function handleSubmit() {
    setLoading(true);
    let message = await sendPasswordResetEmail(email);
    setMessage(message);
    setLoading(false);
  }
  return (
    <>
      <div className=" flex w-full flex-col justify-center items-center gap-2 h-screen">
        <h2 className="text-center">Reset Password</h2>

        <input
          type="email"
          id="eamil"
          placeholder="Enter email"
          className="p-2"
          onChange={(e) => setEmail(e.target.value)}
        />
        <AppButton defaultStyle={true} onClick={handleSubmit}>
          Send Reset Email
        </AppButton>
        {loading && <ReactLoading type="spin" />}
        {!loading && error && (
          <p className="text-red-400 mx-auto text-center	">{error}</p>
        )}
        {!loading && message && (
          <p className="text-green-400 text-center	">{message}</p>
        )}
      </div>
    </>
  );
}
