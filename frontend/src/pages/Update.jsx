import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Update = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return <div className="bg-slate-300 h-screen w-screen flex justify-center items-center">
      <div className="bg-white rounded-2xl shadow-2xl w-[400px] max-w-[90%] p-8 text-center">
        <Heading label={"Update Details"} />
        <SubHeading label={"Enter the fields you want to change"} />
        <InputBox onChange={(e) => {
            setFirstName(e.target.value);
        }} placeholder={"First Name"} label={"First Name"} />
        <InputBox onChange={(e) => {
            setLastName(e.target.value);
        }} placeholder={"Last Name"} label={"Last Name"} />
        <InputBox onChange={(e) => {
            setPassword(e.target.value);
        }} placeholder={"******"} label={"Password"} type="password" />
        <div className="pt-4">
            <Button onClick={async () => {
                await axios.put("http://localhost:3000/api/v1/user/update", {
                    firstName,
                    lastName,
                    password,
                }, {
                    headers: {
                        Authorization: "Bearer "+localStorage.getItem("token")
                    }
                });
                navigate("/dashboard");
            }} label={"Submit"} />
        </div>
      </div>
    </div>
}