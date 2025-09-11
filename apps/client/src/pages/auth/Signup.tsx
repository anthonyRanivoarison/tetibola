import React, {useState} from "react";
import {Alert} from "../../components/ui/Alert";
import {ArrowRight, ChevronLeft, Lock} from "lucide-react";
import AuthInputs from "../../components/templates/auth-inputs";
import VerificationCodeInput from "../../components/templates/VerificationCode";
import {useVerification} from "../../hooks/verification";
import {api} from "../../api/base";

type AlertType = "error" | "success" | "info";

const SignupPage = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [step, setStep] = useState<"signup" | "verify">("signup");
  const [alert, setAlert] = useState<{ title: string; content: string; type: AlertType } | null>(
    null
  );

  const {verificationCode, setVerificationCode, handleVerify} = useVerification(6);

  const postData = async () => {
    try {
      const res = await api.post("/auth/signup", form);
      return res.data;
    } catch (e) {
      console.log(e, "error")
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setAlert({title: "Error", content: "Passwords don't match", type: "error"});
      return;
    }

    try {
      await postData();
      setAlert({title: "Info", content: `Verification code sent to ${form.email}`, type: "info"});
      setStep("verify");
    } catch (err) {
      console.error(err)
    }
  };

  const handleCodeVerification = async () => {
    try {
      await handleVerify("/auth/signup/verification", {email: form.email});
      setAlert({title: "Success", content: "Account verified!", type: "success"});
      setTimeout(() => (window.location.href = "/login"), 3000);
    } catch (err) {
      console.error(err);
      setAlert({title: "Error", content: "Invalid verification code", type: "error"});
    }
  };


  return (
    <div className="signup-page h-screen w-full flex justify-center items-center">
      {alert && <Alert title={alert.title} content={alert.content} type={alert.type}/>}

      <form
        onSubmit={handleSubmit}
        className="signup-form relative bg-white py-6 px-6 sm:px-8 shadow-xl rounded-3xl flex flex-col items-center gap-6 text-center"
      >
        <a href="/apps/client/src/pages/auth/Login">
          <ChevronLeft size={35} className="absolute top-4 left-4 cursor-pointer"/>
        </a>

        <div className="icon bg-gray-100 p-4 rounded-full shadow-md">
          <Lock/>
        </div>

        <div className="text-section flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Sign Up</h1>
          <p className="border-b border-dashed border-gray-300 pb-8 sm:px-4 text-gray-600">
            Create your account to get started.
          </p>
        </div>

        <div className="inputs flex flex-col gap-4">
          {step === "signup" ? (
            <AuthInputs data={form} setData={setForm}/>
          ) : (
            <VerificationCodeInput
              code={verificationCode}
              setCode={setVerificationCode}
              onVerify={handleCodeVerification}
            />
          )}
        </div>

        {step === "signup" && (
          <button
            type="submit"
            className="flex items-center justify-center gap-1 bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-800 transition w-64 sm:w-78"
          >
            {/*{isLoading ? "Loading..." : "Submit"}*/}
            Submit
            <ArrowRight/>
          </button>
        )}
      </form>
    </div>
  );
};

export default SignupPage;