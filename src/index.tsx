import {
  hydrate,
  LocationProvider,
  prerender as ssr,
  Route,
  Router,
} from "preact-iso";

import { Header } from "./components/Header.jsx";
import { Home } from "./pages/Home/index.jsx";
import { NotFound } from "./pages/_404.jsx";
import "./style.css";

export function App() {
  return (
    <LocationProvider>
      <Header />
      <Router>
        <Route path="/" component={Home} />
        <Route default component={NotFound} />
      </Router>
    </LocationProvider>
  );
}

if (typeof window !== "undefined") {
  hydrate(<App />, document.getElementById("app"));
}

export async function prerender(data) {
  return await ssr(<App {...data} />);
}
