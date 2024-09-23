import React from "react";
import { text } from "../ultils/dataContact";
import { Button } from "../components";
import { Link } from "react-router-dom";
const Contact = () => {
  return (
    <div className="  border-4 border-dashed border-blue-200  w-4/5 flex flex-col justify-center gap-6 items-center  bg-white rounded-md shadow-md p-4">
      <img
        src={text.image}
        alt="img-contact"
        className="w-full h-48 object-contain"
      />
      <p className="">{text.content}</p>
      <div className="flex items-center justify-around w-full ">
        {text.contacts.map((item, index) => {
          return (
            <div
              key={index}
              className="flex flex-col items-center justify-center "
            >
              <span className="text-orange-500 font-semibold">{item.text}</span>
              <span className="text-blue-900 text-[22px] font-semibold">
                {item.phone}
              </span>
              <span className="text-blue-900 text-[22px] font-semibold">
                {item.zalo}
              </span>
            </div>
          );
        })}
      </div>

      <Link to="lien-he">
        <Button
          text="Gửi liên hệ "
          bgColor="bg-blue-600"
          textColor="text-white"
          px="px-6"
        />
      </Link>
    </div>
  );
};

export default Contact;
