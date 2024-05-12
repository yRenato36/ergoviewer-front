import { useEffect } from "react";

import { globalStyles } from "@/styles/global";
import { Container } from "@/styles/pages/app";

import ComponentHeader from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import { UserStorage } from "@/context/UserContext";
import { RegisterStorage } from "@/context/RegisterContext";

globalStyles();
export default function App({ Component, pageProps }) {
  useEffect(() => {
    document.title = "Ergo Viewer";
  }, []);
  return (
    <Container>
      <UserStorage>
        <RegisterStorage>
          <ComponentHeader />
          <Component {...pageProps} />
          <Footer />
        </RegisterStorage>
      </UserStorage>
    </Container>
  );
}
