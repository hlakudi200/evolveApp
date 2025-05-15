"use client";
import { Button, Form, Input } from "antd";
import {
  MailOutlined,
  UserOutlined,
  LockOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthActions } from "@/providers/auth";
import { IUser } from "@/providers/auth/context";
import { Toast } from "@/providers/toast/toast";
import { motion } from "framer-motion";
import styles from "./styles.module.css";
import { isStrongPassword } from "@/utils/auth-helpers";

export interface IPassengerSignUp {
  id?: string;
  username: string;
  name: string;
  surname: string;
  emailAddress: string;
  password: string;
  confirmPassword: string;
}

const SignUp = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuthActions();
  const router = useRouter();
  const handleSignUp = async (values: IPassengerSignUp) => {
    setLoading(true);
    try {
      if (
        !values.username ||
        !values.name ||
        !values.surname ||
        !values.emailAddress ||
        !values.password ||
        !values.confirmPassword
      ) {
        Toast("Please fill all required fields", "error");
        setLoading(false);
        return;
      }

      if (values.password !== values.confirmPassword) {
        Toast("Password and Confirm Password do not match", "error");
        setLoading(false);
        return;
      }

      if (!isStrongPassword(values.password)) {
        Toast(
          "Password must contain an uppercase letter, a number, and a special character",
          "error"
        );
        setLoading(false);
        return;
      }

      const userPayload: IUser = {
        userName: values.username,
        name: values.name,
        surname: values.surname,
        emailAddress: values.emailAddress,
        password: values.password,
      };

      console.log("PayLoad:", userPayload);
      await signUp(userPayload);

      Toast("Account created succesfully", "success");
      router.push("/auth/login");
    } catch (error) {
      console.error(error);

      Toast("An error occurred. Please try again.", "error");

      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      form.submit();
    }
  };

  return (
    <div className={styles.container}>
      {/* Left Side - Decorative */}
      <motion.div
        className={styles.leftSide}
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className={styles.glassMorphism}>
          <motion.div
            className={styles.welcomeText}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h1>Create Account</h1>
            <p>Join us and unlock access to our premium services</p>
          </motion.div>

          <motion.div
            className={styles.decorativeElements}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <div className={styles.circle1}></div>
            <div className={styles.circle2}></div>
            <div className={styles.circle3}></div>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Side - Signup Form */}
      <motion.div
        className={styles.rightSide}
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className={styles.formContainer}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <h1 className={styles.heading}>Sign Up</h1>

          <Form
            form={form}
            layout="vertical"
            className={styles.signUpForm}
            onFinish={handleSignUp}
          >
            {/* First Row - Username */}
            <Form.Item
              name="username"
              rules={[{ required: true, message: "Username is required!" }]}
              className={styles.formItem}
            >
              <Input
                prefix={<UserOutlined className={styles.inputIcon} />}
                placeholder="Username"
                className={styles.input}
                onKeyPress={handleKeyPress}
                size="large"
              />
            </Form.Item>

            {/* Second Row - Name & Surname */}
            <div className={styles.formRow}>
              <Form.Item
                name="name"
                rules={[{ required: true, message: "Name is required!" }]}
                className={`${styles.formItem} ${styles.halfWidth}`}
              >
                <Input
                  prefix={<IdcardOutlined className={styles.inputIcon} />}
                  placeholder="First Name"
                  className={styles.input}
                  onKeyPress={handleKeyPress}
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="surname"
                rules={[{ required: true, message: "Surname is required!" }]}
                className={`${styles.formItem} ${styles.halfWidth}`}
              >
                <Input
                  prefix={<IdcardOutlined className={styles.inputIcon} />}
                  placeholder="Last Name"
                  className={styles.input}
                  onKeyPress={handleKeyPress}
                  size="large"
                />
              </Form.Item>
            </div>

            {/* Email */}
            <Form.Item
              name="emailAddress"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Valid email required!",
                },
              ]}
              className={styles.formItem}
            >
              <Input
                prefix={<MailOutlined className={styles.inputIcon} />}
                placeholder="Email Address"
                className={styles.input}
                onKeyPress={handleKeyPress}
                size="large"
              />
            </Form.Item>

            {/* Password */}
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Password is required!" },
                { min: 6, message: "Password must be at least 6 characters!" },
              ]}
              className={styles.formItem}
            >
              <Input.Password
                prefix={<LockOutlined className={styles.inputIcon} />}
                placeholder="Password"
                className={styles.input}
                onKeyPress={handleKeyPress}
                size="large"
              />
            </Form.Item>

            {/* Confirm Password */}
            <Form.Item
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Confirm password is required!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match!"));
                  },
                }),
              ]}
              className={styles.formItem}
            >
              <Input.Password
                prefix={<LockOutlined className={styles.inputIcon} />}
                placeholder="Confirm Password"
                className={styles.input}
                onKeyPress={handleKeyPress}
                size="large"
              />
            </Form.Item>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className={styles.signInButton}
                block
                size="large"
              >
                Create Account
              </Button>
            </motion.div>

            <div className={styles.dividerContainer}>
              <div className={styles.divider}></div>
              <span className={styles.dividerText}>OR</span>
              <div className={styles.divider}></div>
            </div>

            <div className={styles.signupContainer}>
              <p>
                Already have an account?{" "}
                <Link href="/auth/login" className={styles.signupLink}>
                  Sign in here
                </Link>
              </p>
            </div>
          </Form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SignUp;
