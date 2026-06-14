import CSSGridGenerator from './components/CSSGridGenerator';
import GithubIcon from './components/GithubIcon';
import Header from './components/Header';
export default function App() {
  return (
    <div className="flex flex-col items-center justify-between! w-full h-screen min-h-full relative">
      <div className="absolute top-0 right-0">
        <GithubIcon />
      </div>
      <Header />
      <CSSGridGenerator />
    </div>
  );
}
