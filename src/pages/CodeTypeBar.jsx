// page: CodeTypeBar – cocktail recipe list
import { useEffect, useState, useMemo, useRef } from "react";
import {
  Row,
  Col,
  Card,
  Badge,
  Button,
  Form,
  InputGroup,
  Spinner,
  Modal,
  ListGroup,
} from "react-bootstrap";
import { useApi } from "../hooks/useApi";

// helper: getAlcoholBadgeVariant
const getAlcoholBadgeVariant = (isAlcoholic) => {
  if (isAlcoholic === true) return "danger";
  if (isAlcoholic === false) return "success";
  return "secondary";
};

// helper: formatAbv
const formatAbv = (abv) => {
  if (!abv && abv !== 0) return "N/A";
  return `${abv}% ABV`;
};

// helper: formatPrepTime
const formatPrepTime = (minutes) => {
  if (!minutes && minutes !== 0) return "Prep time: N/A";
  return `Prep time: ${minutes} min`;
};

// component: renders CodeType Bar recipe explorer with search, filter, and detail view
function CodeTypeBar() {
  const { callApi, loading, error } = useApi();

  // state: base spirits for filtering
  const [bases, setBases] = useState([]);
  // state: list of recipes and pagination meta
  const [recipes, setRecipes] = useState([]);
  const [pagination, setPagination] = useState(null);

  // state: pagination controls
  const [page, setPage] = useState(1);
  const [pageSize] = useState(12);

  // state: filters and search
  const [selectedBaseId, setSelectedBaseId] = useState("");
  const [alcoholFilter, setAlcoholFilter] = useState("all"); // all | alcoholic | non-alcohol
  const [sort, setSort] = useState("-created_at");
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  // state: detail modal
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState(null);

  // effect: fetch bases on mount to hydrate the filter dropdown
  const lastBasesFetchKeyRef = useRef(null);
  useEffect(() => {
    const fetchBases = async () => {
      const requestKey = "bases";
      if (lastBasesFetchKeyRef.current === requestKey) return;
      lastBasesFetchKeyRef.current = requestKey;

      try {
        // Step 1: call Bases API (already working) to populate filter options
        const res = await callApi("GET", "/bases");
        const items = res?.data?.items || [];
        setBases(items);
      } catch {
        // Step 2: gracefully degrade if base list fails so recipes still render
        setBases([]);
        lastBasesFetchKeyRef.current = null;
      }
    };

    fetchBases();
  }, [callApi]);

  // effect: fetch recipes whenever filters/page change using the recipe API contract
  const lastRecipeFetchKeyRef = useRef(null);
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        // Step 1: compose query parameters for /api/bar/recipes
        const query = {
          page,
          limit: pageSize,
          sort,
        };

        if (selectedBaseId) {
          query.base_id = selectedBaseId;
        }

        if (search) {
          query.q = search;
        }

        if (alcoholFilter === "alcoholic") {
          query.is_alcoholic = true;
        } else if (alcoholFilter === "non-alcohol") {
          query.is_alcoholic = false;
        }

        const requestKey = JSON.stringify(query);
        if (lastRecipeFetchKeyRef.current === requestKey) return;
        lastRecipeFetchKeyRef.current = requestKey;

        // Step 2: call the recipe list API and normalize the response shape
        const res = await callApi("GET", "/bar/recipes", { query });
        const payload = res?.data || res;
        const rows = payload?.items || payload?.rows || [];
        const paginationInfo = payload?.pagination || payload?.data?.pagination || payload?.paginationInfo;
        const totalItems =
          paginationInfo?.totalItems ?? payload?.count ?? (rows ? rows.length : 0);

        // Step 3: derive pagination metadata when the API does not return it directly
        if (paginationInfo) {
          setPagination(paginationInfo);
        } else {
          const totalPages = totalItems > 0 ? Math.ceil(totalItems / pageSize) : 0;
          setPagination({
            page,
            limit: pageSize,
            totalItems,
            totalPages,
            hasNextPage: page * pageSize < totalItems,
            hasPreviousPage: page > 1,
          });
        }

        // Step 4: push the recipe rows into state for rendering
        setRecipes(rows);
      } catch {
        setRecipes([]);
        setPagination(null);
        lastRecipeFetchKeyRef.current = null;
      }
    };

    fetchRecipes();
  }, [callApi, page, pageSize, selectedBaseId, search, alcoholFilter, sort]);

  // handler: update base spirit filter
  const handleBaseChange = (event) => {
    setSelectedBaseId(event.target.value);
    setPage(1);
  };

  // handler: update alcohol filter
  const handleAlcoholFilterChange = (event) => {
    setAlcoholFilter(event.target.value);
    setPage(1);
  };

  // handler: update sort order
  const handleSortChange = (event) => {
    setSort(event.target.value);
    setPage(1);
  };

  // handler: track live search input value
  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  // handler: commit search term to query string
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setSearch(searchInput.trim());
    setPage(1);
  };

  // handler: reset all filters back to defaults
  const handleClearFilters = () => {
    setSelectedBaseId("");
    setAlcoholFilter("all");
    setSort("-created_at");
    setSearch("");
    setSearchInput("");
    setPage(1);
  };

  // handler: open detail modal with enriched recipe payload
  const handleOpenRecipe = async (recipeId) => {
    setDetailError(null);
    setDetailLoading(true);

    try {
      // Step 1: fetch the full recipe from /api/bar/recipes/:id
      const res = await callApi("GET", `/bar/recipes/${recipeId}`);
      const recipe = res?.data || res;

      // Step 2: hydrate modal state with API response
      setSelectedRecipe(recipe);
    } catch {
      setDetailError("Failed to load recipe details. Please try again.");
      setSelectedRecipe(null);
    } finally {
      setDetailLoading(false);
    }
  };

  // handler: close detail modal
  const handleCloseRecipe = () => {
    setSelectedRecipe(null);
    setDetailError(null);
  };

  // derived: pagination toggles for buttons
  const hasNextPage = useMemo(
    () => pagination?.hasNextPage === true || (pagination?.totalPages || 0) > page,
    [pagination, page]
  );
  const hasPreviousPage = useMemo(
    () => pagination?.hasPreviousPage === true || page > 1,
    [pagination, page]
  );

  return (
    <div className="py-4">
      {/* Header */}
      <Card className="border-0 shadow-sm mb-4 bg-dark text-white">
        <Card.Body className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
          <div>
            <p className="text-uppercase text-secondary fw-semibold mb-1 small">
              CodeType Bar
            </p>
            <h2 className="mb-1">Signature &amp; Zero-Proof Recipes</h2>
            <p className="text-white-50 mb-0">
              Discover modern cocktails powered by the official CodeType Bar API with live filters and search.
            </p>
          </div>
          <div className="text-end">
            <Badge bg="light" text="dark" pill className="mb-2">
              Live menu
            </Badge>
            <div className="fw-semibold">Crafted for guests &amp; builders</div>
          </div>
        </Card.Body>
      </Card>

      {/* Filters */}
      <Card className="border-0 shadow-sm mb-4">
        <Card.Body>
          <Form onSubmit={handleSearchSubmit}>
            <Row className="g-3 align-items-end">
              <Col md={3}>
                <Form.Label>Base spirit</Form.Label>
                <Form.Select value={selectedBaseId} onChange={handleBaseChange}>
                  <option value="">All bases</option>
                  {bases.map((base) => (
                    <option key={base.id} value={base.id}>
                      {base.name}
                    </option>
                  ))}
                </Form.Select>
              </Col>

              <Col md={3}>
                <Form.Label>Alcohol profile</Form.Label>
                <Form.Select value={alcoholFilter} onChange={handleAlcoholFilterChange}>
                  <option value="all">All drinks</option>
                  <option value="alcoholic">Alcoholic only</option>
                  <option value="non-alcohol">Non-alcohol only</option>
                </Form.Select>
              </Col>

              <Col md={3}>
                <Form.Label>Sort</Form.Label>
                <Form.Select value={sort} onChange={handleSortChange}>
                  <option value="-created_at">Newest first</option>
                  <option value="name">Name (A-Z)</option>
                  <option value="-abv">ABV (high to low)</option>
                  <option value="abv">ABV (low to high)</option>
                  <option value="prep_time">Prep time</option>
                </Form.Select>
              </Col>

              <Col md={3}>
                <Form.Label>Search</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Search by name, ingredients, glass"
                    value={searchInput}
                    onChange={handleSearchInputChange}
                  />
                  <Button type="submit" variant="primary">
                    Search
                  </Button>
                </InputGroup>
              </Col>
            </Row>

            <div className="d-flex justify-content-between align-items-center mt-3">
              <div className="small text-muted">
                {pagination ? (
                  <>
                    Page <strong>{pagination.page}</strong> of <strong>{pagination.totalPages}</strong> ·{" "}
                    <strong>{pagination.totalItems}</strong> recipes
                  </>
                ) : (
                  "Recipe list"
                )}
              </div>
              <Button
                type="button"
                variant="outline-secondary"
                size="sm"
                onClick={handleClearFilters}
              >
                Clear filters
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      {/* Loading / Error */}
      {loading && (
        <div className="d-flex align-items-center gap-2 mb-3">
          <Spinner animation="border" size="sm" />
          <span className="small text-muted">Loading recipes...</span>
        </div>
      )}

      {error && (
        <div className="text-danger small mb-3">
          Failed to load recipes. Check the API or try again.
        </div>
      )}

      {/* Recipe grid */}
      <Row className="g-3">
        {recipes.map((recipe) => (
          <Col key={recipe.id} md={4}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div>
                    <Card.Title className="mb-1">{recipe.name}</Card.Title>
                    <div className="small text-muted">{recipe.Base?.name || "Unknown base"}</div>
                  </div>
                  <div className="d-flex gap-2">
                    <Badge bg={getAlcoholBadgeVariant(recipe.is_alcoholic)}>
                      {recipe.is_alcoholic ? "Alcoholic" : "Non-alcohol"}
                    </Badge>
                  </div>
                </div>

                {recipe.description && (
                  <Card.Text className="small text-muted mb-2">{recipe.description}</Card.Text>
                )}

                <div className="small mb-2">
                  <div>
                    <strong>ABV:</strong> {formatAbv(recipe.abv)}
                  </div>
                  {recipe.glass_type && (
                    <div>
                      <strong>Glass:</strong> {recipe.glass_type}
                    </div>
                  )}
                  {recipe.garnish && (
                    <div>
                      <strong>Garnish:</strong> {recipe.garnish}
                    </div>
                  )}
                  <div>{formatPrepTime(recipe.prep_time_minutes)}</div>
                </div>

                {recipe.ingredients && (
                  <div className="small mb-2">
                    <strong>Ingredients:</strong>
                    <br />
                    <span className="text-muted">{recipe.ingredients}</span>
                  </div>
                )}

                {recipe.instructions && (
                  <div className="small mb-3">
                    <strong>Instructions:</strong>
                    <br />
                    <span className="text-muted">{recipe.instructions}</span>
                  </div>
                )}

                <div className="d-flex align-items-center justify-content-between mt-auto">
                  <div className="small text-muted">ID: {recipe.id}</div>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => handleOpenRecipe(recipe.id)}
                  >
                    View recipe
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}

        {!loading && recipes.length === 0 && (
          <Col>
            <div className="text-muted small">No recipes found with the current filters.</div>
          </Col>
        )}
      </Row>

      {/* Pagination controls */}
      {pagination && (hasPreviousPage || hasNextPage) && (
        <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
          <Button
            variant="outline-secondary"
            size="sm"
            disabled={!hasPreviousPage || loading}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          >
            Previous
          </Button>
          <span className="small text-muted">
            Page {pagination.page} of {pagination.totalPages}
          </span>
          <Button
            variant="outline-secondary"
            size="sm"
            disabled={!hasNextPage || loading}
            onClick={() =>
              setPage((prev) =>
                pagination.totalPages
                  ? Math.min(prev + 1, pagination.totalPages)
                  : prev + 1
              )
            }
          >
            Next
          </Button>
        </div>
      )}

      {/* Detail modal */}
      <Modal show={!!selectedRecipe} onHide={handleCloseRecipe} centered size="lg">
        <Modal.Header closeButton>
          <div className="d-flex flex-column">
            <Modal.Title className="mb-1">{selectedRecipe?.name || "Recipe"}</Modal.Title>
            <span className="small text-muted">
              {selectedRecipe?.Base?.name || "Unknown base"} · {selectedRecipe?.glass_type || "Glass TBD"}
            </span>
          </div>
        </Modal.Header>
        <Modal.Body>
          {detailLoading && (
            <div className="d-flex align-items-center gap-2 mb-3">
              <Spinner animation="border" size="sm" />
              <span className="small text-muted">Loading recipe details...</span>
            </div>
          )}

          {detailError && <div className="text-danger small mb-3">{detailError}</div>}

          {!detailLoading && selectedRecipe && (
            <div className="d-flex flex-column gap-3">
              {selectedRecipe.description && (
                <p className="mb-0 text-muted">{selectedRecipe.description}</p>
              )}

              <div className="d-flex flex-wrap gap-2">
                <Badge bg={getAlcoholBadgeVariant(selectedRecipe.is_alcoholic)}>
                  {selectedRecipe.is_alcoholic ? "Alcoholic" : "Non-alcohol"}
                </Badge>
                <Badge bg="dark">{formatAbv(selectedRecipe.abv)}</Badge>
                <Badge bg="secondary">{formatPrepTime(selectedRecipe.prep_time_minutes)}</Badge>
                {selectedRecipe.garnish && <Badge bg="info">Garnish: {selectedRecipe.garnish}</Badge>}
              </div>

              {selectedRecipe.ingredients && (
                <div>
                  <h6 className="mb-1">Ingredients</h6>
                  <p className="mb-0 text-muted">{selectedRecipe.ingredients}</p>
                </div>
              )}

              {selectedRecipe.instructions && (
                <div>
                  <h6 className="mb-1">Directions</h6>
                  <p className="mb-0 text-muted">{selectedRecipe.instructions}</p>
                </div>
              )}

              <ListGroup>
                <ListGroup.Item className="d-flex justify-content-between">
                  <span className="text-muted">Recipe ID</span>
                  <span>{selectedRecipe.id}</span>
                </ListGroup.Item>
                {selectedRecipe.abv !== undefined && (
                  <ListGroup.Item className="d-flex justify-content-between">
                    <span className="text-muted">ABV</span>
                    <span>{formatAbv(selectedRecipe.abv)}</span>
                  </ListGroup.Item>
                )}
                {selectedRecipe.prep_time_minutes !== undefined && (
                  <ListGroup.Item className="d-flex justify-content-between">
                    <span className="text-muted">Prep time</span>
                    <span>{formatPrepTime(selectedRecipe.prep_time_minutes)}</span>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseRecipe}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CodeTypeBar;
