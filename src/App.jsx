import CSSGridGenerator from './components/CSSGridGenerator';
import GithubIcon from './components/GithubIcon';
import Header from './components/Header';

export default function App() {
  return (
    <div className="flex flex-col gap-10 w-full min-h-screen relative scrollbar-none overflow-hidden">
      <div className="absolute top-0 right-0 z-10">
        <GithubIcon />
      </div>

      <Header />
      <CSSGridGenerator />
    </div>
  );
}
