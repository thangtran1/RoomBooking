import React, { useEffect, useState } from "react";
import { Form, Input, Button, message } from "antd";
import { useLocation, useNavigate, Link } from "react-router-dom";
import * as actions from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

const Login = () => {
  const [form] = Form.useForm();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, msg, update } = useSelector((state) => state.auth);
  const [isRegister, setIsRegister] = useState(location.state?.flag);

  useEffect(() => {
    setIsRegister(location.state?.flag);
  }, [location.state?.flag]);

  useEffect(() => {
    if (isLoggedIn) navigate("/");
  }, [isLoggedIn]);

  useEffect(() => {
    if (msg) {
      Swal.fire("Oops!", msg, "error");
    }
  }, [msg, update]);

  const onFinish = (values) => {
    let finalPayload = isRegister
      ? values
      : {
          phone: values.phone,
          password: values.password,
        };

    if (isRegister) {
      dispatch(actions.register(finalPayload));
    } else {
      dispatch(actions.login(finalPayload));
    }
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div className="bg-white w-[600px] p-[30px] pb-[100px] rounded-md shadow-sm ">
        <h3 className="font-semibold text-2xl mb-3">
          {isRegister ? "Đăng ký tài khoản" : "Đăng nhập"}
        </h3>
        <Form
          form={form}
          name="login-form"
          onFinish={onFinish}
          layout="vertical"
          initialValues={{
            phone: "",
            password: "",
            name: "",
          }}
        >
          {isRegister && (
            <Form.Item
              name="name"
              label="Họ Tên"
              rules={[
                {
                  required: true,
                  message: "Bạn không được bỏ trống trường này",
                },
              ]}
            >
              <Input />
            </Form.Item>
          )}

          <Form.Item
            name="phone"
            label="Số Điện Thoại"
            rules={[
              { required: true, message: "Bạn không được bỏ trống trường này" },
              { pattern: /^[0-9]+$/, message: "Số điện thoại không hợp lệ" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Mật Khẩu"
            rules={[
              { required: true, message: "Bạn không được bỏ trống trường này" },
              { min: 6, message: "Mật khẩu phải có tối thiểu 6 kí tự" },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {isRegister ? "Đăng ký" : "Đăng nhập"}
            </Button>
          </Form.Item>
        </Form>
        <div className="mt-7 flex items-center justify-between">
          {isRegister ? (
            <span>
              Bạn đã có tài khoản?
              <span
                className="text-blue-500 hover:underline cursor-pointer"
                onClick={() => {
                  setIsRegister(false);
                  form.resetFields();
                }}
              >
                Đăng nhập ngay
              </span>
            </span>
          ) : (
            <>
              <small className="text-[blue] hover:text-[red] cursor-pointer">
                Bạn quên mật khẩu
              </small>
              <small
                onClick={() => {
                  setIsRegister(true);
                  form.resetFields();
                }}
                className="text-[blue] hover:text-[red] cursor-pointer"
              >
                Tạo tài khoản mới
              </small>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
