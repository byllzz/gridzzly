import Logo from './Logo';

// components/Header.jsx
export default function Header() {
  return (
    <header className="flex flex-col items-center text-center pt-11">
      <div className="flex items-center gap-2 font-secondary">
        <Logo />
        <h1 className="text-5xl font-bold italic">
          CSS{' '}
          <span className=" bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            Grid
          </span>{' '}
          Generator
        </h1>
      </div>
      <p className="text-zinc-400 text-sm max-w-md">
        Design responsive CSS Grid layouts visually - draw items, customize tracks, and copy
        ready-to-use code.
      </p>
    </header>
  );
}
