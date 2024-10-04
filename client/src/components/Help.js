import React from "react";
import { Modal } from "antd";
import { text } from "../ultils/dataContact";
const Help = ({ visible, onClose }) => {
  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      style={{ top: "100px" }}
      className="custom-modal"
    >
      <h2 className="text-xl font-semibold">Xin chào</h2>
      <div className="p-2 text-white">
        <p>{text.contentSub}</p>
        <div className="grid grid-cols-2 gap-4 mt-4">
          {text.contactSub.map((item, index) => {
            return (
              <div
                key={index}
                className="p-4 flex flex-col items-center justify-center bg-[#eae8e8] text-black rounded-md"
              >
                <h3 className="text-black font-semibold">{item.text}</h3>
                <h3 className="text-red-600 font-medium">{item.name}</h3>
                <p>{item.phone}</p>
                <a
                  className="cursor-pointer"
                  href={`https://zalo.me/${item?.zalo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {`Zalo: ${item.zalo}`}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};

export default Help;
