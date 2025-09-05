import { Lock, Mail, ArrowRight, Key, ChevronLeft } from "lucide-react"
import { useState } from "react";


function SignupPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    return (
        <div className="login-page bg-gray-50 h-screen w-full flex justify-center items-center">
            <form className='login-form relative bg-white h-auto w-auto py-6 sm:px-8 px-6 shadow-xl text-center flex flex-col justify-center items-center gap-6 rounded-3xl'>
                <a href="/login">
                    <ChevronLeft
                        size={35}
                        className="absolute top-4 left-4 cursor-pointer"
                    />
                </a>
                <div className="icon bg-gray-100 p-4 rounded-full shadow-md">
                    <Lock />
                </div>
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl font-bold">
                        Sign Up
                    </h1>
                    <p className="border-b border-dashed border-gray-300 pb-8 sm:px-4 text-gray-600">
                        Create your account to get started.
                    </p>
                </div>
                <div className="inputs flex flex-col gap-2">

                    <div className="email-input flex flex-col gap-1">
                        <label htmlFor="email" className="text-left font-semibold">
                            Email adresse :
                        </label>
                        <div className="relative w-64 sm:w-78">
                            <Mail
                                size={16}
                                className="absolute left-2 top-[31%] text-gray-400"
                            />
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="example@gmail.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="border border-gray-300 rounded-xl pl-8 p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                    <div className="password-input flex flex-col gap-1">
                        <label htmlFor="email" className="text-left font-semibold">
                            Password :
                        </label>
                        <div className="relative w-64 sm:w-78">
                            <Key
                                size={16}
                                className="absolute left-2 top-[31%] text-gray-400"
                            />
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="......................................."
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="border border-gray-300 rounded-xl pl-8 p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                    <div className="confirm-password-input flex flex-col gap-1">
                        <label htmlFor="email" className="text-left font-semibold">
                            Confirm Password :
                        </label>
                        <div className="relative w-64 sm:w-78">
                            <Key
                                size={16}
                                className="absolute left-2 top-[31%] text-gray-400"
                            />
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                placeholder="......................................."
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="border border-gray-300 rounded-xl pl-8 p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>
                <button type="submit" className="flex flex-row justify-center gap-1 bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-800 hover:cursor-pointer transition w-64 sm:w-78">
                    Submit
                    <ArrowRight />
                </button>
            </form>
        </div>
    )
}

export default SignupPage;