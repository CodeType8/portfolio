// page: GameServer – game server overview using /games API
import { useEffect, useState, useMemo } from "react";
import { Row, Col, Card, Badge, Button, Spinner } from "react-bootstrap";
import { useApi } from "../hooks/useApi";

import arkImg from "../assets/img/ark.jpg";
import minecraftImg from "../assets/img/minecraft.jpg";
import palworldImg from "../assets/img/palworld.jpg";
import rlcraftImg from "../assets/img/rlcraft.jpg";

// function: getStatusVariant
const getStatusVariant = (status) => {
  if (!status) return "secondary";
  const value = status.toLowerCase();
  if (value === "open") return "success";
  if (value === "closed") return "secondary";
  return "secondary";
};

// function: getStatusLabel
const getStatusLabel = (status) => {
  if (!status) return "Unknown";
  const value = status.toLowerCase();
  if (value === "open") return "Open";
  if (value === "closed") return "Closed";
  return status;
};

// function: getImageBySrc
const getImageBySrc = (imgSrc) => {
  const key = (imgSrc || "").toLowerCase();
  if (key === "minecraft") return minecraftImg;
  if (key === "ark") return arkImg;
  if (key === "palworld") return palworldImg;
  if (key === "rlcraft") return rlcraftImg;
  return minecraftImg; // fallback
};

function GameServer() {
  const { callApi, loading, error } = useApi();

  const [games, setGames] = useState([]);
  const [pagination, setPagination] = useState(null);

  // effect: fetch games from /games
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await callApi("GET", "/games");
        const items = res?.data?.items || [];
        const paginationInfo = res?.data?.pagination || null;

        setGames(items);
        setPagination(paginationInfo);
      } catch {
        setGames([]);
        setPagination(null);
      }
    };

    fetchGames();
  }, [callApi]);

  // memo: open / closed games
  const openGames = useMemo(
    () =>
      games.filter(
        (game) =>
          game.status && game.status.toLowerCase() === "open"
      ),
    [games]
  );

  const closedGames = useMemo(
    () =>
      games.filter(
        (game) =>
          !game.status || game.status.toLowerCase() === "closed"
      ),
    [games]
  );

  return (
    <div className="py-4">
      {/* Header hero */}
      <Card className="border-0 shadow-sm mb-4 rounded-4 overflow-hidden">
        <Card.Body
          className="p-4 p-lg-5 text-white"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(16, 185, 129, 0.6)), url(${minecraftImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="d-flex flex-column gap-3">
            <div className="d-flex flex-wrap align-items-center gap-2">
              <Badge bg="light" text="dark" className="text-uppercase fw-semibold">
                Game Servers
              </Badge>
              <Badge bg="success" className="text-uppercase fw-semibold">
                Live Status
              </Badge>
              <span className="small text-light">
                Minecraft · Palworld · Ark · RLcraft
              </span>
            </div>

            <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-4">
              <div className="flex-grow-1">
                <h2 className="fw-semibold mb-2">Game Server Overview</h2>
                <p className="mb-3">
                  Track which community servers are open, see connection details at a glance,
                  and stay informed about availability managed by CodeType.
                </p>
                <div className="d-flex flex-wrap align-items-center gap-2">
                  <Badge bg="success" pill>
                    {openGames.length} Open
                  </Badge>
                  <Badge bg="secondary" pill>
                    {closedGames.length} Closed
                  </Badge>
                  {pagination && (
                    <span className="small text-light">
                      {pagination.totalItems} total · Page {pagination.page} / {pagination.totalPages}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Loading / Error */}
      {loading && (
        <div className="d-flex align-items-center gap-2 mb-3">
          <Spinner animation="border" size="sm" />
          <span className="small text-muted">Fetching game servers...</span>
        </div>
      )}

      {error && (
        <div className="mb-3 text-danger small">
          Failed to fetch game servers. Check the API or try again.
        </div>
      )}

      {/* Open games */}
      <section className="mb-4">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h5 className="mb-0">Currently Open</h5>
          <Badge bg="success" pill>
            {openGames.length} Servers
          </Badge>
        </div>

        <Row className="g-3">
          {openGames.map((game) => (
            <Col key={game.id} md={4}>
              <Card className="h-100 shadow-sm border-0">
                <Card.Img
                  variant="top"
                  src={getImageBySrc(game.img_src)}
                  alt={game.name}
                />
                <Card.Body className="d-flex flex-column">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <Card.Title className="mb-1">{game.name}</Card.Title>
                    <Badge bg={getStatusVariant(game.status)}>
                      {getStatusLabel(game.status)}
                    </Badge>
                  </div>
                  {game.description && (
                    <Card.Text className="text-muted small mb-2">
                      {game.description}
                    </Card.Text>
                  )}
                  {game.port && (
                    <Card.Text className="small">
                      Port: <strong>{game.port}</strong>
                    </Card.Text>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}

          {!loading && openGames.length === 0 && (
            <Col>
              <div className="text-muted small">
                No open servers at the moment.
              </div>
            </Col>
          )}
        </Row>
      </section>

      {/* Closed games */}
      <section>
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h5 className="mb-0">Closed / Maintenance</h5>
          <Badge bg="secondary" pill>
            {closedGames.length} Servers
          </Badge>
        </div>

        <Row className="g-3">
          {closedGames.map((game) => (
            <Col key={game.id} md={4}>
              <Card className="h-100 shadow-sm border-0 bg-light">
                <Card.Img
                  variant="top"
                  src={getImageBySrc(game.img_src)}
                  alt={game.name}
                />
                <Card.Body className="d-flex flex-column">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <Card.Title className="mb-1">{game.name}</Card.Title>
                    <Badge bg={getStatusVariant(game.status)}>
                      {getStatusLabel(game.status)}
                    </Badge>
                  </div>
                  {game.description && (
                    <Card.Text className="text-muted small mb-2">
                      {game.description}
                    </Card.Text>
                  )}
                  {game.port && (
                    <Card.Text className="small">
                      Port: <strong>{game.port}</strong>
                    </Card.Text>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}

          {!loading && closedGames.length === 0 && (
            <Col>
              <div className="text-muted small">
                No closed servers.
              </div>
            </Col>
          )}
        </Row>
      </section>
    </div>
  );
}

export default GameServer;
