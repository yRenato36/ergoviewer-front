import { globalStyles } from "@/styles/global";
import { Container } from "@/styles/pages/app";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

globalStyles();
export default function App({ Component, pageProps }) {
  return (
    <Container>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </Container>
  );
}
