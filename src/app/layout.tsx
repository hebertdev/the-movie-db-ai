import "@mantine/core/styles.css";
import React from "react";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { theme } from "../theme";

//progressbar
import NextTopLoader from "nextjs-toploader";

//components
import { Header } from "components/Header";

//providers
import { UserContextProvider } from "contexts/UserContext";

//styles
import "./globals.css";
import { Footer } from "components/Footer";

export const metadata = {
  title: "TheMovieDB AI | Hebertdev",
  description: `Encuentra Películas con IA: Descubre películas personalizadas, busca
            títulos olvidados con detalles clave y recibe recomendaciones
            basadas en tus favoritos. ¡Explora tu próximo film ideal ahora!`,
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="es">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <NextTopLoader color="rgb(255, 160, 0)" height={5} />
        <MantineProvider theme={theme}>
          <UserContextProvider>
            <>
              <Notifications />
              <Header />
              {children}
              <Footer />
            </>
          </UserContextProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
