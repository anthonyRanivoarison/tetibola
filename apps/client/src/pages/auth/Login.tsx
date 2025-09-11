import React, {useState} from "react";
import {Lock, ArrowRight} from "lucide-react";
import {api} from "../../api/base";
import AuthInputs from "../../components/templates/auth-inputs";
import VerificationCode from "../../components/templates/VerificationCode.tsx";
import {useVerification} from "../../hooks/verification.tsx";
import {Alert, type AlertType} from "../../components/ui/Alert.tsx";

const LoginPage = () => {
  const [form, setForm] = useState({email: "", password: ""});
  const [step, setStep] = useState<"login" | "verify">("login");
  const [alert, setAlert] = useState<{ title: string; content: string; type: AlertType } | null>(
    null
  );

  const {verificationCode, setVerificationCode, handleVerify} = useVerification(6);

  const fetchData = async () => {
    const response = await api.post("/auth/login", {...form});
    return response.data;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await fetchData();
      setStep("verify");
    } catch (err) {
      console.error(err);
    }
  };

  const handleCodeVerification = async () => {
    try {
      await handleVerify("/auth/login/verification", {email: form.email});
      setAlert({title: "Success", content: "Welcome back !", type: "success"});
      window.location.href = "/dashboard";
    } catch (err) {
      console.error(err);
      setAlert({title: "Error", content: "Invalid code. Please try again...", type: "error"});
      window.location.reload();
    }
  };

  return (
    <div className="login-page bg-gray-50 h-screen w-full flex justify-center items-center">
      {alert && <Alert title={alert.title} content={alert.content} type={alert.type}/>}
      <form
        onSubmit={handleSubmit}
        className="login-form bg-white h-auto w-auto py-6 px-8 shadow-xl text-center flex flex-col justify-center items-center gap-6 rounded-3xl"
      >
        <div className="icon bg-gray-100 p-4 rounded-full shadow-md">
          <Lock/>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Sign In</h1>
          <p className="border-b border-dashed border-gray-300 pb-8 sm:px-4 text-gray-600">
            Enter your information to sign in.
          </p>
        </div>

        <div className="inputs flex flex-col gap-4">
          {step === "login" ? (
            <AuthInputs data={form} setData={setForm} showConfirmPassword={false}/>
          ) : (
            <VerificationCode
              code={verificationCode}
              setCode={setVerificationCode}
              onVerify={handleCodeVerification}
            />
          )}
        </div>

        {step === "login" && (
          <button
            type="submit"
            className="flex flex-row justify-center gap-1 bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-800 hover:cursor-pointer transition w-64 sm:w-78"
          >
            Submit
            <ArrowRight/>
          </button>
        )}

        <div className="flex flex-col gap-1 w-full">
          <p className="text-start text-sm text-gray-600">Don't have an account?</p>
          <a href="/signup" className="text-end underline text-blue-600 hover:text-blue-800">
            Sign up?
          </a>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
