import React from "react";
import { Image, Form } from "../components/Register";

const Register = () => {
  return (
    <div className="flex w-full">
      <div className="w-1/2">
        <Image />
      </div>
      <div className="w-1/2 flex justify-center items-center ">
        <Form />
      </div>
    </div>
  );
};

export default Register;
