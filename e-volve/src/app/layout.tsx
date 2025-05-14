import type { Metadata } from "next";
import "./globals.css";
import ConfigProvider from "antd/es/config-provider";
import { componetsSettings, themeSettings } from "@/utils/theme-setting";
import { AuthProvider } from "@/providers/auth";
import { DriverProvider } from "@/providers/driver";
import { EmailProvider } from "@/providers/email";
import ToastProvider from "@/providers/toast/toast";
import { GeolocationProvider } from "@/providers/geolocation/Context";

export const metadata: Metadata = {
  title: "Evolve",
  description: "degitizing south african taxi rank",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GeolocationProvider>
        <ConfigProvider
          theme={{ token: themeSettings, components: componetsSettings }}
        >
          <EmailProvider>
            <AuthProvider>
              <DriverProvider>
                <ToastProvider />
                <body>{children}</body>
              </DriverProvider>
            </AuthProvider>
          </EmailProvider>
        </ConfigProvider>
      </GeolocationProvider>
    </html>
  );
}
