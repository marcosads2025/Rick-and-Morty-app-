import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { FavoritosProvider } from "./contexts/FavoritosContext";
import Home from "./pages/Home";
import Personagens from "./pages/Personagens";
import Episodios from "./pages/Episodios";
import Localizacoes from "./pages/Localizacoes";
import Favoritos from "./pages/Favoritos";


function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/personagens"} component={Personagens} />
      <Route path={"/episodios"} component={Episodios} />
      <Route path={"/localizacoes"} component={Localizacoes} />
      <Route path={"/favoritos"} component={Favoritos} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        switchable
      >
        <FavoritosProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </FavoritosProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
