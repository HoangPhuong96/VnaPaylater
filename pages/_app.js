import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import "../styles/globals.media.css";
import ThemeProvider from "react-bootstrap/ThemeProvider";
import Header from "../src/components/Header";
import { LanguageProvider } from "../src/provider/LanguageProvider";
import Footer from "../src/components/Footer";

const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider breakpoints={["lg", "md", "sm", "xs"]}>
      <LanguageProvider>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
