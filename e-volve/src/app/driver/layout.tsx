"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
  WalletOutlined,
  UserOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Layout, Menu } from "antd";
import { ItemType, MenuItemType } from "antd/es/menu/interface";
import styles from "./styles/globals.module.css";
import { TaxiProvider } from "@/providers/taxi";
import { DriverProvider } from "@/providers/driver";
import { RouteProvider } from "@/providers/route";
import { AssociationProvider } from "@/providers/association";
import { LaneProvider } from "@/providers/lane";
import { FacilityProvider } from "@/providers/facilities";
import { EmailProvider } from "@/providers/email";
import { useAuthActions, useAuthState } from "@/providers/auth";
import { DriverAccountDetailProvider } from "@/providers/driver-account-details";
import { PaymentProvider } from "@/providers/payment";

// import withAuth from "../hoc/withAuth";

const { Header, Sider, Content } = Layout;

const TaxiRankManager = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { currentUser } = useAuthState();
  const { signOut } = useAuthActions();

  const router = useRouter();

  const userMenu = {
    items: [
      {
        key: "signOut",
        label: "Sign Out",
        icon: <LogoutOutlined />,
        onClick: () => {
          router.replace("/");
          signOut();
        },
      },
    ],
  };

  const siderItems: ItemType<MenuItemType>[] = [
    {
      key: "/driver",
      icon: <HomeOutlined />,
      label: "Home",
    },
    {
      label: "Wallet",
      key: "/driver/wallet",
      icon: <WalletOutlined />,
    },
    {
      label: "Receive Fair",
      key: "/driver/receive-fair",
      icon: <CreditCardOutlined />,
    },
    {
      label: "Account",
      key: "/driver/account",
      icon: <UserOutlined />,
    },
  ];

  return (
    <EmailProvider>
      <DriverProvider>
        <FacilityProvider>
          <AssociationProvider>
            <TaxiProvider>
              <LaneProvider>
                <DriverAccountDetailProvider>
                  <PaymentProvider>
                  <RouteProvider>
                    <Layout className={styles.layout}>
                      <Sider trigger={null} collapsible collapsed={collapsed}>
                        <div className="demo-logo-vertical" />
                        <Menu
                          onClick={({ key }) => router.push(key)}
                          theme="dark"
                          mode="inline"
                          defaultSelectedKeys={["/driver"]}
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
                                {currentUser?.emailAddress ?? "User"}
                              </Button>
                            </Dropdown>
                          </div>
                        </Header>
                        <Content className={styles.content}>{children}</Content>
                      </Layout>
                    </Layout>
                  </RouteProvider>
                  </PaymentProvider>
              
                </DriverAccountDetailProvider>
              </LaneProvider>
            </TaxiProvider>
          </AssociationProvider>
        </FacilityProvider>
      </DriverProvider>
    </EmailProvider>
  );
};

//export default withAuth(HrManager);
export default TaxiRankManager;
