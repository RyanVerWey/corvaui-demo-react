import * as React from "react";
import {
  Accordion,
  Alert,
  Avatar,
  Badge,
  Box,
  Button,
  Calendar,
  Carousel,
  Chart,
  Checkbox,
  DataGrid,
  DatePicker,
  Dialog,
  Divider,
  Drawer,
  EmptyState,
  FileUpload,
  Grid,
  Icon,
  Link,
  MenuBar,
  Modal,
  NumberField,
  Paper,
  Progress,
  RadioGroup,
  SearchForm,
  Select,
  Sidebar,
  Slider,
  Snackbar,
  Stack,
  Switch,
  Tabs,
  Textarea,
  TextInput,
  TimePicker,
  Timeline,
  ToggleGroup,
  Toolbar,
  Typography,
  WorkflowBoard,
  type DataGridColumn,
  type DataGridRow,
} from "@corvaui/react";

type Route = "home" | "platform" | "industries" | "customers" | "insights" | "company" | "command";
type ThemeMode = "light" | "dark";
type Navigate = (route: Route) => void;

const navItems: Array<{ id: Route; label: string; icon: React.ReactNode }> = [
  { id: "home", label: "Home", icon: <Icon name="home" /> },
  { id: "platform", label: "Platform", icon: <Icon name="workflow" /> },
  { id: "industries", label: "Industries", icon: <Icon name="database" /> },
  { id: "customers", label: "Customers", icon: <Icon name="approved" /> },
  { id: "insights", label: "Intelligence", icon: <Icon name="search" /> },
  { id: "company", label: "Company", icon: <Icon name="help" /> },
  { id: "command", label: "Command center", icon: <Icon name="activity" /> },
];

const routeIds = new Set<Route>(navItems.map((item) => item.id));
const deploymentBase = () => "";
const image = (name: string) => `${deploymentBase()}/images/${name}`;

function readRoute(): Route {
  const id = window.location.pathname.replace(/^\/+|\/+$/g, "") || "home";
  return routeIds.has(id as Route) ? (id as Route) : "home";
}

function routePath(route: Route) {
  return route === "home" ? `${deploymentBase() || ""}/` : `${deploymentBase() || ""}/${route}`;
}

const assetRows: DataGridRow[] = [
  { asset: "WTG-214", network: "North Sea Wind", class: "Turbine", health: "Watch", signal: "Gearbox vibration", owner: "Lena Ortiz", due: "Sep 03" },
  { asset: "SUB-09", network: "Cedar Grid", class: "Substation", health: "Critical", signal: "Transformer heat", owner: "Amir Patel", due: "Today" },
  { asset: "PMP-118", network: "River District", class: "Water", health: "Stable", signal: "Flow variance", owner: "Nora Blake", due: "Sep 08" },
  { asset: "SIG-442", network: "Metro East", class: "Transit", health: "Watch", signal: "Relay latency", owner: "Diego Cruz", due: "Sep 04" },
  { asset: "BRG-031", network: "Harbor Link", class: "Structure", health: "Stable", signal: "Joint movement", owner: "Mina Cho", due: "Sep 12" },
  { asset: "SOL-822", network: "Canyon Solar", class: "Inverter", health: "Stable", signal: "Output drift", owner: "Tariq Hall", due: "Sep 18" },
  { asset: "TRK-067", network: "Port Meridian", class: "Rail", health: "Critical", signal: "Switch current", owner: "Sofia Marin", due: "Today" },
  { asset: "VAL-291", network: "North Aqueduct", class: "Water", health: "Watch", signal: "Pressure decay", owner: "Avery Reed", due: "Sep 06" },
  { asset: "CRN-016", network: "Port Meridian", class: "Crane", health: "Stable", signal: "Motor cycle", owner: "Jonas Berg", due: "Sep 21" },
  { asset: "BUS-504", network: "Metro East", class: "Transit", health: "Stable", signal: "Battery range", owner: "Leah Grant", due: "Sep 14" },
  { asset: "DAM-004", network: "River District", class: "Hydro", health: "Watch", signal: "Spillway load", owner: "Eli Warren", due: "Sep 09" },
  { asset: "CAB-732", network: "North Sea Wind", class: "Cable", health: "Stable", signal: "Thermal load", owner: "Rina Shah", due: "Sep 25" },
];

const assetColumns: DataGridColumn[] = [
  { key: "asset", header: "Asset", sortable: true, filterable: true },
  { key: "network", header: "Network", sortable: true, filterable: true },
  { key: "class", header: "Class", sortable: true, filterable: true },
  {
    key: "health",
    header: "Health",
    sortable: true,
    filterable: true,
    value: (row) => String(row.health),
    render: (row) => <Badge tone={row.health === "Critical" ? "danger" : row.health === "Watch" ? "warning" : "success"}>{row.health}</Badge>,
  },
  { key: "signal", header: "Leading signal", sortable: true, filterable: true },
  { key: "owner", header: "Owner", sortable: true, filterable: true },
  { key: "due", header: "Next action", sortable: true },
];

const workColumns = [
  { id: "triage", title: "Triage", items: [{ id: "heat", title: "SUB-09 thermal review", meta: "Critical | 12 min" }, { id: "current", title: "TRK-067 switch inspection", meta: "Critical | Crew 14" }] },
  { id: "active", title: "In field", items: [{ id: "wind", title: "WTG-214 vibration test", meta: "Lena Ortiz | Offshore" }, { id: "valve", title: "VAL-291 pressure test", meta: "Avery Reed | Zone 4" }] },
  { id: "verify", title: "Verification", items: [{ id: "signal", title: "SIG-442 relay firmware", meta: "Diego Cruz | Evidence due" }, { id: "bridge", title: "BRG-031 joint survey", meta: "Mina Cho | Ready" }] },
];

const monthDays = Array.from({ length: 35 }, (_, index) => {
  const day = index < 2 ? 30 + index : index - 1;
  const muted = index < 2 || index > 31;
  const badges: Record<number, string> = { 5: "Wind", 9: "Rail", 12: "Water", 18: "Grid", 24: "Port" };
  return { id: `day-${index}`, label: day, muted, selected: day === 9 && !muted, badge: !muted ? badges[day] : undefined };
});

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <Typography className="eyebrow" variant="caption">{children}</Typography>;
}

function PageLead({
  eyebrow,
  title,
  body,
  marker,
  markerIcon,
  details,
}: {
  eyebrow: string;
  title: string;
  body: string;
  marker: string;
  markerIcon: React.ReactNode;
  details: string[];
}) {
  return (
    <header className="page-lead reveal">
      <div className="page-lead-copy">
        <Eyebrow>{eyebrow}</Eyebrow>
        <Typography as="h1" variant="display">{title}</Typography>
        <Typography variant="subtitle">{body}</Typography>
      </div>
      <aside className="page-marker" aria-label={`${eyebrow} context`}>
        <span className="page-marker-icon">{markerIcon}</span>
        <Typography variant="caption">{marker}</Typography>
        <div>{details.map((detail) => <span key={detail}>{detail}</span>)}</div>
      </aside>
    </header>
  );
}

function Metric({ label, value, note }: { label: string; value: string; note: string }) {
  return <div className="metric"><Typography variant="caption">{label}</Typography><strong>{value}</strong><Typography variant="body">{note}</Typography></div>;
}

function DataCard({
  label,
  value,
  note,
  badge,
  tone,
  progress,
  icon,
}: {
  label: string;
  value: string;
  note: string;
  badge: string;
  tone: "danger" | "info" | "success" | "warning";
  progress: number;
  icon: React.ReactNode;
}) {
  return (
    <Paper className="data-card" elevation="none">
      <div className="data-card-head"><span>{icon}</span><Badge tone={tone}>{badge}</Badge></div>
      <div><Typography variant="caption">{label}</Typography><strong>{value}</strong><Typography variant="body">{note}</Typography></div>
      <Progress label={`${label}: ${progress}%`} value={progress} />
    </Paper>
  );
}

function HomePage({ navigate, openContact }: { navigate: Navigate; openContact: () => void }) {
  return (
    <>
      <section className="home-hero" data-corva-theme="concept-dark">
        <img src={image("asterline-port-hero.png")} alt="Intermodal port, rail, and road infrastructure operating at blue hour" />
        <div className="home-hero-content reveal">
          <div className="live-line"><Badge tone="success">Network normal</Badge><span>North Atlantic region</span><span>08:42 UTC</span></div>
          <Eyebrow>Asterline infrastructure intelligence</Eyebrow>
          <Typography as="h1" variant="display">Keep the world<br />in motion.</Typography>
          <Typography variant="subtitle">One operating picture for the people responsible for energy, transit, water, and the systems between them.</Typography>
          <Stack className="hero-actions" direction="row" gap="md">
            <Button variant="primary" size="lg" onClick={() => navigate("command")}>Enter command center</Button>
            <Button variant="secondary" size="lg" onClick={openContact}>Talk to an engineer</Button>
          </Stack>
        </div>
        <div className="hero-metrics">
          <Metric label="Signals evaluated" value="4.8B" note="each day" />
          <Metric label="Assets observed" value="2.1M" note="across 31 countries" />
          <Metric label="Response gained" value="38m" note="median lead time" />
        </div>
      </section>

      <section className="customer-ribbon" aria-label="Selected operators">
        <span>Northshore Energy</span><span>Metro East</span><span>Port Meridian</span><span>Cedar Water</span><span>Helix Rail</span>
      </section>

      <section className="editorial-intro content-shell reveal">
        <div><Eyebrow>Operating reality</Eyebrow><Typography as="h2" variant="display">The system knows before the schedule does.</Typography></div>
        <div><Typography variant="subtitle">Asterline connects condition data, work history, weather, supply constraints, and field context. Teams see emerging risk while there is still time to act.</Typography><Button variant="secondary" size="lg" onClick={() => navigate("platform")}>How the platform works <Icon name="arrowRight" /></Button></div>
      </section>

      <section className="field-story full-bleed-media">
        <img src={image("asterline-wind-field.png")} alt="Engineers inspecting an offshore wind turbine" />
        <div className="field-story-copy" data-corva-theme="concept-dark">
          <Eyebrow>From signal to field</Eyebrow>
          <Typography as="h2" variant="display">Turn signals into action.</Typography>
          <Typography variant="subtitle">A change in vibration is only useful when the right crew, part, access window, and safety plan arrive with it.</Typography>
          <div className="numbered-points"><div><span>01</span><strong>Detect</strong><p>Find meaningful change across noisy systems.</p></div><div><span>02</span><strong>Decide</strong><p>Understand consequence, confidence, and time.</p></div><div><span>03</span><strong>Dispatch</strong><p>Move complete work into the field.</p></div></div>
        </div>
      </section>

      <section className="product-evidence content-shell">
        <div className="section-copy"><Eyebrow>Live operating picture</Eyebrow><Typography as="h2" variant="display">Every decision keeps its context.</Typography><Typography variant="body">Health, consequence, ownership, and action stay together from the first anomaly through verified closeout.</Typography></div>
        <Paper className="evidence-surface" elevation="none">
          <Toolbar label="Network health controls"><Typography variant="title">Cedar regional network</Typography><Badge tone="success">97.4% available</Badge><Button size="sm" variant="secondary" onClick={() => navigate("command")}>Open network</Button></Toolbar>
          <div className="evidence-grid">
            <div><Eyebrow>Exposure by day</Eyebrow><Chart label="Seven day network exposure" type="line" animated showGrid showLegend showPoints height={280} xKey="day" data={[{ day: "Mon", risk: 18, baseline: 24 }, { day: "Tue", risk: 21, baseline: 24 }, { day: "Wed", risk: 17, baseline: 24 }, { day: "Thu", risk: 29, baseline: 24 }, { day: "Fri", risk: 23, baseline: 24 }, { day: "Sat", risk: 15, baseline: 24 }, { day: "Sun", risk: 13, baseline: 24 }]} series={[{ key: "risk", label: "Observed exposure" }, { key: "baseline", label: "Planning threshold" }]} /></div>
            <div className="signal-list"><Eyebrow>Priority signals</Eyebrow><div><span><Badge tone="danger">Critical</Badge><strong>Transformer heat rise</strong></span><strong>SUB-09</strong></div><div><span><Badge tone="warning">Watch</Badge><strong>Wind gearbox vibration</strong></span><strong>WTG-214</strong></div><div><span><Badge tone="info">Planned</Badge><strong>Aqueduct pressure test</strong></span><strong>VAL-291</strong></div><Progress label="Response plans ready: 86%" value={86} /></div>
          </div>
        </Paper>
      </section>

      <section className="case-feature content-shell">
        <img src={image("asterline-city-network.png")} alt="Urban rail, road, power, and water networks converging at a river" />
        <div><Eyebrow>Metro East case study</Eyebrow><Typography as="h2" variant="display">One river. Four networks. Zero shared blind spots.</Typography><Typography variant="body">Metro East connected transit, power, drainage, and bridge teams around one consequence model before its busiest construction season.</Typography><div className="case-results"><Metric label="Service interruptions" value="-27%" note="year over year" /><Metric label="Emergency callouts" value="-41%" note="in six months" /></div><Button variant="primary" size="lg" onClick={() => navigate("customers")}>Read the full story <Icon name="arrowRight" /></Button></div>
      </section>

      <section className="quote-band" data-corva-theme="concept-dark">
        <blockquote>“We stopped asking which dashboard was right and started deciding what the network needed.”</blockquote>
        <p>Marisol Chen, VP Network Operations, Metro East</p>
      </section>

      <section className="closing-cta content-shell"><Eyebrow>See your network differently</Eyebrow><Typography as="h2" variant="display">Bring the work into one operating picture.</Typography><Stack direction="row" gap="md"><Button variant="primary" size="lg" onClick={openContact}>Plan a working session</Button><Button variant="secondary" size="lg" onClick={() => navigate("command")}>Explore the live environment</Button></Stack></section>
    </>
  );
}

function PlatformPage({ navigate }: { navigate: Navigate }) {
  const [active, setActive] = React.useState("observe");
  const tabs = [
    { id: "observe", label: "Observe" },
    { id: "predict", label: "Predict" },
    { id: "coordinate", label: "Coordinate" },
    { id: "verify", label: "Verify" },
  ];
  const tabContent: Record<string, { title: string; body: string; stat: string; note: string }> = {
    observe: { title: "A living model of the network", body: "Telemetry, inspection evidence, weather, operational limits, and asset history resolve into one current state.", stat: "12 sec", note: "median signal-to-context time" },
    predict: { title: "Consequence before confidence", body: "Asterline separates model certainty from operational consequence so teams can act early without treating every anomaly as an emergency.", stat: "38 min", note: "median response time gained" },
    coordinate: { title: "The complete work moves together", body: "People, parts, permits, access, and procedures travel with the decision instead of arriving through disconnected systems.", stat: "91%", note: "first-visit resolution" },
    verify: { title: "Close the loop with evidence", body: "Field proof, measurements, approvals, and follow-up signals stay attached to the asset record and improve the next decision.", stat: "2.7x", note: "faster verified closeout" },
  };
  const content = tabContent[active];
  return (
    <div className="page-shell platform-page">
      <PageLead eyebrow="Asterline platform" title="An operating system for physical networks." body="Observe the system, understand consequence, coordinate response, and preserve the evidence that makes every next decision better." marker="01 / Operating model" markerIcon={<Icon name="workflow" />} details={["Four connected layers", "One traceable record", "Live across every shift"]} />
      <section className="platform-model">
        <Tabs label="Platform capabilities" activeId={active} items={tabs} onChange={setActive} />
        <div className="platform-detail"><div><Typography as="h2" variant="display">{content.title}</Typography><Typography variant="subtitle">{content.body}</Typography><Button variant="primary" size="lg" onClick={() => navigate("command")}>See it in operation <Icon name="arrowRight" /></Button></div><Metric label="Operational result" value={content.stat} note={content.note} /></div>
      </section>
      <section className="platform-analysis">
        <div className="section-copy"><Eyebrow>Decision velocity</Eyebrow><Typography as="h2" variant="display">See where operating time is actually lost.</Typography><Typography variant="body">Asterline measures the interval between signal, interpretation, ownership, and action. Teams improve the operating system, not just the dashboard.</Typography><div className="analysis-facts"><Metric label="Median before" value="46 min" note="signal to owned action" /><Metric label="Median with Asterline" value="12 min" note="signal to owned action" /></div></div>
        <Paper className="analysis-chart" elevation="none"><Chart label="Signal to action time distribution" type="histogram" animated bins={7} controls={["data-table", "download"]} domain={[0, 60]} height={360} xKey="observation" data={[14, 18, 19, 21, 23, 24, 27, 29, 31, 33, 36, 41, 44, 48, 52, 58].map((minutes, index) => ({ observation: index + 1, minutes }))} series={[{ key: "minutes", label: "Minutes to owned action" }]} /></Paper>
      </section>
      <section className="control-room-feature"><img src={image("asterline-control-room.png")} alt="Regional transit operations team coordinating service" /><div><Eyebrow>Shared operational truth</Eyebrow><Typography as="h2" variant="display">Built for decisions with real consequences.</Typography><Typography variant="body">Asterline supports control centers, planners, engineers, and field teams without flattening their distinct responsibilities.</Typography></div></section>
      <section className="capability-ledger">
        <div><span>01</span><div><Typography as="h3" variant="title">Network model</Typography><p>Assets, topology, dependencies, limits, and current state.</p></div><Badge tone="success">Continuous</Badge></div>
        <div><span>02</span><div><Typography as="h3" variant="title">Consequence engine</Typography><p>Operational, safety, environmental, and customer impact.</p></div><Badge tone="info">Explainable</Badge></div>
        <div><span>03</span><div><Typography as="h3" variant="title">Response orchestration</Typography><p>People, access, procedures, materials, and approvals.</p></div><Badge tone="warning">Time aware</Badge></div>
        <div><span>04</span><div><Typography as="h3" variant="title">Evidence record</Typography><p>Inspection, work, verification, audit, and learning.</p></div><Badge tone="success">Traceable</Badge></div>
      </section>
      <section className="workflow-section"><div className="section-copy"><Eyebrow>Work in context</Eyebrow><Typography as="h2" variant="display">Response does not end at dispatch.</Typography></div><Paper elevation="none"><Toolbar label="Response workflow"><Typography variant="title">North region response board</Typography><Badge tone="danger">2 critical</Badge></Toolbar><WorkflowBoard columns={workColumns} density="comfortable" onItemClick={() => undefined} /></Paper></section>
      <section className="integration-band" data-corva-theme="concept-dark"><div><Eyebrow>Fits the environment you already operate</Eyebrow><Typography as="h2" variant="display">Connect without replacing everything.</Typography></div><div className="integration-list"><span>SCADA</span><span>EAM</span><span>GIS</span><span>CMMS</span><span>Weather</span><span>ERP</span><span>IoT</span><span>Document control</span></div></section>
    </div>
  );
}

function IndustriesPage({ openContact }: { openContact: () => void }) {
  return (
    <div className="page-shell industries-page">
      <PageLead eyebrow="Industries" title="Different networks. The same obligation to keep moving." body="Asterline adapts its operating model to the physics, risks, work practices, and regulatory evidence of each infrastructure domain." marker="02 / Network sectors" markerIcon={<Icon name="chartNetwork" />} details={["Energy and utilities", "Transit and logistics", "Water and civic systems"]} />
      <section className="industry-profile">
        <div className="section-copy"><Eyebrow>One model, different physics</Eyebrow><Typography as="h2" variant="display">The operating profile changes with the network.</Typography><Typography variant="body">Every deployment weights condition, access, consequence, and verification around the realities of the sector. The shared model never erases what makes each network distinct.</Typography></div>
        <Paper className="analysis-chart" elevation="none"><Chart label="Cross-sector operating profile" type="radar" animated controls={["data-table", "download"]} domain={[0, 100]} height={420} showLegend showPoints xKey="dimension" data={[{ dimension: "Condition", energy: 94, transit: 72, civic: 81 }, { dimension: "Access", energy: 76, transit: 95, civic: 68 }, { dimension: "Consequence", energy: 91, transit: 88, civic: 84 }, { dimension: "Weather", energy: 86, transit: 62, civic: 93 }, { dimension: "Evidence", energy: 79, transit: 83, civic: 96 }]} series={[{ key: "energy", label: "Energy" }, { key: "transit", label: "Transit" }, { key: "civic", label: "Water and civic" }]} /></Paper>
      </section>
      <section className="industry-feature industry-energy"><img src={image("asterline-wind-field.png")} alt="Offshore wind turbine inspection" /><div><Eyebrow>Energy</Eyebrow><Typography as="h2" variant="display">More output. Less avoidable exposure.</Typography><p>Coordinate renewable generation, substations, storage, and transmission around condition and consequence.</p><ul><li>Predictive asset health</li><li>Weather-window planning</li><li>Grid consequence modeling</li><li>Field evidence and compliance</li></ul><Button variant="secondary" size="lg" onClick={openContact}>Talk with an energy specialist <Icon name="arrowRight" /></Button></div></section>
      <section className="industry-feature industry-transit"><img src={image("asterline-control-room.png")} alt="Transit network control room" /><div><Eyebrow>Transit</Eyebrow><Typography as="h2" variant="display">Protect the timetable without hiding the tradeoffs.</Typography><p>Bring fleet, track, signals, stations, crews, and passenger impact into the same decision.</p><ul><li>Service-impact forecasting</li><li>Possession and access planning</li><li>Fleet health and dispatch</li><li>Incident coordination</li></ul><Button variant="secondary" size="lg" onClick={openContact}>Talk with a transit specialist <Icon name="arrowRight" /></Button></div></section>
      <section className="industry-feature industry-water"><img src={image("asterline-city-network.png")} alt="Urban water and transport infrastructure" /><div><Eyebrow>Water and civic systems</Eyebrow><Typography as="h2" variant="display">Operate beyond the asset boundary.</Typography><p>Understand how pumps, treatment, storage, drainage, roads, and communities influence one another.</p><ul><li>Pressure and flow anomalies</li><li>Flood and weather readiness</li><li>Critical-customer protection</li><li>Capital planning evidence</li></ul><Button variant="secondary" size="lg" onClick={openContact}>Talk with a civic systems specialist <Icon name="arrowRight" /></Button></div></section>
      <section className="closing-cta"><Eyebrow>Built around your network</Eyebrow><Typography as="h2" variant="display">Start with one consequential operating problem.</Typography><Button variant="primary" size="lg" onClick={openContact}>Scope the first deployment</Button></section>
    </div>
  );
}

function CustomersPage({ openContact }: { openContact: () => void }) {
  const stories = [
    { id: "metro", label: "Metro East", content: <article className="carousel-story"><img src={image("asterline-city-network.png")} alt="Metro East urban network" /><div><Eyebrow>Transit and civic infrastructure</Eyebrow><Typography as="h2" variant="display">One river. Four networks. Zero shared blind spots.</Typography><p>A joint operating model gave transit, power, drainage, and bridge teams a single view of construction-season consequence.</p><div className="story-stats"><Metric label="Interruptions" value="-27%" note="year over year" /><Metric label="Callouts" value="-41%" note="within six months" /></div></div></article> },
    { id: "northshore", label: "Northshore Energy", content: <article className="carousel-story"><img src={image("asterline-wind-field.png")} alt="Northshore Energy offshore operations" /><div><Eyebrow>Offshore wind</Eyebrow><Typography as="h2" variant="display">Maintenance that moves with the weather.</Typography><p>Northshore aligned condition risk, vessel access, parts, and specialist crews across 214 offshore turbines.</p><div className="story-stats"><Metric label="Lost generation" value="-18%" note="in the first year" /><Metric label="First visits" value="94%" note="completed as planned" /></div></div></article> },
    { id: "port", label: "Port Meridian", content: <article className="carousel-story"><img src={image("asterline-port-hero.png")} alt="Port Meridian intermodal terminal" /><div><Eyebrow>Intermodal logistics</Eyebrow><Typography as="h2" variant="display">Reliability across every handoff.</Typography><p>Port Meridian connected crane, rail, gate, yard, and berth operations around throughput consequence.</p><div className="story-stats"><Metric label="Unplanned delay" value="-33%" note="across the terminal" /><Metric label="Throughput" value="+11%" note="without new equipment" /></div></div></article> },
  ];
  return (
    <div className="page-shell customers-page">
      <PageLead eyebrow="Customer outcomes" title="Measured in service kept, not screens shipped." body="Asterline deployments begin with a live operating problem and remain accountable to the result." marker="03 / Field proof" markerIcon={<Icon name="verified" />} details={["2.1 million assets", "31 countries", "12.6 million verified actions"]} />
      <Carousel className="customer-carousel" label="Customer stories" items={stories} />
      <section className="outcome-ledger"><Metric label="Avoided downtime" value="1.9M hrs" note="across deployed networks" /><Metric label="Planning lead time" value="+38 min" note="median improvement" /><Metric label="Field completion" value="91%" note="on the first visit" /><Metric label="Verified actions" value="12.6M" note="retained with evidence" /></section>
      <section className="customer-proof">
        <Paper className="analysis-chart" elevation="none"><Chart label="Avoided service interruption share by network" type="donut" animated controls={["data-table", "download"]} height={380} showLegend xKey="portfolio" data={[{ portfolio: "Avoided hours", energy: 34, transit: 27, water: 21, ports: 18 }]} series={[{ key: "energy", label: "Energy" }, { key: "transit", label: "Transit" }, { key: "water", label: "Water" }, { key: "ports", label: "Ports" }]} /></Paper>
        <div className="section-copy"><Eyebrow>Portfolio evidence</Eyebrow><Typography as="h2" variant="display">Reliability gains show up across the whole network.</Typography><Typography variant="body">The strongest programs do not optimize one asset class in isolation. They connect operating context across the services, handoffs, and dependencies that customers actually experience.</Typography><div className="proof-note"><Icon name="shieldCheck" /><span>Outcomes independently reviewed against each operator's pre-deployment baseline.</span></div></div>
      </section>
      <section className="customer-quote-grid"><blockquote>“Asterline gave engineering and operations a shared language for consequence.”<cite>Tom Adeyemi, Cedar Grid</cite></blockquote><blockquote>“The field team gets the reason, not just the work order.”<cite>Leila Morgan, Northshore Energy</cite></blockquote></section>
      <section className="closing-cta"><Eyebrow>Your first operating problem</Eyebrow><Typography as="h2" variant="display">Make the business case with your own network data.</Typography><Button variant="primary" size="lg" onClick={openContact}>Plan a working session</Button></section>
    </div>
  );
}

const insightArticles = [
  { type: "Field note", title: "Why condition is not consequence", summary: "A practical model for deciding when uncertain signals still require action.", time: "8 min", image: "asterline-wind-field.png" },
  { type: "Research", title: "The 2026 network resilience index", summary: "What 31 infrastructure operators reveal about coordination, evidence, and recovery.", time: "24 min", image: "asterline-city-network.png" },
  { type: "Operator guide", title: "Designing an effective control-room handoff", summary: "A clear operating pattern for preserving context across shifts and teams.", time: "11 min", image: "asterline-control-room.png" },
  { type: "Case briefing", title: "Planning access across an intermodal terminal", summary: "How consequence modeling changed maintenance windows at Port Meridian.", time: "7 min", image: "asterline-port-hero.png" },
  { type: "Technical brief", title: "From telemetry to defensible evidence", summary: "A traceable path from anomaly detection to verified closeout.", time: "15 min", image: "asterline-control-room.png" },
  { type: "Perspective", title: "The network is the unit of reliability", summary: "Asset optimization is not enough when service depends on connected systems.", time: "6 min", image: "asterline-city-network.png" },
];

function InsightsPage() {
  const [query, setQuery] = React.useState("");
  const [topic, setTopic] = React.useState("all");
  const filtered = insightArticles.filter((article) => (topic === "all" || article.type.toLowerCase().includes(topic)) && `${article.title} ${article.summary}`.toLowerCase().includes(query.toLowerCase()));
  return (
    <div className="page-shell insights-page">
      <PageLead eyebrow="Asterline intelligence" title="For people who operate the real world." body="Research, field practice, and operating patterns from the networks carrying energy, people, water, and goods." marker="04 / September 2026" markerIcon={<Icon name="fileChartColumn" />} details={["Field note 09", "Resilience index", "Operator briefing series"]} />
      <section className="metrics-dashboard">
        <header className="dashboard-heading"><div><Eyebrow>Network pulse / 31 operators</Eyebrow><Typography as="h2" variant="display">What infrastructure leaders are seeing now.</Typography><Typography variant="body">A rolling view of exposure, readiness, response, and evidence across participating networks.</Typography></div><div className="dashboard-controls"><Select label="Comparison period" defaultValue="quarter" options={[{ label: "Current quarter", value: "quarter" }, { label: "Previous quarter", value: "previous" }, { label: "Rolling 12 months", value: "year" }]} /><Button variant="secondary"><Icon name="download" /> Export briefing</Button></div></header>
        <div className="data-card-grid">
          <DataCard label="Network availability" value="97.8%" note="Across energy, transit, water, and ports" badge="+0.7 pts" tone="success" progress={98} icon={<Icon name="activity" />} />
          <DataCard label="Priority exposure" value="$18.4M" note="Modeled consequence currently above plan" badge="6 networks" tone="warning" progress={64} icon={<Icon name="risk" />} />
          <DataCard label="First-visit completion" value="91%" note="Field responses completed without return work" badge="+8% YoY" tone="success" progress={91} icon={<Icon name="clipboardCheck" />} />
          <DataCard label="Evidence complete" value="86%" note="Actions closed with verified field evidence" badge="12.6M actions" tone="info" progress={86} icon={<Icon name="verified" />} />
        </div>
        <div className="comparison-grid">
          <Paper className="comparison-panel" elevation="none"><div className="panel-heading"><div><Eyebrow>Peer comparison</Eyebrow><Typography as="h3" variant="title">Response readiness by network</Typography></div><Badge tone="success">Above benchmark</Badge></div><Chart label="Current response readiness compared with sector benchmark" type="bar" animated controls={["data-table", "download"]} domain={[0, 100]} height={340} showGrid showLegend xKey="network" data={[{ network: "Energy", current: 92, benchmark: 81 }, { network: "Transit", current: 84, benchmark: 78 }, { network: "Water", current: 88, benchmark: 74 }, { network: "Ports", current: 79, benchmark: 72 }]} series={[{ key: "current", label: "Asterline operators" }, { key: "benchmark", label: "Sector benchmark" }]} /></Paper>
          <Paper className="comparison-panel" elevation="none"><div className="panel-heading"><div><Eyebrow>Decision velocity</Eyebrow><Typography as="h3" variant="title">Median minutes from signal to owner</Typography></div><Badge tone="info">34 min gained</Badge></div><Chart label="Median signal to owner time compared with previous baseline" type="line" animated controls={["data-table", "download"]} height={340} showGrid showLegend showPoints xKey="month" data={[{ month: "Apr", current: 28, baseline: 48 }, { month: "May", current: 24, baseline: 47 }, { month: "Jun", current: 21, baseline: 46 }, { month: "Jul", current: 18, baseline: 47 }, { month: "Aug", current: 15, baseline: 46 }, { month: "Sep", current: 12, baseline: 46 }]} series={[{ key: "current", label: "Current operating model" }, { key: "baseline", label: "Previous baseline" }]} /></Paper>
        </div>
      </section>
      <section className="insight-feature"><img src={image("asterline-wind-field.png")} alt="Offshore wind engineers inspecting a turbine above the North Sea" /><div><Eyebrow>Featured field note / 8 min</Eyebrow><Typography as="h2" variant="display">Why condition is not consequence.</Typography><Typography variant="subtitle">A practical operating model for deciding when an uncertain signal still requires immediate action.</Typography><Button variant="secondary" size="lg">Read the field note <Icon name="arrowRight" /></Button></div></section>
      <section className="insight-tools"><SearchForm label="Search intelligence" placeholder="Search research, field notes, and guides" submitLabel="Search" onSubmit={setQuery} /><ToggleGroup label="Filter by publication type" value={topic} onValueChange={setTopic} options={[{ label: "All", value: "all" }, { label: "Research", value: "research" }, { label: "Field", value: "field" }, { label: "Guides", value: "guide" }]} /></section>
      {filtered.length ? <section className="insight-grid">{filtered.map((article) => <article className="insight-article" key={article.title}><img src={image(article.image)} alt="" /><div><span><Eyebrow>{article.type}</Eyebrow><Typography variant="caption">{article.time}</Typography></span><Typography as="h2" variant="title">{article.title}</Typography><Typography variant="body">{article.summary}</Typography><Link href="#article" onClick={(event) => event.preventDefault()}>Read article</Link></div></article>)}</section> : <EmptyState title="No intelligence matches that search" description="Try a broader term or return to all publication types." icon={<Icon name="search" />} action={<Button variant="primary" onClick={() => { setQuery(""); setTopic("all"); }}>Clear filters</Button>} />}
      <section className="newsletter-band" data-corva-theme="concept-dark"><div><Eyebrow>Operating signals</Eyebrow><Typography as="h2" variant="display">One useful briefing. Once a month.</Typography></div><div><TextInput label="Work email" type="email" placeholder="you@organization.com" /><Checkbox label="I agree to receive Asterline research and event updates." /><Button variant="primary" size="lg">Subscribe</Button></div></section>
    </div>
  );
}

function CompanyPage({ openContact }: { openContact: () => void }) {
  return (
    <div className="page-shell company-page">
      <PageLead eyebrow="Company" title="The physical world deserves better operating software." body="Asterline is built by infrastructure engineers, operators, product designers, and applied scientists who believe reliability is a shared discipline." marker="05 / Asterline" markerIcon={<Icon name="compass" />} details={["Founded in 2018", "Built alongside operators", "Remote across 12 countries"]} />
      <section className="company-manifesto"><img src={image("asterline-control-room.png")} alt="Infrastructure operations team at work" /><blockquote>We build for the people who carry consequence long after a software decision ships.</blockquote></section>
      <section className="company-values"><div><span>01</span><Typography as="h2" variant="title">Operational truth over software theater.</Typography><p>The product must clarify the real system, not create a more attractive version of uncertainty.</p></div><div><span>02</span><Typography as="h2" variant="title">Context travels with the work.</Typography><p>No one should receive an action without understanding the reason, consequence, and evidence.</p></div><div><span>03</span><Typography as="h2" variant="title">Trust is designed into the record.</Typography><p>Models explain themselves, decisions remain reviewable, and field proof closes the loop.</p></div></section>
      <section className="company-history"><div className="section-copy"><Eyebrow>Built alongside operators</Eyebrow><Typography as="h2" variant="display">A decade of learning how networks actually fail and recover.</Typography></div><Timeline events={[{ id: "2018", label: "Asterline founded", meta: "2018", description: "First reliability model developed with a regional power operator." }, { id: "2020", label: "Field orchestration launched", meta: "2020", description: "Decisions connected directly to crews, access, and evidence." }, { id: "2023", label: "Multi-network consequence", meta: "2023", description: "Transit, water, and energy dependencies entered one operating model." }, { id: "2026", label: "31 countries", meta: "Today", description: "2.1 million assets observed across critical physical networks." }]} /></section>
      <section className="jobs-section"><div className="section-copy"><Eyebrow>Join Asterline</Eyebrow><Typography as="h2" variant="display">Work on software that has to hold up in the real world.</Typography></div><Accordion items={[{ id: "product", title: "Senior product designer, network operations", content: "Lead complex workflow design with operators across energy and transit. Remote within North American time zones." }, { id: "frontend", title: "Staff frontend engineer, data systems", content: "Build high-density, accessible operating interfaces and visualization infrastructure. Remote within US or Canada." }, { id: "reliability", title: "Infrastructure reliability specialist", content: "Translate operating practice into models, workflows, and deployment outcomes. Travel up to 25%." }]} /><Button variant="primary" size="lg" onClick={openContact}>Introduce yourself <Icon name="arrowRight" /></Button></section>
    </div>
  );
}

function CommandPage({ notify, openWork }: { notify: (message: string) => void; openWork: () => void }) {
  const [section, setSection] = React.useState("overview");
  const [query, setQuery] = React.useState("");
  const rows = assetRows.filter((row) => Object.values(row).some((value) => String(value).toLowerCase().includes(query.toLowerCase())));
  const sideItems = [
    { id: "overview", label: "Network overview", icon: <Icon name="activity" /> },
    { id: "assets", label: "Asset health", icon: <Icon name="database" />, badge: 2 },
    { id: "work", label: "Work coordination", icon: <Icon name="workflow" />, badge: 6 },
    { id: "planning", label: "Access planning", icon: <Icon name="calendar" /> },
  ];
  return (
    <div className="command-shell">
      <aside className="command-sidebar"><Sidebar activeId={section} heading="North region" label="Command center sections" items={sideItems} onSelect={setSection} footer={<Stack gap="sm"><Typography variant="caption">Deterministic preview</Typography><Badge tone="info">Synthetic data</Badge></Stack>} /></aside>
      <div className="command-main">
        <header className="command-head"><div><div className="command-kicker"><Eyebrow>Tuesday, September 1</Eyebrow><Badge tone="info">Deterministic preview · synthetic data</Badge></div><Typography as="h1" variant="display">North region</Typography><Typography variant="subtitle">Morning operating picture across energy, transit, water, and port networks.</Typography></div><Stack direction="row" gap="sm"><Button variant="secondary" onClick={() => notify("Brief exported to the operations record.")}><Icon name="download" /> Export brief</Button><Button variant="primary" onClick={openWork}>Create response</Button></Stack></header>
        <ToggleGroup className="command-mobile-nav" label="Command center section" value={section} onValueChange={setSection} options={sideItems.map((item) => ({ label: String(item.label), value: item.id }))} />
        <section className="command-metrics"><Metric label="Network availability" value="97.4%" note="+0.6% since yesterday" /><Metric label="Priority exposure" value="$2.8M" note="2 assets need action" /><Metric label="Work in field" value="18" note="6 complete before noon" /><Metric label="Weather window" value="7h 20m" note="North Sea access" /></section>
        <section className="command-alerts"><Alert tone="danger" title="SUB-09 transformer temperature rising">Confidence 92%. Consequence reaches Metro East feeder capacity in 3 hours 40 minutes.</Alert><Alert tone="warning" title="TRK-067 inspection window closes at 10:20">Crew 14 is on site. Isolation approval is still pending.</Alert></section>
        <section className="command-charts"><Paper elevation="none"><div className="panel-heading"><div><Eyebrow>Consequence exposure</Eyebrow><Typography as="h2" variant="title">Risk entering the operating window</Typography></div><Badge tone="warning">2 above plan</Badge></div><Chart label="Consequence exposure over twelve hours" type="area" animated showGrid showLegend showPoints showTable height={310} xKey="time" data={[{ time: "06", observed: 18, planned: 22 }, { time: "08", observed: 24, planned: 22 }, { time: "10", observed: 31, planned: 23 }, { time: "12", observed: 27, planned: 24 }, { time: "14", observed: 21, planned: 23 }, { time: "16", observed: 16, planned: 21 }]} series={[{ key: "observed", label: "Observed" }, { key: "planned", label: "Planned" }]} /></Paper><Paper elevation="none"><div className="panel-heading"><div><Eyebrow>Response readiness</Eyebrow><Typography as="h2" variant="title">Regional response confidence</Typography></div><Badge tone="success">On plan</Badge></div><Chart label="Regional response readiness out of 100" type="gauge" animated controls={["data-table"]} domain={[0, 100]} showTable height={310} xKey="metric" data={[{ metric: "Readiness", value: 86 }]} series={[{ key: "value", label: "Ready" }]} /></Paper></section>
        <section className="asset-register"><div className="register-heading"><div><Eyebrow>Asset health</Eyebrow><Typography as="h2" variant="title">Priority operating register</Typography></div><SearchForm label="Search asset register" placeholder="Asset, network, signal, owner" submitLabel="Search" onSubmit={setQuery} /></div><DataGrid caption="North region priority asset register" columns={assetColumns} rows={rows} sortable filterable pageable pageSize={6} onRowClick={({ row }) => notify(`${row.asset} opened.`)} emptyState={<EmptyState title="No assets match this search" description="Clear the query or search by asset, network, class, signal, or owner." icon={<Icon name="search" />} action={<Button variant="primary" onClick={() => setQuery("")}>Clear search</Button>} />} /></section>
        <section className="command-lower"><Paper elevation="none"><div className="panel-heading"><div><Eyebrow>Field coordination</Eyebrow><Typography as="h2" variant="title">Response board</Typography></div><Button variant="secondary" size="sm" onClick={openWork}>Add response</Button></div><WorkflowBoard columns={workColumns} density="compact" onItemClick={({ item }) => notify(`${item.title} selected.`)} /></Paper><Paper elevation="none"><div className="panel-heading"><div><Eyebrow>Access plan</Eyebrow><Typography as="h2" variant="title">September 2026</Typography></div></div><Calendar label="September 2026 access calendar" monthLabel="September 2026" weekdays={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]} days={monthDays} onDaySelect={(day) => notify(`September ${day.label} selected.`)} /></Paper></section>
      </div>
    </div>
  );
}

function SitePage({ route, navigate, openContact, notify, openWork }: { route: Route; navigate: Navigate; openContact: () => void; notify: (message: string) => void; openWork: () => void }) {
  if (route === "platform") return <PlatformPage navigate={navigate} />;
  if (route === "industries") return <IndustriesPage openContact={openContact} />;
  if (route === "customers") return <CustomersPage openContact={openContact} />;
  if (route === "insights") return <InsightsPage />;
  if (route === "company") return <CompanyPage openContact={openContact} />;
  if (route === "command") return <CommandPage notify={notify} openWork={openWork} />;
  return <HomePage navigate={navigate} openContact={openContact} />;
}

export function App() {
  const [route, setRoute] = React.useState<Route>(readRoute);
  const [mode, setMode] = React.useState<ThemeMode>("light");
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [contactOpen, setContactOpen] = React.useState(false);
  const [workOpen, setWorkOpen] = React.useState(false);
  const [notice, setNotice] = React.useState("");

  React.useEffect(() => {
    const onPopState = () => setRoute(readRoute());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  React.useEffect(() => {
    document.documentElement.dataset.corvaTheme = `concept-${mode}`;
  }, [mode]);

  const navigate = React.useCallback((next: Route) => {
    window.history.pushState({}, "", routePath(next));
    setRoute(next);
    setDrawerOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const publicNav = navItems.filter((item) => item.id !== "home" && item.id !== "command");

  return (
    <Box className="site-root" surface="none" padding="none" data-corva-theme={`concept-${mode}`}>
      <header className="site-header">
        <a className="asterline-brand" href={routePath("home")} onClick={(event) => { event.preventDefault(); navigate("home"); }} aria-label="Asterline home"><span className="asterline-symbol"><Icon name="activity" /></span><strong>Asterline</strong></a>
        <MenuBar className="desktop-nav" label="Primary navigation" items={publicNav.map((item) => ({ id: item.id, label: item.label, current: route === item.id, onSelect: () => navigate(item.id) }))} />
        <div className="header-actions"><Switch label="Dark" checked={mode === "dark"} onChange={() => setMode(mode === "dark" ? "light" : "dark")} /><Button className="contact-button" variant="secondary" size="sm" onClick={() => setContactOpen(true)}>Talk to us</Button><Button className="command-button" variant="primary" size="sm" onClick={() => navigate("command")}>Command center</Button><Button className="mobile-menu" variant="secondary" size="sm" aria-label="Open navigation" onClick={() => setDrawerOpen(true)}><Icon name="menu" /></Button></div>
      </header>

      <main><SitePage route={route} navigate={navigate} openContact={() => setContactOpen(true)} notify={setNotice} openWork={() => setWorkOpen(true)} /></main>

      {route !== "command" && <footer className="site-footer" data-corva-theme="concept-dark"><div className="footer-brand"><strong>Asterline</strong><p>Infrastructure intelligence for networks that cannot pause.</p></div><div><Typography variant="caption">Explore</Typography><Button variant="secondary" size="sm" onClick={() => navigate("platform")}>Platform</Button><Button variant="secondary" size="sm" onClick={() => navigate("customers")}>Customers</Button><Button variant="secondary" size="sm" onClick={() => navigate("insights")}>Intelligence</Button></div><div><Typography variant="caption">Company</Typography><Button variant="secondary" size="sm" onClick={() => navigate("company")}>About</Button><Button variant="secondary" size="sm" onClick={() => setContactOpen(true)}>Contact</Button><Link href="https://corvaui.com/" target="_blank" rel="noreferrer">Interface system: CorvaUI</Link></div><div className="footer-system"><img src={`${deploymentBase()}/corvaui-logo-reversed.svg`} alt="CorvaUI" /><span>React demonstration environment</span></div></footer>}

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="Asterline navigation"><Sidebar activeId={route} heading="Asterline" label="Site pages" items={navItems} onSelect={(id) => navigate(id as Route)} /></Drawer>

      <Dialog open={contactOpen} onClose={() => setContactOpen(false)} title="Plan an Asterline working session" description="Bring one operating problem. We will map the data, decisions, people, and evidence around it." actions={<Stack direction="row" gap="sm"><Button variant="secondary" onClick={() => setContactOpen(false)}>Cancel</Button><Button variant="primary" onClick={() => { setContactOpen(false); setNotice("Working session request recorded."); }}>Request session</Button></Stack>}><Grid columns="two" gap="md"><TextInput label="Name" placeholder="Your name" /><TextInput label="Work email" type="email" placeholder="you@organization.com" /><Select label="Network" defaultValue="energy" options={[{ label: "Energy", value: "energy" }, { label: "Transit", value: "transit" }, { label: "Water or civic", value: "water" }, { label: "Port or logistics", value: "port" }]} /><Select label="Region" defaultValue="north-america" options={[{ label: "North America", value: "north-america" }, { label: "Europe", value: "europe" }, { label: "Asia Pacific", value: "apac" }]} /></Grid><Textarea label="What operating problem should we examine?" rows={5} /></Dialog>

      <Modal open={workOpen} onClose={() => setWorkOpen(false)} title="Create response"><Stack gap="md"><TextInput label="Response title" defaultValue="Investigate priority signal" /><Grid columns="two" gap="md"><Select label="Network" defaultValue="grid" options={[{ label: "Cedar Grid", value: "grid" }, { label: "Metro East", value: "transit" }, { label: "North Sea Wind", value: "wind" }]} /><Select label="Priority" defaultValue="critical" options={[{ label: "Critical", value: "critical" }, { label: "Watch", value: "watch" }, { label: "Planned", value: "planned" }]} /><DatePicker label="Target date" defaultValue="2026-09-01" /><TimePicker label="Access time" defaultValue="10:20" /></Grid><RadioGroup label="Response path" name="response-path" defaultValue="field" options={[{ label: "Field response", value: "field", description: "Dispatch a qualified crew with evidence requirements" }, { label: "Remote validation", value: "remote", description: "Confirm the signal before dispatch" }]} /><Slider label="Minimum confidence" min={50} max={100} defaultValue={80} /><NumberField label="Crew size" min={1} max={12} defaultValue={3} /><Textarea label="Operating context" rows={4} defaultValue="Maintain feeder capacity while the asset is isolated. Confirm thermal decay before return to service." /><FileUpload label="Response evidence" actionLabel="Attach procedure" /><Checkbox label="Require control-room approval before dispatch" defaultChecked /><Stack direction="row" gap="sm"><Button variant="secondary" onClick={() => setWorkOpen(false)}>Cancel</Button><Button variant="primary" onClick={() => { setWorkOpen(false); setNotice("Response created and routed for approval."); }}>Create response</Button></Stack></Stack></Modal>

      <Snackbar open={Boolean(notice)} action={<Button variant="secondary" size="sm" onClick={() => setNotice("")}>Dismiss</Button>}>{notice}</Snackbar>
    </Box>
  );
}
