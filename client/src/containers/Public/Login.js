import React, { useEffect, useState } from "react";
import { Form, Input, Button } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import * as actions from "../../store/actions";

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
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (msg) {
      Swal.fire("Oops!", msg, "error");
    }
  }, [msg, update]);

  const onFinish = (values) => {
    const finalPayload = {
      identifier: values.identifier,
      password: values.password,
    };

    if (isRegister) {
      finalPayload.name = values.name;

      dispatch(actions.register(finalPayload)).then((res) => {
        if (res.success) {
          Swal.fire("Thành công!", "Đăng ký tài khoản thành công!", "success");
          navigate("/");
        } else {
          Swal.fire("Oops!", res.msg || "Đăng ký thất bại", "error");
        }
      });
    } else {
      dispatch(actions.login(finalPayload)).then((res) => {
        if (res.success) {
          Swal.fire("Thành công!", "Đăng nhập thành công!", "success");
          navigate("/");
        } else {
          Swal.fire("Oops!", res.msg || "Đăng nhập thất bại", "error");
        }
      });
    }
  };

  const validateField = (rule, value) => {
    if (!value || value.trim() === "") {
      return Promise.reject(new Error("Trường này không được để trống"));
    }

    if (value && value.trim() !== value) {
      return Promise.reject(new Error("Không được chứa khoảng trắng"));
    }

    return Promise.resolve();
  };

  const validateIdentifier = (rule, value) => {
    const trimmedValue = value?.trim();
    if (!trimmedValue) {
      return Promise.reject(new Error("Email hoặc số điện thoại không hợp lệ"));
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(0[1-9]{1}[0-9]{8}|84[1-9]{1}[0-9]{8})$/;

    if (!emailRegex.test(trimmedValue) && !phoneRegex.test(trimmedValue)) {
      return Promise.reject(new Error("Email hoặc số điện thoại không hợp lệ"));
    }
    return Promise.resolve();
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
        >
          {isRegister && (
            <Form.Item
              name="name"
              label="Họ Tên"
              rules={[{ validator: validateField }]}
            >
              <Input />
            </Form.Item>
          )}

          <Form.Item
            name="identifier"
            label="Email hoặc Số Điện Thoại"
            rules={[{ validator: validateIdentifier }]}
          >
            <Input
              autoComplete="username"
              placeholder="Email hoặc số điện thoại"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Mật Khẩu"
            rules={[
              { validator: validateField },
              { min: 6, message: "Mật khẩu phải có tối thiểu 6 kí tự" },
            ]}
          >
            <Input.Password
              autoComplete="current-password"
              placeholder="Mật khẩu"
            />
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
                className="text-blue-500 ml-2 hover:underline cursor-pointer"
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
