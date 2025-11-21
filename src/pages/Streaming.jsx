// page: Streaming – modern Plex landing
import { Card, Button, Row, Col, Alert, Badge } from "react-bootstrap";
import PageHero from "../components/PageHero";
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
      <PageHero
        backgroundImage={plexImg}
        gradient="linear-gradient(135deg, rgba(23, 23, 23, 0.9), rgba(234, 179, 8, 0.55))"
        badges={[
          {
            text: "Plex",
            variant: "warning",
            textColor: "dark",
          },
          {
            text: "Private Streaming",
            variant: "dark",
          },
        ]}
        title="Streaming / Plex"
        description="Access your curated library of movies, shows, and more through a private Plex server. Optimized for browsers, mobile apps, smart TVs, and streaming devices without layout issues."
        actions={(
          <div className="d-flex flex-wrap gap-2 align-items-center mb-2">
            <Button variant="light" size="lg" className="text-dark" onClick={handleOpenPlex}>
              Go to CodeType Plex
            </Button>
          </div>
        )}
        meta={(
          <span className="small text-light">
            Opens <strong>video.codetypeweb.com</strong> in a new tab.
          </span>
        )}
      />

      {/* Detail sections */}
      <Row className="g-4">
        <Col md={6}>
          <Card className="gradient-card bg-gradient-sky h-100">
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
          <Card className="gradient-card bg-gradient-peach h-100">
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
