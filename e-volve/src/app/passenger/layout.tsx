"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
  UserOutlined,
  CreditCardFilled,
  CarFilled,
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

const { Header, Sider, Content } = Layout;

const Passenger = ({ children }: { children: React.ReactNode }) => {
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
      key: "/passenger",
      icon: <HomeOutlined />,
      label: "Home",
    },
    {
      label: "Pay Driver",
      key: "/passenger/pay-driver",
      icon: <CreditCardFilled />,
    },
    {
      label: "Track Taxi",
      key: "/passenger/track-taxi",
      icon: <CarFilled />,
    },
    {
      label: "Profile",
      key: "/passenger/profile",
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
                        <Sider
                          trigger={null}
                          collapsible
                          collapsed={collapsed}
                          style={{
                            backgroundColor: "black",
                            color: "white",
                          }}
                        >
                          {!collapsed && (
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                padding: "20px 0",
                                borderBottom: "1px solid rgba(255,255,255,0.2)",
                              }}
                            >
                              <div
                                style={{
                                  width: "120px",
                                  height: "120px",
                                  borderRadius: "50%",
                                  backgroundColor: "white",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  marginBottom: "15px",
                                }}
                              >
                                <UserOutlined
                                  style={{
                                    fontSize: "80px",
                                    color: "black",
                                    opacity: 0.7,
                                  }}
                                />
                              </div>
                              <div
                                style={{
                                  textAlign: "center",
                                  color: "white",
                                }}
                              >
                                <h3
                                  style={{
                                    margin: 0,
                                    fontSize: "18px",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {currentUser?.name ?? "User"}
                                </h3>
                              </div>
                            </div>
                          )}
                          <Menu
                            onClick={({ key }) => router.push(key)}
                            mode="inline"
                            defaultSelectedKeys={["/driver"]}
                            items={siderItems}
                            style={{
                              backgroundColor: "black",
                              color: "white",
                            }}
                            theme="dark"
                          />
                        </Sider>
                        <Layout>
                          <Header
                            style={{
                              padding: 0,
                              backgroundColor: "white",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
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
                          <Content className={styles.content}>
                            {children}
                          </Content>
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

export default Passenger;
