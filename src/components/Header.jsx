export default function Header() {
  return (
    <header className="flex flex-col items-center text-center pt-12 relative top-4 sm:top-0">
      <div className="flex items-center gap-2 ">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
          CSS{' '}
          <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            Grid
          </span>{' '}
          Generator
        </h1>
      </div>
      <p className="text-white/80  text-[18px] lg:text-[20px] leading-[1] mt-2 font-medium max-w-[350px] lg:max-w-md font-script">
        Design responsive CSS Grid layouts visually - draw items, customize tracks, and copy
        ready-to-use code.
      </p>
    </header>
  );
}
