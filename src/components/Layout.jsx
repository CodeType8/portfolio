// src/components/Layout.jsx
import { Container } from "react-bootstrap";
import AppNavbar from "./AppNavbar";

function Layout({ children }) {
  return (
    <>
      <AppNavbar />
      {/* fixed-top navbar 공간 확보용 여백 */}
      <Container className="mt-5 pt-4">
        {children}
      </Container>
      <footer className="border-top mt-5 py-4">
        <Container className="text-center text-muted small">
          © {new Date().getFullYear()} Eric Joh · CodeType Web
        </Container>
      </footer>
    </>
  );
}

export default Layout;
