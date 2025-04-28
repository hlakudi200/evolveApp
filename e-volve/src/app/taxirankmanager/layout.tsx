"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TeamOutlined,
  PushpinFilled,
  UsergroupAddOutlined,
  FileTextOutlined,
  LogoutOutlined,
  UserOutlined,
  SwapOutlined,
  CarOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Layout, Menu } from "antd";
import { ItemType, MenuItemType } from "antd/es/menu/interface";
import styles from "./styles/globals.module.css";
import { TaxiProvider } from "@/providers/taxi";
import { DriverProvider } from "@/providers/driver";
import { RouteProvider } from "@/providers/route";
import { AssociationProvider } from "@/providers/association";
import { LaneProvider } from "@/providers/lane";
// import { EmployeeProvider } from "@/providers/employee";
// import { EmailProvider } from "@/providers/email";
// import { useAuthActions, useAuthState } from "@/providers/auth";
// import withAuth from "../hoc/withAuth";

const { Header, Sider, Content } = Layout;

const TaxiRankManager = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  //   const { currentUser } = useAuthState();
  //   const { signOut } = useAuthActions();
  const router = useRouter();
  const userMenu = {
    items: [
      {
        key: "signOut",
        label: "Sign Out",
        icon: <LogoutOutlined />,
        onClick: () => {
          router.replace("/");
          //   signOut();
        },
      },
    ],
  };

  const siderItems: ItemType<MenuItemType>[] = [
    {
      key: "/taxirankmanager",
      icon: <HomeOutlined />,
      label: "Home",
    },
    {
      key: "/taxirankmanager/taxis",
      icon: <CarOutlined />,
      label: "Taxis",
    },
    {
      key: "/taxirankmanager/driver",
      icon: <UsergroupAddOutlined />,
      label: "Drivers",
    },
    {
      key: "/taxirankmanager/ques",
      icon: <SwapOutlined />,
      label: "Ques",
    },
    {
      key: "/taxirankmanager/lanes",
      icon: <PushpinFilled />,
      label: "Lanes",
    },
    {
      key: "/taxirankmanager/routes",
      icon: <PushpinFilled />,
      label: "Routes",
    },
    {
      key: "/taxirankmanager/associations",
      icon: <TeamOutlined />,
      label: "Associations",
    },
    {
      key: "/taxirankmanager/facilities",
      icon: <FileTextOutlined />,
      label: "Facilities",
    },
  ];

  return (
    <DriverProvider>
      <AssociationProvider>
        <TaxiProvider>
          <LaneProvider>
            <RouteProvider>
              <Layout className={styles.layout}>
                <Sider trigger={null} collapsible collapsed={collapsed}>
                  <div className="demo-logo-vertical" />
                  <Menu
                    onClick={({ key }) => router.push(key)}
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={["/hrManager"]}
                    items={siderItems}
                  />
                </Sider>
                <Layout>
                  <Header
                    style={{
                      padding: 0,
                      backgroundColor: "white",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      type="text"
                      icon={
                        collapsed ? (
                          <MenuUnfoldOutlined />
                        ) : (
                          <MenuFoldOutlined />
                        )
                      }
                      onClick={() => setCollapsed(!collapsed)}
                      style={{
                        fontSize: "16px",
                        width: 64,
                        height: 64,
                      }}
                    />
                    <div className={styles.profileMenu}>
                      <Dropdown menu={userMenu} trigger={["click"]}>
                        <Button type="text" icon={<UserOutlined />}>
                          {/* {currentUser?.emailAddress ?? "User"} */}
                        </Button>
                      </Dropdown>
                    </div>
                  </Header>
                  <Content className={styles.content}>{children}</Content>
                </Layout>
              </Layout>
            </RouteProvider>
          </LaneProvider>
        </TaxiProvider>
      </AssociationProvider>
    </DriverProvider>
  );
};

//export default withAuth(HrManager);
export default TaxiRankManager;
