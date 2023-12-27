import React from "react";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <h1 className="font-2">Welcome to EcomHUB</h1>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </>
  );
}