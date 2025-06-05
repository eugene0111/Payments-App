import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleSignUp = async () => {
        try {
            const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                userName,
                password,
                firstName,
                lastName
            });
            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                navigate("/dashboard");
            }
        } catch(err) {
            if (err.response?.status === 411) {
                setError("Username already taken!");
            }
            else {
                "Something went wrong. Please try again!"
            }
        }
    }

    return <div className="bg-slate-300 h-screen w-screen flex justify-center items-center">
      <div className="bg-white rounded-2xl shadow-2xl w-[400px] max-w-[90%] p-8 text-center">
        <Heading label={"Sign up"} />
        <SubHeading label={"Enter your infromation to create an account"} />
        <InputBox onChange={e => {
            setFirstName(e.target.value);
        }} placeholder="First Name" label={"First Name"} />
        <InputBox onChange={e => {
            setLastName(e.target.value);
        }} placeholder="Last Name" label={"Last Name"} />
        <InputBox onChange={e => {
            setUserName(e.target.value);
        }} placeholder="email@gmail.com" label={"Email"} />
        <InputBox onChange={e => {
            setPassword(e.target.value);
        }} placeholder="******" label={"Password"} type={"password"} />
        <div className="pt-4">
          <Button onClick={handleSignUp} label={"Sign up"} />
        </div>
        {error && (
          <div className="text-red-500 text-sm pt-2">{error}</div>
        )}
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
      </div>
    </div>
};