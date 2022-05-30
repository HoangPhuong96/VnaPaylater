import ThemeProvider from "react-bootstrap/ThemeProvider";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import TicketDetail from "../pages/TicketDetail";
import Header from "../components/Header";
import { LanguageProvider } from "../provider/LanguageProvider";
import Footer from "../components/Footer";

const App = () => {
  return (
    <ThemeProvider breakpoints={["lg", "md", "sm", "xs"]}>
      <LanguageProvider>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="detail" element={<TicketDetail />} />
        </Routes>
      </LanguageProvider>
      <Footer />
    </ThemeProvider>
  );
};

export default App;
