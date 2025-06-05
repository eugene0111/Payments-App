import { useSearchParams } from "react-router-dom"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./Button";

export const Appbar = () => {
    const [searchParams] = useSearchParams();
    const firstName = searchParams.get("firstName") || "User";
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    return <div className="shadow h-14 flex justify-between">
        <div className="font-bold flex flex-col justify-center h-full ml-4">
            Payments App
        </div>
        <div className="flex">
            <div className="flex font-bold flex-col justify-center h-full mr-1">
                Hello,
            </div>
            <div className="flex flex-col justify-center h-full mr-4">
                {firstName}
            </div>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div onClick={() => {
                    setShowDropdown(!showDropdown)
                }} className="flex flex-col justify-center h-full text-xl cursor-pointer">
                    {firstName[0].toUpperCase()}
                </div>
                {showDropdown && (
                    <div className="absolute right-0 top-14 bg-white border rounded shadow-md p-2 z-50">
                        {/* <Button
                            onClick={() => {
                                navigate("/update");
                            }} label={"Update Details"}
                        /> */}
                        <Button
                            onClick={() => {
                                localStorage.removeItem("token");
                                navigate("/signin");
                            }} label={"Sign Out"}
                        />
                    </div>
                )}
            </div>
        </div>
    </div>
}