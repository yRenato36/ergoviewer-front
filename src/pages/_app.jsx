import { globalStyles } from "@/styles/global";
import { Container } from "@/styles/pages/app";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import { UserStorage } from "@/context/UserContext";

globalStyles();
export default function App({ Component, pageProps }) {
  return (
    <Container>
      <UserStorage>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </UserStorage>
    </Container>
  );
}
