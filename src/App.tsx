import * as React from "react";
import {
  Accordion,
  Alert,
  AppBar,
  Autocomplete,
  Avatar,
  Backdrop,
  Badge,
  BottomNavigation,
  Box,
  Breadcrumbs,
  Button,
  ButtonGroup,
  Calendar,
  Card,
  Carousel,
  Chart,
  Checkbox,
  Chip,
  Container,
  DataGrid,
  DataTable,
  DatePicker,
  Dialog,
  Divider,
  Drawer,
  EmptyState,
  FileUpload,
  FloatingActionButton,
  Grid,
  Icon,
  ImageList,
  Link,
  List,
  Masonry,
  Menu,
  MenuBar,
  Modal,
  NumberField,
  Pagination,
  Paper,
  Popover,
  Progress,
  RadioGroup,
  Rating,
  SearchForm,
  Select,
  Sidebar,
  Skeleton,
  Slider,
  Snackbar,
  SpeedDial,
  Spinner,
  Stack,
  Stepper,
  Switch,
  Tabs,
  Textarea,
  TextInput,
  TimePicker,
  Timeline,
  ToggleGroup,
  Toolbar,
  Tooltip,
  TransferList,
  TreeView,
  Typography,
  WorkflowBoard,
} from "@corvaui/react";

type ThemeMode = "light" | "dark";
type RouteId =
  | "exhibition"
  | "overview"
  | "collection"
  | "loans"
  | "conservation"
  | "calendar"
  | "settings"
  | "proof";
type Navigate = (route: RouteId) => void;
type PageProps = {
  navigate: Navigate;
  showMessage: (
    message: string,
    tone?: "info" | "success" | "warning" | "danger",
  ) => void;
};

const assetBase = window.location.pathname.startsWith("/corvaui-demo-react")
  ? "/corvaui-demo-react/"
  : "/";
const galleryImage = `${assetBase}images/morrow/gallery-installation.png`;
const conservationImage = `${assetBase}images/morrow/conservation-detail.png`;
const logisticsImage = `${assetBase}images/morrow/collections-logistics.png`;
const elenaPortrait = `${assetBase}images/morrow/elena-ruiz.webp`;
const aminaPortrait = `${assetBase}images/morrow/amina-morrow.webp`;
const jonPortrait = `${assetBase}images/morrow/jon-bell.webp`;

const routes: Array<{
  id: RouteId;
  label: string;
  shortLabel: string;
  icon: React.ReactNode;
}> = [
  {
    id: "exhibition",
    label: "Exhibition",
    shortLabel: "Exhibit",
    icon: <Icon name="presentation" />,
  },
  {
    id: "overview",
    label: "Operations",
    shortLabel: "Today",
    icon: <Icon name="activity" />,
  },
  {
    id: "collection",
    label: "Collection",
    shortLabel: "Objects",
    icon: <Icon name="database" />,
  },
  {
    id: "loans",
    label: "Loans",
    shortLabel: "Loans",
    icon: <Icon name="workflow" />,
  },
  {
    id: "conservation",
    label: "Conservation",
    shortLabel: "Care",
    icon: <Icon name="shieldCheck" />,
  },
  {
    id: "calendar",
    label: "Installation calendar",
    shortLabel: "Schedule",
    icon: <Icon name="calendar" />,
  },
  {
    id: "settings",
    label: "Institution settings",
    shortLabel: "Settings",
    icon: <Icon name="settings" />,
  },
  {
    id: "proof",
    label: "System proof",
    shortLabel: "Proof",
    icon: <Icon name="component" />,
  },
];

const collectionRows = [
  {
    accession: "MA.2024.018",
    object: "Threshold Study III",
    maker: "Leona Varga",
    year: "1938",
    medium: "Pigment and linen",
    location: "Gallery 2",
    status: "On view",
  },
  {
    accession: "MA.2019.153",
    object: "Mountain Valley",
    maker: "Amara Bell",
    year: "1867",
    medium: "Oil on canvas",
    location: "Conservation",
    status: "Treatment",
  },
  {
    accession: "MA.2022.044",
    object: "Counterweight No. 6",
    maker: "Tomas Ibarra",
    year: "1971",
    medium: "Carved basalt",
    location: "Gallery 2",
    status: "On view",
  },
  {
    accession: "MA.2017.091",
    object: "River Index",
    maker: "Nadia Okafor",
    year: "2008",
    medium: "Silver gelatin print",
    location: "Store B-14",
    status: "Available",
  },
  {
    accession: "MA.2021.207",
    object: "Signal Field",
    maker: "Jun Park",
    year: "1994",
    medium: "Painted steel",
    location: "Outbound",
    status: "Loan prep",
  },
  {
    accession: "MA.2015.032",
    object: "Archive for Rain",
    maker: "Mila Sayegh",
    year: "1982",
    medium: "Paper and graphite",
    location: "Study room",
    status: "Reserved",
  },
  {
    accession: "MA.2023.116",
    object: "Listening Stone",
    maker: "Kwame Mensah",
    year: "2017",
    medium: "Granite and copper",
    location: "Gallery 1",
    status: "On view",
  },
  {
    accession: "MA.2018.064",
    object: "Vessel for North Light",
    maker: "Sora Lind",
    year: "1954",
    medium: "Glazed ceramic",
    location: "Store C-02",
    status: "Available",
  },
];

const loanRows = [
  {
    ref: "LN-2481",
    object: "Signal Field",
    lender: "Morrow Archive",
    destination: "Kunsthalle Nord",
    depart: "12 Sep",
    risk: "Medium",
    status: "Packing",
  },
  {
    ref: "LN-2476",
    object: "River Index",
    lender: "Morrow Archive",
    destination: "Musée du Passage",
    depart: "18 Sep",
    risk: "Low",
    status: "Approved",
  },
  {
    ref: "LN-2468",
    object: "Mountain Valley",
    lender: "Cascadia Gallery",
    destination: "Morrow Archive",
    depart: "03 Oct",
    risk: "High",
    status: "Condition review",
  },
  {
    ref: "LN-2459",
    object: "Study in Ochre",
    lender: "Private collection",
    destination: "Morrow Archive",
    depart: "11 Oct",
    risk: "Medium",
    status: "Insurance",
  },
  {
    ref: "LN-2444",
    object: "Coastal Measure",
    lender: "Morrow Archive",
    destination: "Ridge Museum",
    depart: "22 Oct",
    risk: "Low",
    status: "Requested",
  },
  {
    ref: "LN-2432",
    object: "North Window",
    lender: "Morrow Archive",
    destination: "Aster Foundation",
    depart: "30 Oct",
    risk: "Medium",
    status: "Courier hold",
  },
];

const loanColumns = [
  { key: "ref", header: "Reference", sortable: true, filterable: true },
  { key: "object", header: "Object", sortable: true, filterable: true },
  {
    key: "destination",
    header: "Destination",
    sortable: true,
    filterable: true,
  },
  { key: "depart", header: "Departure", sortable: true },
  {
    key: "risk",
    header: "Risk",
    sortable: true,
    filterable: true,
    render: (row: Record<string, React.ReactNode>) => (
      <Badge
        tone={
          row.risk === "High"
            ? "danger"
            : row.risk === "Medium"
              ? "warning"
              : "success"
        }
      >
        {row.risk}
      </Badge>
    ),
    value: (row: Record<string, React.ReactNode>) => String(row.risk),
  },
  { key: "status", header: "Status", sortable: true, filterable: true },
];

const calendarDays = Array.from({ length: 35 }, (_, index) => {
  const date = index - 1;
  const events: Record<number, string> = {
    3: "Courier",
    7: "Rig",
    12: "4",
    16: "Light",
    18: "VIP",
    23: "Close",
    27: "Return",
  };
  const label =
    date === -1
      ? "30"
      : date === 0
        ? "31"
        : date === 32
          ? "1"
          : date === 33
            ? "2"
            : String(date);
  return {
    id: `august-${index}`,
    label,
    muted: date <= 0 || date > 31,
    selected: date === 12,
    badge: events[date],
  };
});

const coverageRows = [
  {
    group: "Atoms",
    count: "30",
    routes: "All routes",
    status: <Badge tone="success">Covered</Badge>,
  },
  {
    group: "Molecules",
    count: "30",
    routes: "Editorial, workflows, settings",
    status: <Badge tone="success">Covered</Badge>,
  },
  {
    group: "Organisms",
    count: "7",
    routes: "Collection, loans, calendar",
    status: <Badge tone="success">Covered</Badge>,
  },
];

function routeFromHash(): RouteId {
  const candidate = window.location.hash.replace(/^#\/?/, "") || "exhibition";
  return routes.some((route) => route.id === candidate)
    ? (candidate as RouteId)
    : "exhibition";
}

function useEscape(onEscape: () => void, enabled: boolean) {
  React.useEffect(() => {
    if (!enabled) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onEscape();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [enabled, onEscape]);
}

export function App() {
  const [route, setRoute] = React.useState<RouteId>(() => routeFromHash());
  const [mode, setMode] = React.useState<ThemeMode>(() =>
    window.localStorage.getItem("morrow-theme") === "dark" ? "dark" : "light",
  );
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [notice, setNotice] = React.useState<{
    message: string;
    tone: "info" | "success" | "warning" | "danger";
  } | null>(null);
  const theme = `concept-${mode}`;
  const closeMobileNavigation = React.useCallback(
    () => setMobileOpen(false),
    [],
  );
  useEscape(closeMobileNavigation, mobileOpen);

  React.useEffect(() => {
    const sync = () => setRoute(routeFromHash());
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  React.useEffect(() => {
    document.documentElement.dataset.corvaTheme = theme;
    window.localStorage.setItem("morrow-theme", mode);
  }, [mode, theme]);

  React.useEffect(() => {
    setMobileOpen(false);
    document.getElementById("page-title")?.focus();
  }, [route]);

  const navigate: Navigate = (next) => {
    window.location.hash = next === "exhibition" ? "#/" : `#/${next}`;
    setRoute(next);
  };

  const showMessage: PageProps["showMessage"] = (message, tone = "success") => {
    setNotice({ message, tone });
    window.setTimeout(() => setNotice(null), 4200);
  };

  const current = routes.find((item) => item.id === route) ?? routes[0];
  const appRoutes = routes.filter((item) => item.id !== "exhibition");

  return (
    <div className="app-root" data-corva-theme={theme}>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <AppBar
        className="global-appbar"
        title="Morrow Archive"
        navigation={
          <MenuBar
            className="desktop-menubar"
            label="Primary"
            items={routes.map((item) => ({
              id: item.id,
              label: item.label,
              current: route === item.id,
              onSelect: () => navigate(item.id),
            }))}
          />
        }
        actions={
          <Stack direction="row" gap="sm" align="center">
            <Tooltip
              content={`Use ${mode === "light" ? "dark" : "light"} theme`}
            >
              <Button
                variant="secondary"
                size="sm"
                aria-label={`Use ${mode === "light" ? "dark" : "light"} theme`}
                onClick={() => setMode(mode === "light" ? "dark" : "light")}
              >
                <Icon name={mode === "light" ? "visibility" : "contrast"} />
              </Button>
            </Tooltip>
            <button
              className="menu-trigger"
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation"
            >
              <Icon name="menu" />
              <span>Menu</span>
            </button>
            <Avatar
              initials="AM"
              size="sm"
              aria-label="Signed in as Amina Morrow"
            />
          </Stack>
        }
      />

      <Drawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        title="Navigate Morrow Archive"
        className="mobile-drawer"
      >
        <Sidebar
          activeId={route}
          heading="Workspaces"
          label="Mobile routes"
          items={routes.map((item) => ({
            id: item.id,
            label: item.label,
            icon: item.icon,
            badge:
              item.id === "loans" ? <Badge tone="warning">3</Badge> : undefined,
          }))}
          onSelect={(id) => navigate(id as RouteId)}
          footer={
            <Switch
              label="Dark theme"
              checked={mode === "dark"}
              onChange={() => setMode(mode === "light" ? "dark" : "light")}
            />
          }
        />
      </Drawer>

      <div
        className={route === "exhibition" ? "public-layout" : "product-layout"}
      >
        {route !== "exhibition" && (
          <aside className="desktop-sidebar-shell">
            <Sidebar
              activeId={route}
              heading="Morrow operations"
              label="Product routes"
              items={appRoutes.map((item) => ({
                id: item.id,
                label: item.label,
                icon: item.icon,
                badge:
                  item.id === "loans" ? (
                    <Badge tone="warning">3</Badge>
                  ) : undefined,
              }))}
              onSelect={(id) => navigate(id as RouteId)}
              footer={
                <Stack gap="sm">
                  <Typography variant="caption">
                    Concept theme · v0.1.7
                  </Typography>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => navigate("exhibition")}
                  >
                    View exhibition
                  </Button>
                </Stack>
              }
            />
          </aside>
        )}
        <main
          id="main-content"
          className="main-content"
          aria-label={`${current.label} page`}
        >
          {route === "exhibition" && (
            <ExhibitionPage navigate={navigate} showMessage={showMessage} />
          )}
          {route === "overview" && (
            <OverviewPage navigate={navigate} showMessage={showMessage} />
          )}
          {route === "collection" && (
            <CollectionPage navigate={navigate} showMessage={showMessage} />
          )}
          {route === "loans" && (
            <LoansPage navigate={navigate} showMessage={showMessage} />
          )}
          {route === "conservation" && (
            <ConservationPage navigate={navigate} showMessage={showMessage} />
          )}
          {route === "calendar" && (
            <CalendarPage navigate={navigate} showMessage={showMessage} />
          )}
          {route === "settings" && (
            <SettingsPage
              navigate={navigate}
              showMessage={showMessage}
              mode={mode}
              setMode={setMode}
            />
          )}
          {route === "proof" && (
            <ProofPage navigate={navigate} showMessage={showMessage} />
          )}
        </main>
      </div>

      {route !== "exhibition" && (
        <BottomNavigation
          className="mobile-bottom-nav"
          activeId={route}
          label="Primary mobile navigation"
          items={[
            { id: "overview", label: "Today", icon: <Icon name="activity" /> },
            {
              id: "collection",
              label: "Objects",
              icon: <Icon name="database" />,
            },
            { id: "loans", label: "Loans", icon: <Icon name="workflow" /> },
            {
              id: "calendar",
              label: "Schedule",
              icon: <Icon name="calendar" />,
            },
          ]}
          onChange={(id) => navigate(id as RouteId)}
        />
      )}
      {(route === "collection" || route === "loans") && (
        <FloatingActionButton
          className="mobile-fab"
          size="md"
          aria-label="Create a new record"
          onClick={() => showMessage("New record workspace opened.", "info")}
        >
          <Icon name="add" />
        </FloatingActionButton>
      )}
      <Snackbar
        className="app-snackbar"
        open={Boolean(notice)}
        tone={notice?.tone}
        action={
          <Button size="sm" variant="secondary" onClick={() => setNotice(null)}>
            Dismiss
          </Button>
        }
      >
        {notice?.message}
      </Snackbar>
    </div>
  );
}

function ExhibitionPage({ navigate, showMessage }: PageProps) {
  return (
    <div className="exhibition-page">
      <section className="exhibition-hero" aria-labelledby="page-title">
        <div className="hero-copy">
          <span className="eyebrow">Current exhibition · Gallery 2</span>
          <Typography
            id="page-title"
            tabIndex={-1}
            as="h1"
            variant="display"
            className="display-title"
          >
            Measures of distance
          </Typography>
          <Typography variant="subtitle">
            Thirty-two works trace how artists have measured absence, migration,
            and memory from 1938 to the present.
          </Typography>
          <Stack
            direction="row"
            gap="sm"
            align="center"
            className="hero-actions"
          >
            <Button onClick={() => navigate("overview")}>
              Enter operations
            </Button>
            <Button variant="secondary" onClick={() => navigate("collection")}>
              Explore the collection
            </Button>
          </Stack>
        </div>
        <figure className="hero-image">
          <img
            src={galleryImage}
            alt="A mineral-teal museum gallery being prepared around a tall abstract stone sculpture"
            fetchPriority="high"
          />
          <figcaption>
            Installation view, Gallery 2 · Final alignment underway
          </figcaption>
        </figure>
        <aside className="hero-register" aria-label="Exhibition register">
          <span className="eyebrow">Exhibition register</span>
          <Typography as="h2" variant="title">
            Opening 18 September
          </Typography>
          <dl className="metadata-list">
            <div>
              <dt>Curator</dt>
              <dd>Elena Ruiz</dd>
            </div>
            <div>
              <dt>Objects</dt>
              <dd>32 confirmed</dd>
            </div>
            <div>
              <dt>Loans</dt>
              <dd>14 incoming</dd>
            </div>
            <div>
              <dt>Readiness</dt>
              <dd>82 percent</dd>
            </div>
          </dl>
          <Progress value={82} label="Exhibition readiness" />
          <Alert tone="warning" title="Condition report due">
            Cascadia Gallery evidence is required by 17:00 today.
          </Alert>
          <Link href="#/loans" variant="standalone">
            Review incoming loans
          </Link>
        </aside>
      </section>
      <section
        className="public-register section-rule"
        aria-labelledby="register-title"
      >
        <div className="section-heading">
          <div>
            <span className="eyebrow">A working exhibition</span>
            <Typography id="register-title" as="h2" variant="title">
              Editorial invitation meets operational evidence.
            </Typography>
          </div>
          <Typography variant="body">
            The public story and the private register share one source of truth:
            objects, loans, people, condition history, and installation
            decisions.
          </Typography>
        </div>
        <Grid columns="three" gap="lg" className="register-facts">
          <Box padding="lg" surface="subtle">
            <Metric
              label="Objects on site"
              value="26 / 32"
              note="Four arrivals this week"
            />
          </Box>
          <Box padding="lg" surface="subtle">
            <Metric
              label="Critical checks"
              value="3"
              note="Two conservation, one rigging"
            />
          </Box>
          <Box padding="lg" surface="subtle">
            <Metric
              label="Public programme"
              value="11"
              note="Talks, tours, and study sessions"
            />
          </Box>
        </Grid>
      </section>
      <section
        className="editorial-split section-rule"
        aria-labelledby="story-title"
      >
        <div className="editorial-copy">
          <span className="eyebrow">The exhibition story</span>
          <Typography id="story-title" as="h2" variant="title">
            A ledger can hold more than numbers.
          </Typography>
          <Typography variant="body">
            Every movement leaves a trace: a courier note, a change in surface
            condition, a shifted sightline, a new relationship between works.
            Morrow Archive keeps those traces legible without flattening the
            objects into inventory.
          </Typography>
          <List
            ordered
            items={[
              {
                id: "one",
                label: "Arrival",
                description:
                  "Evidence and courier observations join the object record.",
              },
              {
                id: "two",
                label: "Installation",
                description:
                  "Rigging, light, and placement decisions become shared tasks.",
              },
              {
                id: "three",
                label: "Interpretation",
                description:
                  "Research and public programme connect to the same collection graph.",
              },
            ]}
          />
        </div>
        <Carousel
          label="Exhibition perspectives"
          items={[
            {
              id: "curator",
              label: "Curator perspective",
              content: (
                <QuoteBlock
                  quote="The register gives us a way to see the exhibition changing before the doors open."
                  person="Elena Ruiz"
                  role="Curator of modern collections"
                  image={elenaPortrait}
                />
              ),
            },
            {
              id: "registrar",
              label: "Registrar perspective",
              content: (
                <QuoteBlock
                  quote="Every request, certificate, and handoff sits beside the object it protects."
                  person="Amina Morrow"
                  role="Senior registrar"
                  image={aminaPortrait}
                />
              ),
            },
            {
              id: "conservator",
              label: "Conservator perspective",
              content: (
                <QuoteBlock
                  quote="Condition evidence stays useful because the context never falls away."
                  person="Jon Bell"
                  role="Paintings conservator"
                  image={jonPortrait}
                />
              ),
            },
          ]}
        />
      </section>
      <section
        className="image-led-section section-rule"
        aria-labelledby="behind-title"
      >
        <figure>
          <img
            src={logisticsImage}
            alt="Two museum art handlers preparing a wrapped sculpture beside a custom travel crate"
            loading="lazy"
          />
        </figure>
        <div className="image-led-copy">
          <span className="eyebrow">Behind the exhibition</span>
          <Typography id="behind-title" as="h2" variant="title">
            Care is a choreography of small decisions.
          </Typography>
          <Typography variant="body">
            From crate design to courier windows, the installation plan
            translates specialist knowledge into a sequence the whole team can
            follow.
          </Typography>
          <Accordion
            items={[
              {
                id: "handling",
                title: "Handling standard",
                content:
                  "Two trained handlers, nitrile gloves, padded lift table, and a documented pause before final placement.",
              },
              {
                id: "climate",
                title: "Climate envelope",
                content:
                  "Relative humidity remains between 48 and 54 percent during acclimatization and gallery installation.",
              },
              {
                id: "public",
                title: "Public access",
                content:
                  "Gallery 2 reopens at 10:00 on 18 September after a final overnight environmental review.",
              },
            ]}
          />
          <Button
            className="image-led-cta"
            onClick={() => {
              showMessage("Behind-the-scenes visit added to your schedule.");
              navigate("calendar");
            }}
          >
            Reserve a study visit
          </Button>
        </div>
      </section>
    </div>
  );
}

function OverviewPage({ navigate, showMessage }: PageProps) {
  const [state, setState] = React.useState<"ready" | "loading" | "error">(
    "ready",
  );
  const [popoverOpen, setPopoverOpen] = React.useState(false);
  React.useEffect(() => {
    if (state !== "loading") return;
    const timer = window.setTimeout(() => setState("ready"), 900);
    return () => window.clearTimeout(timer);
  }, [state]);
  return (
    <PageFrame
      route="Operations"
      title="Today across Morrow"
      description="Opening readiness, collection movement, conservation risk, and team capacity in one working view."
    >
      <Toolbar
        label="Operations controls"
        density="compact"
        actions={
          <ButtonGroup label="Data state controls">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => setState("loading")}
            >
              Refresh
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => setState("error")}
            >
              Simulate issue
            </Button>
          </ButtonGroup>
        }
      >
        <Badge tone="success">Live · updated 09:42</Badge>
        <ToggleGroup
          label="Overview range"
          value="week"
          onValueChange={() => undefined}
          options={[
            { label: "Today", value: "day" },
            { label: "7 days", value: "week" },
            { label: "30 days", value: "month" },
          ]}
        />
      </Toolbar>
      {state === "error" && (
        <Alert tone="danger" title="Movement feed is unavailable">
          The courier service did not respond. Last confirmed movement data is
          still shown.{" "}
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setState("loading")}
          >
            Retry movement feed
          </Button>
        </Alert>
      )}
      {state === "loading" ? (
        <Grid columns="three" gap="lg" aria-label="Refreshing operational data">
          <Skeleton
            variant="rectangular"
            size="lg"
            label="Loading readiness summary"
          />
          <Skeleton
            variant="rectangular"
            size="lg"
            label="Loading collection movement"
          />
          <Skeleton
            variant="rectangular"
            size="lg"
            label="Loading team workload"
          />
        </Grid>
      ) : (
        <>
          <section className="metric-strip" aria-label="Operational summary">
            <Metric
              label="Opening readiness"
              value="82%"
              note="Up 7 points since Monday"
            />
            <Metric
              label="Objects in motion"
              value="9"
              note="Three arrive before 16:00"
            />
            <Metric label="Condition actions" value="4" note="One due today" />
            <Metric
              label="Team capacity"
              value="76%"
              note="Rigging crew is at limit"
            />
          </section>
          <section className="overview-grid">
            <div className="overview-primary section-rule">
              <div className="panel-title-row">
                <div>
                  <span className="eyebrow">Readiness by discipline</span>
                  <Typography as="h2" variant="title">
                    What moves the opening forward
                  </Typography>
                </div>
                <Popover
                  open={popoverOpen}
                  placement="start"
                  trigger={
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => setPopoverOpen((value) => !value)}
                    >
                      How calculated
                    </Button>
                  }
                  content={
                    <Typography variant="caption">
                      Readiness combines completed tasks, passed evidence
                      checks, and confirmed courier windows.
                    </Typography>
                  }
                />
              </div>
              <Chart
                label="Opening readiness by discipline"
                data={[
                  { label: "Registration", value: 94 },
                  { label: "Conservation", value: 78 },
                  { label: "Installation", value: 72 },
                  { label: "Interpretation", value: 86 },
                  { label: "Visitor services", value: 81 },
                ]}
              />
            </div>
            <Paper elevation="sm" className="attention-queue">
              <div className="panel-title-row">
                <Typography as="h2" variant="title">
                  Attention queue
                </Typography>
                <Badge tone="warning">4 items</Badge>
              </div>
              <List
                items={[
                  {
                    id: "condition",
                    label: "Condition report · Mountain Valley",
                    description: "Due today at 17:00",
                    meta: (
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => navigate("conservation")}
                      >
                        Open
                      </Button>
                    ),
                  },
                  {
                    id: "courier",
                    label: "Courier confirmation · LN-2432",
                    description: "Response overdue by 3 hours",
                    meta: (
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => navigate("loans")}
                      >
                        Review
                      </Button>
                    ),
                  },
                  {
                    id: "rig",
                    label: "Rigging method · Counterweight No. 6",
                    description: "Technical sign-off required",
                    meta: (
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() =>
                          showMessage("Technical review assigned to Milo Chen.")
                        }
                      >
                        Assign
                      </Button>
                    ),
                  },
                ]}
              />
            </Paper>
          </section>
          <section className="overview-grid section-rule">
            <Paper elevation="sm">
              <div className="panel-title-row">
                <div>
                  <span className="eyebrow">Environment</span>
                  <Typography as="h2" variant="title">
                    Gallery 2 stability
                  </Typography>
                </div>
                <Badge tone="success">Within range</Badge>
              </div>
              <Chart
                label="Gallery 2 environment"
                data={[
                  { label: "Humidity", value: 51 },
                  { label: "Temperature", value: 68 },
                  { label: "Light exposure", value: 42 },
                ]}
              />
            </Paper>
            <div className="section-rule">
              <span className="eyebrow">Latest movement</span>
              <Timeline
                events={[
                  {
                    id: "m1",
                    label: "Crate 14 entered acclimatization",
                    description: "Receiving store · Maya Ortega",
                    meta: "09:18",
                  },
                  {
                    id: "m2",
                    label: "Signal Field cleared for packing",
                    description: "Conservation studio · Jon Bell",
                    meta: "08:42",
                  },
                  {
                    id: "m3",
                    label: "Courier route acknowledged",
                    description: "Kunsthalle Nord · LN-2481",
                    meta: "08:06",
                  },
                ]}
              />
            </div>
          </section>
        </>
      )}
    </PageFrame>
  );
}

function CollectionPage({ showMessage }: PageProps) {
  const [query, setQuery] = React.useState("");
  const [activeTab, setActiveTab] = React.useState("register");
  const [page, setPage] = React.useState(1);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [syncing, setSyncing] = React.useState(false);
  const [view, setView] = React.useState("table");
  const closeCollectionOverlays = React.useCallback(() => {
    setModalOpen(false);
    setDrawerOpen(false);
  }, []);
  useEscape(closeCollectionOverlays, modalOpen || drawerOpen);
  const filteredRows = collectionRows.filter((row) =>
    `${row.accession} ${row.object} ${row.maker} ${row.status}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );
  const visibleRows = filteredRows.slice((page - 1) * 4, page * 4);
  React.useEffect(() => {
    if (!syncing) return;
    const timer = window.setTimeout(() => {
      setSyncing(false);
      showMessage("Collection records synchronized.");
    }, 1000);
    return () => window.clearTimeout(timer);
  }, [showMessage, syncing]);
  return (
    <PageFrame
      route="Collection / Register"
      title="The collection register"
      description="Search, locate, compare, and act on collection records without losing their material and institutional context."
    >
      <Toolbar
        label="Collection tools"
        density="compact"
        actions={
          <ButtonGroup label="Collection actions">
            <Button size="sm" onClick={() => setDrawerOpen(true)}>
              Create object
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => setSyncing(true)}
            >
              Synchronize
            </Button>
          </ButtonGroup>
        }
      >
        <SearchForm
          className="collection-search"
          label="Search collection"
          placeholder="Object, maker, accession, or status"
          submitLabel="Find objects"
          onSubmit={(value) => {
            setQuery(value);
            setPage(1);
          }}
        />
      </Toolbar>
      <div className="filter-row" aria-label="Active collection filters">
        <Chip selected>Modern collection</Chip>
        <Chip>On view</Chip>
        <Chip>Loan eligible</Chip>
        <Chip>Needs photography</Chip>
        <ToggleGroup
          label="Collection view"
          value={view}
          onValueChange={setView}
          options={[
            { label: "Register", value: "table" },
            { label: "Images", value: "images" },
          ]}
        />
      </div>
      <Tabs
        activeId={activeTab}
        onChange={setActiveTab}
        label="Collection workspace"
        items={[
          { id: "register", label: "Register" },
          { id: "hierarchy", label: "Hierarchy" },
          { id: "saved", label: "Saved views" },
        ]}
      />
      {activeTab === "register" && filteredRows.length === 0 && (
        <EmptyState
          align="start"
          icon={<Icon name="folderSearch" size="lg" />}
          title="No collection records match this search"
          description={`Nothing matches “${query}”. Clear the search or broaden the active taxonomy.`}
          action={<Button onClick={() => setQuery("")}>Clear search</Button>}
          secondaryAction={
            <Button
              variant="secondary"
              onClick={() =>
                showMessage("A saved-search draft was created.", "info")
              }
            >
              Save this search
            </Button>
          }
        />
      )}
      {activeTab === "register" &&
        filteredRows.length > 0 &&
        view === "table" && (
          <>
            <div className="desktop-records">
              <DataTable
                caption="Collection objects"
                columns={[
                  { key: "accession", header: "Accession" },
                  { key: "object", header: "Object" },
                  { key: "maker", header: "Maker" },
                  { key: "year", header: "Year" },
                  { key: "medium", header: "Medium" },
                  { key: "location", header: "Location" },
                  { key: "status", header: "Status" },
                  { key: "actions", header: "Actions" },
                ]}
                rows={visibleRows.map((row) => ({
                  ...row,
                  status: (
                    <Badge
                      tone={
                        row.status === "Treatment"
                          ? "warning"
                          : row.status === "On view"
                            ? "success"
                            : "neutral"
                      }
                    >
                      {row.status}
                    </Badge>
                  ),
                  actions: (
                    <Menu
                      label={
                        <>
                          <Icon name="moreHorizontal" />
                          <span className="sr-only">
                            Actions for {row.object}
                          </span>
                        </>
                      }
                      items={[
                        {
                          id: "view",
                          label: "Quick view",
                          onSelect: () => setModalOpen(true),
                        },
                        {
                          id: "history",
                          label: "Open history",
                          onSelect: () => setDrawerOpen(true),
                        },
                        {
                          id: "loan",
                          label: "Start loan request",
                          onSelect: () =>
                            showMessage(
                              `Loan request started for ${row.object}.`,
                              "info",
                            ),
                        },
                        {
                          id: "delete",
                          label: "Delete record",
                          disabled: true,
                        },
                      ]}
                    />
                  ),
                }))}
              />
            </div>
            <div
              className="mobile-records"
              aria-label="Collection objects, compact view"
            >
              {visibleRows.map((row) => (
                <CompactRecord
                  key={row.accession}
                  row={row}
                  onOpen={() => setModalOpen(true)}
                />
              ))}
            </div>
            <div className="pagination-row">
              <span>{filteredRows.length} matching objects</span>
              <Pagination
                page={page}
                count={Math.max(1, Math.ceil(filteredRows.length / 4))}
                onPageChange={setPage}
                label="Collection pages"
              />
            </div>
          </>
        )}
      {activeTab === "register" &&
        filteredRows.length > 0 &&
        view === "images" && (
          <ImageList
            columns="three"
            items={[
              {
                src: galleryImage,
                alt: "Tall abstract stone sculpture installed in Gallery 2",
                caption: "Counterweight No. 6 · installation view",
              },
              {
                src: conservationImage,
                alt: "Conservator examining fine cracks in a painted surface",
                caption: "Mountain Valley · examination detail",
              },
              {
                src: logisticsImage,
                alt: "Handlers preparing a wrapped sculpture for its travel crate",
                caption: "Signal Field · outbound preparation",
              },
            ]}
          />
        )}
      {activeTab === "hierarchy" && (
        <div className="two-pane">
          <TreeView
            label="Collection hierarchy"
            items={[
              {
                id: "modern",
                label: "Modern collections",
                children: [
                  { id: "painting", label: "Painting · 412" },
                  { id: "sculpture", label: "Sculpture · 183" },
                  { id: "works-paper", label: "Works on paper · 687" },
                ],
              },
              {
                id: "contemporary",
                label: "Contemporary collections",
                children: [
                  { id: "installation", label: "Installation · 96" },
                  { id: "time", label: "Time-based media · 74" },
                ],
              },
              {
                id: "archive",
                label: "Artist archives",
                children: [
                  { id: "varga", label: "Leona Varga papers" },
                  { id: "ibarra", label: "Tomas Ibarra studio archive" },
                ],
              },
            ]}
          />
          <Paper elevation="sm">
            <Typography as="h2" variant="title">
              Modern collections
            </Typography>
            <Typography variant="body">
              1,282 catalogued objects across five stores and three galleries.
              Ninety-one percent have current photography.
            </Typography>
            <Progress label="Current photography" value={91} />
          </Paper>
        </div>
      )}
      {activeTab === "saved" && (
        <Masonry columns="three">
          <Card eyebrow="Registrar" title="Outgoing loans, next 60 days">
            <Typography variant="body">
              23 objects · six institutions · two courier holds
            </Typography>
          </Card>
          <Card
            eyebrow="Conservation"
            title="Paintings without 2026 examination"
          >
            <Typography variant="body">
              17 records ordered by light exposure and loan activity.
            </Typography>
          </Card>
          <Card eyebrow="Curatorial" title="Measures of distance shortlist">
            <Typography variant="body">
              41 objects with research notes and image rights status.
            </Typography>
          </Card>
          <Card eyebrow="Collections" title="Store B-14 location audit">
            <Typography variant="body">
              58 records with three shelf discrepancies to resolve.
            </Typography>
          </Card>
        </Masonry>
      )}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Threshold Study III"
        description="MA.2024.018 · Leona Varga, 1938"
        actions={
          <>
            <Button onClick={() => setDrawerOpen(true)}>
              Open full record
            </Button>
            <Button variant="secondary" onClick={() => setModalOpen(false)}>
              Close preview
            </Button>
          </>
        }
      >
        <div className="modal-record">
          <img
            src={galleryImage}
            alt="Threshold Study III installed in the exhibition gallery"
          />
          <dl className="metadata-list">
            <div>
              <dt>Medium</dt>
              <dd>Pigment and linen</dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>Gallery 2, bay C</dd>
            </div>
            <div>
              <dt>Condition</dt>
              <dd>Stable, examined 26 Aug</dd>
            </div>
          </dl>
        </div>
      </Modal>
      <Drawer
        open={drawerOpen}
        side="right"
        onClose={() => setDrawerOpen(false)}
        title="Create collection object"
      >
        <Stack gap="md">
          <TextInput label="Object title" defaultValue="Untitled study" />
          <Autocomplete
            label="Maker"
            options={[
              "Leona Varga",
              "Tomas Ibarra",
              "Nadia Okafor",
              "Jun Park",
            ]}
          />
          <Select
            label="Collection"
            options={[
              { label: "Modern collections", value: "modern" },
              { label: "Contemporary collections", value: "contemporary" },
            ]}
          />
          <Textarea
            label="Cataloguing note"
            hint="Record visible inscriptions, marks, and supplied context."
          />
          <Button
            onClick={() => {
              setDrawerOpen(false);
              showMessage("Object draft created.");
            }}
          >
            Create object draft
          </Button>
        </Stack>
      </Drawer>
      <Backdrop open={syncing}>
        <Stack gap="sm" align="center">
          <Spinner size="lg" label="Synchronizing collection records" />
          <Typography variant="body">
            Synchronizing collection records...
          </Typography>
        </Stack>
      </Backdrop>
    </PageFrame>
  );
}

function LoansPage({ showMessage }: PageProps) {
  const [step, setStep] = React.useState(1);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [speedOpen, setSpeedOpen] = React.useState(false);
  const [transport, setTransport] = React.useState("dedicated");
  const [rating, setRating] = React.useState(3);
  const closeApprovalDialog = React.useCallback(() => setDialogOpen(false), []);
  useEscape(closeApprovalDialog, dialogOpen);
  const board = [
    {
      id: "request",
      title: "Requested",
      items: [
        { id: "l1", title: "Coastal Measure", meta: "Ridge Museum · 22 Oct" },
        {
          id: "l2",
          title: "Night Geometry",
          meta: "Aster Foundation · 02 Nov",
        },
      ],
    },
    {
      id: "review",
      title: "Under review",
      items: [
        { id: "l3", title: "Mountain Valley", meta: "Condition report due" },
        { id: "l4", title: "Study in Ochre", meta: "Insurance valuation" },
      ],
    },
    {
      id: "approved",
      title: "Approved",
      items: [{ id: "l5", title: "River Index", meta: "Courier confirmed" }],
    },
    {
      id: "packing",
      title: "Packing",
      items: [{ id: "l6", title: "Signal Field", meta: "Crate 14 · Bay 3" }],
    },
  ];
  return (
    <PageFrame
      route="Loans / Active pipeline"
      title="Move work without losing trust"
      description="Coordinate request, review, insurance, conservation, packing, transport, and return evidence across institutions."
    >
      <Alert tone="warning" title="Three loan actions need attention">
        Mountain Valley requires a condition report, Signal Field needs crate
        approval, and the North Window courier is still unconfirmed.
      </Alert>
      <Toolbar
        label="Loan workflow controls"
        density="compact"
        actions={<Button onClick={() => setStep(1)}>New loan request</Button>}
      >
        <ToggleGroup
          label="Loan board scope"
          value="active"
          options={[
            { label: "Active", value: "active" },
            { label: "Incoming", value: "incoming" },
            { label: "Outgoing", value: "outgoing" },
          ]}
          onValueChange={() => undefined}
        />
      </Toolbar>
      <div
        className="workflow-scroll"
        role="region"
        aria-label="Loan workflow board, horizontally scrollable"
      >
        <WorkflowBoard columns={board} />
      </div>
      <section
        className="loan-workbench section-rule"
        aria-labelledby="request-title"
      >
        <div className="workbench-heading">
          <div>
            <span className="eyebrow">Loan LN-2468</span>
            <Typography id="request-title" as="h2" variant="title">
              Incoming loan request
            </Typography>
          </div>
          <Badge tone="warning">Condition review</Badge>
        </div>
        <Stepper
          activeIndex={step - 1}
          steps={[
            {
              id: "object",
              label: "Object",
              description: "Identity and purpose",
            },
            {
              id: "schedule",
              label: "Schedule",
              description: "Dates and courier",
            },
            {
              id: "risk",
              label: "Risk",
              description: "Condition and insurance",
            },
            {
              id: "approval",
              label: "Approval",
              description: "Final institutional review",
            },
          ]}
        />
        <div className="form-layout">
          <div className="form-main">
            <Grid columns="two" gap="md">
              <Autocomplete
                label="Object"
                defaultValue="Mountain Valley, 1867"
                options={[
                  "Mountain Valley, 1867",
                  "Signal Field, 1994",
                  "River Index, 2008",
                ]}
              />
              <TextInput
                label="Lending institution"
                defaultValue="National Gallery of Cascadia"
              />
              <DatePicker label="Requested arrival" defaultValue="2026-09-08" />
              <DatePicker label="Return deadline" defaultValue="2027-01-19" />
              <TimePicker
                label="Courier arrival window"
                defaultValue="09:30"
                hint="Local gallery time"
              />
              <NumberField
                label="Insurance value"
                defaultValue={2750000}
                min={0}
                hint="USD, agreed value"
              />
            </Grid>
            <RadioGroup
              label="Transport method"
              name="transport"
              value={transport}
              onValueChange={setTransport}
              options={[
                {
                  label: "Dedicated art vehicle",
                  value: "dedicated",
                  description: "Direct route with dual-driver coverage",
                },
                {
                  label: "Consolidated fine-art transport",
                  value: "consolidated",
                  description: "Shared climate-controlled route",
                },
                {
                  label: "Air freight with courier",
                  value: "air",
                  description: "Courier accompanies the object",
                },
              ]}
            />
            <Textarea
              label="Handling and display requirements"
              defaultValue="Keep upright during all movement. Acclimatize for 12 hours before unpacking. No glazing contact."
            />
            <FileUpload
              label="Loan documentation"
              description="Attach facility report, insurance certificate, and signed request."
              multiple
              files={[
                { name: "facility-report.pdf", meta: "2.4 MB · verified" },
                {
                  name: "insurance-certificate.pdf",
                  meta: "640 KB · expires 19 Jan",
                },
              ]}
            />
          </div>
          <aside className="form-aside">
            <Paper elevation="sm">
              <Typography as="h3" variant="title">
                Risk review
              </Typography>
              <Rating
                label="Condition risk rating"
                value={rating}
                onValueChange={setRating}
              />
              <Typography variant="caption">
                Current rating: {rating} of 5. Requires senior conservator
                review at 4 or above.
              </Typography>
              <Progress label="Request completeness" value={78} />
            </Paper>
            <Accordion
              items={[
                {
                  id: "climate",
                  title: "Climate requirements",
                  content:
                    "Target 50 ± 4 percent RH and 20 ± 2°C throughout transport and display.",
                },
                {
                  id: "security",
                  title: "Security requirements",
                  content:
                    "Continuous courier line-of-sight from unpacking through final wall placement.",
                },
                {
                  id: "mount",
                  title: "Mount and display",
                  content:
                    "Existing travel frame is approved. Final wall fixings require lender sign-off.",
                },
              ]}
            />
          </aside>
        </div>
        <Toolbar
          label="Loan request actions"
          justify="end"
          actions={
            <ButtonGroup label="Request actions">
              <Button
                variant="secondary"
                onClick={() => showMessage("Loan request saved as a draft.")}
              >
                Save draft
              </Button>
              <Button onClick={() => setDialogOpen(true)}>
                Review approval
              </Button>
            </ButtonGroup>
          }
        >
          <Button
            size="sm"
            variant="secondary"
            disabled={step === 1}
            onClick={() => setStep((value) => Math.max(1, value - 1))}
          >
            Previous step
          </Button>
          <Button
            size="sm"
            variant="secondary"
            disabled={step === 4}
            onClick={() => setStep((value) => Math.min(4, value + 1))}
          >
            Next step
          </Button>
        </Toolbar>
      </section>
      <section className="section-rule" aria-labelledby="loan-register-title">
        <div className="panel-title-row">
          <Typography id="loan-register-title" as="h2" variant="title">
            Active loan register
          </Typography>
          <Badge tone="info">6 open</Badge>
        </div>
        <DataGrid
          caption="Active loans"
          rows={loanRows}
          columns={loanColumns}
          filterable
          sortable
          pageable
          pageSize={4}
        />
      </section>
      <section className="section-rule" aria-labelledby="assignment-title">
        <Typography id="assignment-title" as="h2" variant="title">
          Exhibition assignment
        </Typography>
        <TransferList
          sourceTitle="Available specialists"
          targetTitle="Assigned to LN-2468"
          sourceItems={[
            { id: "maya", label: "Maya Ortega · registrar", selected: true },
            { id: "jon", label: "Jon Bell · paintings conservation" },
            { id: "leah", label: "Leah Sung · courier", disabled: true },
          ]}
          targetItems={[
            {
              id: "amina",
              label: "Amina Morrow · lead registrar",
              selected: true,
            },
            { id: "milo", label: "Milo Chen · installation", selected: true },
          ]}
          onMoveRight={() => showMessage("Selected specialist assigned.")}
          onMoveLeft={() => showMessage("Assignment removed.", "info")}
        />
      </section>
      <div className="speed-control">
        <Button
          variant="secondary"
          onClick={() => setSpeedOpen((value) => !value)}
        >
          {speedOpen ? "Close quick actions" : "Open quick actions"}
        </Button>
        <SpeedDial
          open={speedOpen}
          label="Loan quick actions"
          actions={[
            {
              id: "note",
              label: "Add courier note",
              icon: <Icon name="comment" />,
              onSelect: () => showMessage("Courier note added."),
            },
            {
              id: "photo",
              label: "Add condition photo",
              icon: <Icon name="scan" />,
              onSelect: () => showMessage("Photo capture opened.", "info"),
            },
            {
              id: "certificate",
              label: "Request certificate",
              icon: <Icon name="fileData" />,
              onSelect: () => showMessage("Certificate request sent."),
            },
            {
              id: "delete",
              label: "Delete loan",
              icon: <Icon name="delete" />,
              disabled: true,
            },
          ]}
        />
      </div>
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        title="Approve incoming loan LN-2468?"
        description="Approval confirms institutional acceptance of the agreed value, schedule, climate envelope, and courier requirements."
        actions={
          <>
            <Button
              onClick={() => {
                setDialogOpen(false);
                setStep(4);
                showMessage("Incoming loan approved.");
              }}
            >
              Approve incoming loan
            </Button>
            <Button variant="secondary" onClick={() => setDialogOpen(false)}>
              Keep reviewing
            </Button>
          </>
        }
      >
        <Alert tone="warning" title="One follow-up remains">
          The initial condition report is due within two days of arrival.
          Approval will create that task automatically.
        </Alert>
      </Dialog>
    </PageFrame>
  );
}

function ConservationPage({ showMessage }: PageProps) {
  const [tab, setTab] = React.useState("examination");
  const [files, setFiles] = React.useState<
    Array<{ name: React.ReactNode; meta: React.ReactNode }>
  >([{ name: "raking-light-detail.jpg", meta: "4.1 MB · 09:14" }]);
  return (
    <PageFrame
      route="Conservation / MA.2019.153"
      title="Mountain Valley, 1867"
      description="Initial incoming-loan condition examination for National Gallery of Cascadia. Evidence is due today at 17:00."
    >
      <div className="record-banner">
        <figure>
          <img
            src={conservationImage}
            alt="Gloved hands examining fine craquelure on the painted surface of Mountain Valley"
          />
        </figure>
        <div className="record-banner-copy">
          <span className="eyebrow">Paintings conservation</span>
          <Typography as="h2" variant="title">
            Incoming examination
          </Typography>
          <dl className="metadata-list">
            <div>
              <dt>Examiner</dt>
              <dd>
                <Avatar initials="JB" size="sm" /> Jon Bell
              </dd>
            </div>
            <div>
              <dt>Loan</dt>
              <dd>LN-2468</dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>Studio 1 · table B</dd>
            </div>
            <div>
              <dt>Due</dt>
              <dd>Today · 17:00</dd>
            </div>
          </dl>
          <Progress label="Examination completion" value={64} />
        </div>
      </div>
      <Tabs
        activeId={tab}
        onChange={setTab}
        label="Conservation record"
        items={[
          { id: "examination", label: "Examination" },
          { id: "evidence", label: "Evidence" },
          { id: "history", label: "History" },
        ]}
      />
      {tab === "examination" && (
        <div className="conservation-workspace">
          <Sidebar
            activeId="surface"
            heading="Examination sections"
            label="Examination sections"
            items={[
              {
                id: "overview",
                label: "Overview",
                icon: <Icon name="clipboardList" />,
              },
              {
                id: "surface",
                label: "Paint surface",
                icon: <Icon name="scanLine" />,
                badge: <Badge tone="warning">3</Badge>,
              },
              { id: "support", label: "Support", icon: <Icon name="layers" /> },
              {
                id: "frame",
                label: "Frame",
                icon: <Icon name="squareStack" />,
              },
              { id: "sign", label: "Sign-off", icon: <Icon name="approved" /> },
            ]}
          />
          <div className="conservation-form">
            <Alert tone="info" title="Raking-light comparison available">
              A 2023 outgoing-loan image is available beside the new evidence
              for direct comparison.
            </Alert>
            <Grid columns="two" gap="md">
              <Select
                label="Finding type"
                options={[
                  { label: "Craquelure", value: "craquelure" },
                  { label: "Abrasion", value: "abrasion" },
                  { label: "Loss", value: "loss" },
                  { label: "Surface deposit", value: "deposit" },
                ]}
              />
              <Select
                label="Location"
                options={[
                  { label: "Upper centre", value: "upper-centre" },
                  { label: "Lower left", value: "lower-left" },
                  { label: "Overall", value: "overall" },
                ]}
              />
            </Grid>
            <Rating label="Finding severity" value={2} />
            <Textarea
              label="Finding description"
              error="Describe the approximate size before saving this finding."
              defaultValue="Fine age-consistent craquelure with one area of raised paint under raking light."
            />
            <Checkbox
              label="Mark for lender review"
              description="Include this finding in the lender-facing report."
              defaultChecked
            />
            <Checkbox
              label="Requires treatment before display"
              description="Create a treatment proposal when the examination is signed."
            />
            <FileUpload
              label="Add evidence"
              description="JPEG, TIFF, or PDF. Include a scale and object reference where useful."
              multiple
              files={files}
              onFilesChange={(next) =>
                setFiles(
                  next.map((file) => ({
                    name: file.name,
                    meta: `${Math.max(1, Math.round(file.size / 1024))} KB · ready`,
                  })),
                )
              }
            />
            <Toolbar
              label="Conservation actions"
              justify="end"
              actions={
                <ButtonGroup label="Conservation record actions">
                  <Button
                    variant="secondary"
                    onClick={() => showMessage("Examination draft saved.")}
                  >
                    Save draft
                  </Button>
                  <Button
                    onClick={() =>
                      showMessage("Finding added to the condition report.")
                    }
                  >
                    Add finding
                  </Button>
                </ButtonGroup>
              }
            />
          </div>
        </div>
      )}
      {tab === "evidence" && (
        <ImageList
          columns="two"
          items={[
            {
              src: conservationImage,
              alt: "Raking-light examination detail showing craquelure",
              caption: "Raking light · upper centre · 28 Aug 2026",
            },
            {
              src: galleryImage,
              alt: "Reference installation view of the exhibition gallery",
              caption: "Gallery context · proposed location",
            },
            {
              src: logisticsImage,
              alt: "Wrapped sculpture supported for packing in the logistics bay",
              caption: "Handling reference · Bay 3",
            },
          ]}
        />
      )}
      {tab === "history" && (
        <Timeline
          events={[
            {
              id: "h1",
              label: "Incoming examination opened",
              description: "Jon Bell · Studio 1",
              meta: "Today, 08:36",
            },
            {
              id: "h2",
              label: "Object acclimatization completed",
              description: "Environmental range remained stable",
              meta: "Today, 07:55",
            },
            {
              id: "h3",
              label: "Courier handoff signed",
              description: "Leah Sung and Maya Ortega",
              meta: "Yesterday, 16:42",
            },
            {
              id: "h4",
              label: "2023 comparison record linked",
              description: "Outgoing loan to Ridge Museum",
              meta: "Yesterday, 15:20",
            },
          ]}
        />
      )}
    </PageFrame>
  );
}

function CalendarPage({ showMessage }: PageProps) {
  const [selectedDay, setSelectedDay] = React.useState("12");
  return (
    <PageFrame
      route="Calendar / August 2026"
      title="Installation calendar"
      description="Coordinate gallery access, courier arrivals, conservation windows, rigging, lighting, and public programme handoffs."
    >
      <Toolbar
        label="Calendar filters"
        density="compact"
        actions={
          <Button
            onClick={() => showMessage("Installation event draft created.")}
          >
            Create event
          </Button>
        }
      >
        <Select
          label="Gallery"
          defaultValue="gallery-2"
          options={[
            { label: "All galleries", value: "all" },
            { label: "Gallery 2", value: "gallery-2" },
            { label: "Receiving store", value: "receiving" },
            { label: "Conservation studio", value: "studio" },
          ]}
        />
        <ToggleGroup
          label="Calendar density"
          value="month"
          options={[
            { label: "Month", value: "month" },
            { label: "Week", value: "week" },
            { label: "Agenda", value: "agenda" },
          ]}
          onValueChange={() => undefined}
        />
      </Toolbar>
      <div className="calendar-layout">
        <Calendar
          label="August 2026 installation calendar"
          monthLabel="August 2026"
          weekdays={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
          days={calendarDays.map((day) => ({
            ...day,
            selected: day.label === selectedDay,
          }))}
          onDaySelect={(day) => setSelectedDay(String(day.label))}
        />
        <Paper elevation="sm" className="day-agenda">
          <span className="eyebrow">Wednesday 12 August</span>
          <Typography as="h2" variant="title">
            Four coordinated events
          </Typography>
          <Timeline
            events={[
              {
                id: "a1",
                label: "Courier arrival · Mountain Valley",
                description: "Receiving store · Leah Sung",
                meta: "09:30–10:15",
              },
              {
                id: "a2",
                label: "Rigging review · Counterweight No. 6",
                description: "Gallery 2 · Milo Chen",
                meta: "11:00–12:00",
              },
              {
                id: "a3",
                label: "Lighting focus · north wall",
                description: "Gallery 2 · Studio Lux",
                meta: "14:00–16:30",
              },
              {
                id: "a4",
                label: "Curatorial walk-through",
                description: "Full exhibition route",
                meta: "17:00–17:45",
              },
            ]}
          />
          <Button
            variant="secondary"
            onClick={() => showMessage("Day agenda exported.", "info")}
          >
            Export day agenda
          </Button>
        </Paper>
      </div>
      <section className="section-rule" aria-labelledby="crew-title">
        <div className="panel-title-row">
          <Typography id="crew-title" as="h2" variant="title">
            Crew capacity
          </Typography>
          <Badge tone="warning">Rigging at limit</Badge>
        </div>
        <Chart
          label="Installation crew capacity"
          data={[
            { label: "Registration", value: 68 },
            { label: "Conservation", value: 74 },
            { label: "Art handling", value: 82 },
            { label: "Rigging", value: 100 },
            { label: "Lighting", value: 61 },
          ]}
        />
      </section>
    </PageFrame>
  );
}

function SettingsPage({
  showMessage,
  mode,
  setMode,
}: PageProps & { mode: ThemeMode; setMode: (mode: ThemeMode) => void }) {
  const [tab, setTab] = React.useState("workspace");
  const [saving, setSaving] = React.useState(false);
  const [email, setEmail] = React.useState("operations@morrow.example");
  const emailError = email.includes("@")
    ? undefined
    : "Email address needs an @ symbol. Example: name@museum.org";
  const save = () => {
    if (emailError) return;
    setSaving(true);
    window.setTimeout(() => {
      setSaving(false);
      showMessage("Institution settings saved.");
    }, 700);
  };
  return (
    <PageFrame
      route="Settings"
      title="Institution settings"
      description="Manage workspace identity, notifications, environmental thresholds, access, and the persisted CorvaUI theme."
    >
      <Tabs
        activeId={tab}
        onChange={setTab}
        label="Settings sections"
        items={[
          { id: "workspace", label: "Workspace" },
          { id: "notifications", label: "Notifications" },
          { id: "access", label: "Access" },
        ]}
      />
      {tab === "workspace" && (
        <div className="settings-layout">
          <section className="settings-form" aria-labelledby="workspace-title">
            <Typography id="workspace-title" as="h2" variant="title">
              Workspace profile
            </Typography>
            <TextInput label="Institution name" defaultValue="Morrow Archive" />
            <TextInput
              label="Operations email"
              value={email}
              onChange={(event) => setEmail(event.currentTarget.value)}
              error={emailError}
            />
            <Select
              label="Primary time zone"
              defaultValue="america-new-york"
              options={[
                { label: "America / New York", value: "america-new-york" },
                { label: "Europe / London", value: "europe-london" },
                { label: "Asia / Tokyo", value: "asia-tokyo" },
              ]}
            />
            <Textarea
              label="Public collection statement"
              defaultValue="Morrow Archive cares for modern and contemporary art through research, responsible stewardship, and public access."
            />
            <Button onClick={save} disabled={Boolean(emailError) || saving}>
              {saving ? (
                <>
                  <Spinner size="sm" label="Saving institution settings" />{" "}
                  Saving settings...
                </>
              ) : (
                "Save workspace"
              )}
            </Button>
          </section>
          <aside className="settings-aside">
            <Paper elevation="sm">
              <Typography as="h2" variant="title">
                Appearance
              </Typography>
              <Switch
                label="Use dark theme"
                description="Saved on this device and applied before the next working session."
                checked={mode === "dark"}
                onChange={() => setMode(mode === "light" ? "dark" : "light")}
              />
              <Alert tone="info" title="Published theme">
                The demo uses concept-light and concept-dark exactly as supplied
                by @corvaui/tokens.
              </Alert>
            </Paper>
            <Paper elevation="sm">
              <Typography as="h2" variant="title">
                Environmental defaults
              </Typography>
              <NumberField
                label="Target relative humidity"
                defaultValue={50}
                min={35}
                max={65}
              />
              <Slider
                label="Light exposure warning threshold"
                min={0}
                max={100}
                defaultValue={42}
              />
              <Typography variant="caption">
                Applied to new exhibition zones. Object-specific limits remain
                authoritative.
              </Typography>
            </Paper>
          </aside>
        </div>
      )}
      {tab === "notifications" && (
        <section className="settings-form" aria-labelledby="notification-title">
          <Typography id="notification-title" as="h2" variant="title">
            Notification policy
          </Typography>
          <Switch
            label="Critical condition findings"
            description="Notify registrars and conservation leads immediately."
            defaultChecked
          />
          <Switch
            label="Courier delays"
            description="Notify the assigned registrar after a 30-minute variance."
            defaultChecked
          />
          <Switch
            label="Weekly readiness digest"
            description="Send every Monday at 08:00 local time."
            defaultChecked
          />
          <Select
            label="Digest cadence"
            options={[
              { label: "Every Monday", value: "weekly" },
              { label: "Every weekday", value: "daily" },
              { label: "Never", value: "never" },
            ]}
          />
          <Button onClick={save}>
            {saving ? "Saving..." : "Save notification policy"}
          </Button>
        </section>
      )}
      {tab === "access" && (
        <section aria-labelledby="access-title">
          <Typography id="access-title" as="h2" variant="title">
            Exhibition access
          </Typography>
          <Typography variant="body">
            Assign specialists to Measures of distance. Disabled entries are
            managed by their home institution.
          </Typography>
          <TransferList
            sourceTitle="Available people"
            targetTitle="Exhibition team"
            sourceItems={[
              { id: "a", label: "Priya Anand · photography" },
              { id: "b", label: "Theo Brooks · visitor services" },
              {
                id: "c",
                label: "Leah Sung · external courier",
                disabled: true,
              },
            ]}
            targetItems={[
              { id: "d", label: "Elena Ruiz · curator", selected: true },
              { id: "e", label: "Amina Morrow · registrar", selected: true },
              { id: "f", label: "Jon Bell · conservator", selected: true },
            ]}
            onMoveRight={() =>
              showMessage("Selected people added to the exhibition.")
            }
            onMoveLeft={() =>
              showMessage(
                "Selected people removed from the exhibition.",
                "info",
              )
            }
          />
          <Button onClick={save}>Save access</Button>
        </section>
      )}
    </PageFrame>
  );
}

function ProofPage({ showMessage }: PageProps) {
  const [tab, setTab] = React.useState("coverage");
  return (
    <PageFrame
      route="System proof"
      title="CorvaUI, exercised as a product"
      description="The showcase uses the published React package and published Concept theme without redefining component colors or design-system tokens."
    >
      <Alert tone="success" title="Package integration verified">
        @corvaui/react 0.1.7 and @corvaui/tokens 0.1.7 are the only visual
        system packages used by this demo.
      </Alert>
      <Tabs
        activeId={tab}
        onChange={setTab}
        label="System proof sections"
        items={[
          { id: "coverage", label: "Coverage" },
          { id: "states", label: "States" },
          { id: "accessibility", label: "Accessibility" },
        ]}
      />
      {tab === "coverage" && (
        <>
          <section className="proof-intro">
            <Metric
              label="Public exports"
              value="67"
              note="Audited from package index"
            />
            <Metric
              label="Integrated"
              value="67"
              note="Used in believable workflows"
            />
            <Metric label="Omitted" value="0" note="No specimen-only imports" />
          </section>
          <DataTable
            caption="CorvaUI coverage summary"
            columns={[
              { key: "group", header: "Package group" },
              { key: "count", header: "Exports" },
              { key: "routes", header: "Primary use" },
              { key: "status", header: "Coverage" },
            ]}
            rows={coverageRows}
          />
          <Accordion
            items={[
              {
                id: "source",
                title: "Source of truth",
                content:
                  "The public index in the installed @corvaui/react package defines the 67-component audit surface.",
              },
              {
                id: "responsible",
                title: "What counts as responsible coverage",
                content:
                  "A component must participate in a real workflow, feedback state, navigation model, data task, or editorial story. Hidden imports do not count.",
              },
              {
                id: "theme",
                title: "Theme constraint",
                content:
                  "All color roles come from the published Concept theme. App CSS manages only layout, responsive composition, image treatment, and motion.",
              },
            ]}
          />
          <Divider label="Package references" decorative={false} />
          <Link
            href="https://www.npmjs.com/package/@corvaui/react"
            target="_blank"
            rel="noreferrer"
            variant="standalone"
          >
            View the published React package
          </Link>
        </>
      )}
      {tab === "states" && (
        <Grid columns="two" gap="lg">
          <Paper elevation="sm">
            <Typography as="h2" variant="title">
              Feedback language
            </Typography>
            <Stack gap="sm">
              <Alert tone="success" title="Condition report signed">
                The lender-facing PDF is ready.
              </Alert>
              <Alert tone="warning" title="Courier response overdue">
                The last confirmed route remains visible.
              </Alert>
              <Alert tone="danger" title="Upload could not finish">
                The connection was interrupted. The draft is safe.
              </Alert>
              <Button onClick={() => showMessage("State feedback verified.")}>
                Trigger success snackbar
              </Button>
              <Button disabled>Unavailable during sync</Button>
            </Stack>
          </Paper>
          <Paper elevation="sm">
            <Typography as="h2" variant="title">
              Loading language
            </Typography>
            <Stack gap="md">
              <Skeleton variant="text" label="Loading object title" />
              <Skeleton
                variant="rectangular"
                size="lg"
                label="Loading evidence preview"
              />
              <Stack direction="row" gap="sm" align="center">
                <Spinner label="Saving state example" />
                <Typography variant="body">
                  Saving the examination draft...
                </Typography>
              </Stack>
            </Stack>
          </Paper>
        </Grid>
      )}
      {tab === "accessibility" && (
        <div className="two-pane">
          <List
            items={[
              {
                id: "a11y1",
                label: "WCAG A and AA",
                description:
                  "Automated axe checks run on every route and both themes.",
              },
              {
                id: "a11y2",
                label: "Keyboard paths",
                description:
                  "Skip link, menus, drawers, dialogs, filters, tabs, and route focus are covered.",
              },
              {
                id: "a11y3",
                label: "Mobile reflow",
                description:
                  "Narrow widths use stacked records and content-priority changes without page overflow.",
              },
              {
                id: "a11y4",
                label: "Reduced motion",
                description:
                  "Spatial animation is removed when reduced motion is requested.",
              },
            ]}
          />
          <Box padding="lg" surface="subtle">
            <Typography as="h2" variant="title">
              Asset attribution
            </Typography>
            <Typography variant="body">
              The gallery, conservation, and logistics images were generated
              specifically for this private demo with OpenAI ImageGen. No
              external stock assets or third-party artwork reproductions are
              used.
            </Typography>
          </Box>
        </div>
      )}
    </PageFrame>
  );
}

function PageFrame({
  route,
  title,
  description,
  children,
}: {
  route: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <Container size="lg" className="page-frame">
      <Breadcrumbs
        items={[
          { label: "Morrow Archive", href: "#/" },
          { label: route, current: true },
        ]}
      />
      <header className="page-header">
        <div>
          <span className="eyebrow">Working register</span>
          <Typography
            id="page-title"
            tabIndex={-1}
            as="h1"
            variant="title"
            className="page-title"
          >
            {title}
          </Typography>
        </div>
        <Typography variant="body" className="page-description">
          {description}
        </Typography>
      </header>
      <div className="page-stack">{children}</div>
    </Container>
  );
}

function Metric({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note: string;
}) {
  return (
    <div className="metric">
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{note}</small>
    </div>
  );
}
function QuoteBlock({
  quote,
  person,
  role,
  image,
}: {
  quote: string;
  person: string;
  role: string;
  image: string;
}) {
  return (
    <blockquote className="quote-block">
      <Typography variant="subtitle">“{quote}”</Typography>
      <footer>
        <img src={image} alt={`${person}, ${role}`} loading="lazy" />
        <div>
          <strong>{person}</strong>
          <span>{role}</span>
        </div>
      </footer>
    </blockquote>
  );
}
function CompactRecord({
  row,
  onOpen,
}: {
  row: (typeof collectionRows)[number];
  onOpen: () => void;
}) {
  return (
    <article className="compact-record">
      <div>
        <span className="eyebrow">{row.accession}</span>
        <Typography as="h3" variant="title">
          {row.object}
        </Typography>
        <Typography variant="caption">
          {row.maker}, {row.year} · {row.medium}
        </Typography>
      </div>
      <dl>
        <div>
          <dt>Location</dt>
          <dd>{row.location}</dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd>
            <Badge
              tone={
                row.status === "Treatment"
                  ? "warning"
                  : row.status === "On view"
                    ? "success"
                    : "neutral"
              }
            >
              {row.status}
            </Badge>
          </dd>
        </div>
      </dl>
      <Button variant="secondary" onClick={onOpen}>
        Open record
      </Button>
    </article>
  );
}
