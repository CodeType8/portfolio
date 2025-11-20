// page: Streaming – modern Plex landing
import { Card, Button, Row, Col, Alert, Badge } from "react-bootstrap";
import plexImg from "../assets/img/plex.jpg";

function Streaming() {
  const handleOpenPlex = () => {
    window.open(
      "https://video.codetypeweb.com",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="py-4">
      {/* Hero card with image */}
      <Card className="border-0 shadow-sm mb-4 rounded-4 overflow-hidden">
        <Card.Body
          className="p-4 p-lg-5 text-white"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(23, 23, 23, 0.9), rgba(234, 179, 8, 0.55)), url(${plexImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "340px",
          }}
        >
          <div className="d-flex flex-column gap-4" style={{ maxWidth: "900px" }}>
            <div className="d-flex flex-wrap align-items-center gap-2">
              <Badge bg="warning" text="dark" className="text-uppercase fw-semibold">
                Plex
              </Badge>
              <Badge bg="dark" className="text-uppercase fw-semibold">
                Private Streaming
              </Badge>
              <span className="small text-light">
                Personal media streaming by CodeType
              </span>
            </div>

            <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-4">
              <div className="flex-grow-1">
                <h2 className="fw-semibold mb-3">Streaming / Plex</h2>
                <p className="mb-4">
                  Access your curated library of movies, shows, and more through a private Plex server.
                  Optimized for browsers, mobile apps, smart TVs, and streaming devices without layout issues.
                </p>
                <div className="d-flex flex-wrap gap-2 align-items-center">
                  <Button variant="light" size="lg" className="text-dark" onClick={handleOpenPlex}>
                    Go to CodeType Plex
                  </Button>
                  <span className="small text-light">
                    Opens <strong>video.codetypeweb.com</strong> in a new tab.
                  </span>
                </div>
              </div>

              <div className="bg-white bg-opacity-10 rounded-3 p-3 p-lg-4 w-100 w-lg-auto small">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-light">Devices</span>
                  <Badge bg="success" text="light">Multi</Badge>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-light">Security</span>
                  <Badge bg="secondary">Managed</Badge>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-light">Availability</span>
                  <Badge bg="primary">24/7</Badge>
                </div>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Detail sections */}
      <Row className="g-4">
        <Col md={6}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <Card.Title className="mb-2">
                How it works
              </Card.Title>
              <Card.Text className="text-muted small mb-3">
                Plex acts as a personal media hub, letting you stream your
                content wherever you are.
              </Card.Text>

              <ul className="small mb-0">
                <li>
                  Access is limited to users with a registered account and
                  granted permissions.
                </li>
                <li>
                  Compatible with web browsers, mobile apps, smart TVs, and
                  streaming devices.
                </li>
                <li>
                  Transcoding and bandwidth are managed server-side for a
                  smooth experience.
                </li>
              </ul>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <Card.Title className="mb-3 fs-6">
                If you see &quot;Your connection is not private&quot;
              </Card.Title>

              <Alert variant="warning" className="small">
                Some browsers may show a certificate warning when connecting.
                Proceed only from networks and devices you trust.
              </Alert>

              <ol className="small mb-0">
                <li className="mb-1">
                  On the warning page, click <code>Advanced</code>.
                </li>
                <li className="mb-1">
                  Click{" "}
                  <code>Proceed to codetypeweb.com (unsafe)</code>.
                </li>
                <li className="mb-1">
                  If you are using Edge or Safari, refresh the page once
                  after proceeding.
                </li>
              </ol>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <div className="mt-4 small text-muted">
        All access permissions, accounts, and endpoints for the Plex server
        are managed by <strong>CodeType</strong>.  
        Account details are shared only through secure private channels.
      </div>
    </div>
  );
}

export default Streaming;
