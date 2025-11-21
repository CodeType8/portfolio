// src/components/PageHero.jsx
import { Card, Badge } from "react-bootstrap";

// component: shared hero card used across pages for consistent layout and styling
function PageHero({
  backgroundImage,
  gradient = "linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(34, 197, 94, 0.55))",
  badges = [],
  title,
  description,
  actions,
  meta,
  aside,
}) {
  const backgroundStyle = {
    backgroundImage: `${gradient}, url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <Card className="border-0 shadow-sm mb-4 rounded-4 overflow-hidden">
      <Card.Body className="p-4 p-lg-5 text-white" style={backgroundStyle}>
        <div className="d-flex flex-column gap-3">
          {badges.length > 0 && (
            <div className="d-flex flex-wrap align-items-center gap-2">
              {badges.map((badge) => (
                <Badge
                  key={`${badge.text}-${badge.variant}`}
                  bg={badge.variant}
                  text={badge.textColor}
                  className="text-uppercase fw-semibold"
                  pill={badge.pill}
                >
                  {badge.text}
                </Badge>
              ))}
            </div>
          )}

          <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-4">
            <div className="flex-grow-1">
              {title && <h2 className="fw-semibold mb-2">{title}</h2>}
              {description && <p className="mb-3 mb-lg-4">{description}</p>}
              {actions}
              {meta && <div className="mt-2">{meta}</div>}
            </div>
            {aside}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default PageHero;
