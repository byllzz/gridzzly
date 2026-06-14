import CSSGridGenerator from './components/CSSGridGenerator';
import GithubIcon from './components/GithubIcon';
import Header from './components/Header';
import LogoIcon from './components/LogoIcon';

export default function App() {
  return (
    <div className="flex flex-col gap-12 w-full min-h-screen relative scrollbar-none overflow-hidden">
      <div className="absolute top-0 right-0 z-10">
        <GithubIcon />
      </div>
      <div className="absolute top-4 gap-1.5 left-5 z-10 flex items-center">
        <LogoIcon height={7} width={7} />
        <span className="text-white text-[22px] relative bottom-[1px]">Gridzzly</span>{' '}
      </div>

      <Header />
      <CSSGridGenerator />
    </div>
  );
}
