import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return <div className="bg-slate-300 h-screen w-screen flex justify-center items-center">
      <div className="bg-white rounded-2xl shadow-2xl w-[400px] max-w-[90%] p-8 text-center">
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputBox onChange={e => {
            setUserName(e.target.value);
        }} placeholder="email@gmail.com" label={"Email"} />
        <InputBox onChange={e => {
            setPassword(e.target.value);
        }} placeholder="******" label={"Password"} type={"password"} />
        <div className="pt-4">
          <Button onClick={async () => {
            const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                userName,
                password,
            });
            if (response.data.token) {
                navigate("/dashboard");
                localStorage.setItem("token", response.data.token);
            }
          }} label={"Sign in"} />
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
    </div>
  </div>
};