import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Contexts
import { SocketProvider } from "./context/SocketContext";
import { PlayerProvider } from "./context/PlayerContext";

// Components
import Layout from "./components/Layout";
import Stats from "./components/Stats";

// Pages
  // Home - Lobby
    import Home from "./pages/Home";
    import Lobby from "./pages/Lobby";

  // Sins
    import Lust from "./pages/Lust";
    import Gluttony from "./pages/Gluttony";
    import Greed from "./pages/Greed";
    import Sloth from "./pages/Sloth";
    import Wrath from "./pages/Wrath";
    import Envy from "./pages/Envy";
    import Pride from "./pages/Pride";

function App() {
  const [warp, setWarp] = useState(false);

  return (
    <PlayerProvider>
      <SocketProvider>
        <Router>
          {/* Global stats overlay visible on all pages after game starts */}

          <Routes>
            {/* Homepage */}
            <Route path="/" element={<Home />} />

            {/* Lobby page */}
            <Route path="/start" element={<Lobby />} />

            {/* Sin pages wrapped with Layout */}
            <Route
              path="/lust"
              element={
                <Layout currentSin="Lust" warp={warp} setWarp={setWarp}>
                  <Lust />
                </Layout>
              }
            />
            <Route
              path="/gluttony"
              element={
                <Layout currentSin="Gluttony" warp={warp} setWarp={setWarp}>
                  <Gluttony />
                </Layout>
              }
            />
            <Route
              path="/greed"
              element={
                <Layout currentSin="Greed" warp={warp} setWarp={setWarp}>
                  <Greed />
                </Layout>
              }
            />
            <Route
              path="/sloth"
              element={
                <Layout currentSin="Sloth" warp={warp} setWarp={setWarp}>
                  <Sloth />
                </Layout>
              }
            />
            <Route
              path="/wrath"
              element={
                <Layout currentSin="Wrath" warp={warp} setWarp={setWarp}>
                  <Wrath />
                </Layout>
              }
            />
            <Route
              path="/envy"
              element={
                <Layout currentSin="Envy" warp={warp} setWarp={setWarp}>
                  <Envy />
                </Layout>
              }
            />
            <Route
              path="/pride"
              element={
                <Layout currentSin="Pride" warp={warp} setWarp={setWarp}>
                  <Pride />
                </Layout>
              }
            />
          </Routes>
        </Router>
      </SocketProvider>
    </PlayerProvider>
  );
}

export default App;
