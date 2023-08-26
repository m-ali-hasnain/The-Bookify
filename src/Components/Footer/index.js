import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => (
  <footer
    className="pt-4 bg-dark text-white position-fixed bottom-0 w-100"
    style={{ zIndex: 1 }}
  >
    <Container className="footer-copyright text-center py-3">
      © 2023 Copyright:
      <a
        href="https://mdbootstrap.com/"
        className="text-white text-decoration-none"
      >
        {` AgeOfUltron.com`}
      </a>
    </Container>
  </footer>
);

export default Footer;
