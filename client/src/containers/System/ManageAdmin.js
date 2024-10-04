import React from "react";
import { Link } from "react-router-dom";
import { FaUser, FaListAlt, FaClipboard, FaCommentDots } from "react-icons/fa"; // Thêm icon cho đẹp hơn

const ManageAdmin = () => {
  return (
    <div className="p-8 bg-gray-50">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-700">
        Trang Quản Lý Admin
      </h1>

      <nav className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <Link
          to="/he-thong/quan-ly-user"
          className="bg-blue-500 text-white py-6 px-6 rounded-xl shadow-lg transition duration-300 flex flex-col items-center hover:bg-blue-600 hover:scale-105"
        >
          <FaUser className="text-5xl mb-4" />
          <span className="text-xl font-semibold">Quản Lý Người Dùng</span>
        </Link>

        <Link
          to="/he-thong/quan-ly-danh-muc"
          className="bg-green-500 text-white py-6 px-6 rounded-xl shadow-lg transition duration-300 flex flex-col items-center hover:bg-green-600 hover:rotate-3"
        >
          <FaListAlt className="text-5xl mb-4" />
          <span className="text-xl font-semibold">Quản Lý Danh Mục</span>
        </Link>

        <Link
          to="/he-thong/quan-ly-bai-dang-user"
          className="bg-purple-500 text-white py-6 px-6 rounded-xl shadow-lg transition duration-300 flex flex-col items-center hover:bg-purple-600 hover:shadow-xl hover:scale-105"
        >
          <FaClipboard className="text-5xl mb-4" />
          <span className="text-xl font-semibold">Quản Lý Bài Đăng</span>
        </Link>

        <Link
          to="/he-thong/quan-ly-phan-hoi"
          className="bg-red-500 text-white py-6 px-6 rounded-xl shadow-lg transition duration-300 flex flex-col items-center hover:bg-red-600 hover:translate-y-1"
        >
          <FaCommentDots className="text-5xl mb-4" />
          <span className="text-xl font-semibold">Quản Lý Phản Hồi</span>
        </Link>
      </nav>
    </div>
  );
};

export default ManageAdmin;
