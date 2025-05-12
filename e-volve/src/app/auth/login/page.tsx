"use client";
import { Button, Form, Input, Spin } from "antd";
import { MailOutlined, LockOutlined, RocketOutlined } from "@ant-design/icons";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthState, useAuthActions } from "@/providers/auth";
import { ILoginData } from "@/providers/auth/context";
import { Toast } from "@/providers/toast/toast";
import { motion } from "framer-motion";
import styles from "./styles.module.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { loginUser, resetStateFlags } = useAuthActions();
  const { isPending, isSuccess, isError, currentRole } = useAuthState();
  const router = useRouter();

  const handleSignIn = async () => {
    if (!email || !password) {
      Toast("Please enter both email and password", "warning");
      return;
    }

    setIsLoading(true);
    try {
      const loginData: ILoginData = {
        userNameOrEmailAddress: email,
        password: password,
      };
      await loginUser(loginData);
    } catch (error) {
      console.log(error);
      Toast("An error occurred during sign in, please try again", "error");
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSignIn();
    }
  };

  useEffect(() => {
    if (isSuccess) {
      resetStateFlags();
      setTimeout(() => {
        console.log(currentRole);
        switch (currentRole) {
          case "driver":
            router.push("/driver");
            break;
          case "rankmanager":
            router.push("/taxirankmanager");
            break;
          case "passenger":
            router.push("/passenger");
            break;
          default :
            router.push("/auth/login");
            break;
        }
      }, 500);
    }

    if (isError) {
      Toast("Invalid credentials. Please try again.", "error");
      resetStateFlags();
      setIsLoading(false);
    }
  }, [isSuccess, isError, currentRole, resetStateFlags, router]);

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
            <h1>Welcome Back</h1>
            <p>Log in to access your account and continue your journey</p>
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

      {/* Right Side - Login Form */}
      <motion.div
        className={styles.rightSide}
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className={styles.logoContainer}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <img src="/images/hrlogo.png" alt="logo" className={styles.logo} />
        </motion.div>

        <motion.div
          className={styles.formContainer}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <h1 className={styles.heading}>
            Sign In <RocketOutlined className={styles.headingIcon} />
          </h1>

          {(isPending || isLoading) && (
            <div className={styles.loadingContainer}>
              <Spin size="large" />
            </div>
          )}

          <Form layout="vertical" className={styles.loginForm}>
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Email is required" }]}
              className={styles.formItem}
            >
              <Input
                prefix={<MailOutlined className={styles.inputIcon} />}
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
                onKeyPress={handleKeyPress}
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: "Password is required" }]}
              className={styles.formItem}
            >
              <Input.Password
                prefix={<LockOutlined className={styles.inputIcon} />}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                onKeyPress={handleKeyPress}
                size="large"
              />
            </Form.Item>

            <div className={styles.forgotPasswordContainer}>
              <Link
                href="/auth/forgot-password"
                className={styles.forgotPassword}
              >
                Forgot password?
              </Link>
            </div>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                type="primary"
                onClick={handleSignIn}
                className={styles.signInButton}
                block
                size="large"
                loading={isPending || isLoading}
              >
                Sign In
              </Button>
            </motion.div>

            <div className={styles.dividerContainer}>
              <div className={styles.divider}></div>
              <span className={styles.dividerText}>OR</span>
              <div className={styles.divider}></div>
            </div>

            <div className={styles.signupContainer}>
              <p>
                Don&apos;t have an account?{" "}
                <Link href="/auth/signup" className={styles.signupLink}>
                  Create one now
                </Link>
              </p>
            </div>
          </Form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SignIn;
