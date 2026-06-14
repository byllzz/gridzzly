export default function Header() {
  return (
    <header className="flex flex-col items-center text-center pt-12">
      <div className="flex items-center gap-2 ">
        <h1 className="text-5xl font-bold">
          CSS{' '}
          <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            Grid
          </span>{' '}
          Generator
        </h1>
      </div>
      <p className="text-white/80 text-[20px] leading-[1] mt-1 font-medium max-w-md font-script">
        Design responsive CSS Grid layouts visually - draw items, customize tracks, and copy
        ready-to-use code.
      </p>
    </header>
  );
}
