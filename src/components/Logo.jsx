// components/Logo.jsx
export default function Logo() {
  return (
    <div className="flex items-center justify-center w-10 h-10 relative bottom-1.5 rotate-12">
      <svg
        viewBox="0 0 48 48"
        xmlns="http://www.w3.org/2000/svg"
        className="w-10 h-10 fill-white"
        aria-label="Grid Maker Logo"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <title>CSS Grid Maker</title>
          <g id="Layer_2" data-name="Layer 2">
            <g id="invisible_box" data-name="invisible box">
              <rect width="48" height="48" fill="none"></rect>
            </g>
            <g id="icons_Q2" data-name="icons Q2">
              <path d="M44,26a2,2,0,0,0,0-4H38V14h6a2,2,0,0,0,0-4H38V4a2,2,0,0,0-4,0v6H26V4a2,2,0,0,0-4,0v6H14V4a2,2,0,0,0-4,0v6H4a2,2,0,0,0,0,4h6v8H4a2,2,0,0,0,0,4h6v8H4a2,2,0,0,0,0,4h6v6a2,2,0,0,0,4,0V38h8v6a2,2,0,0,0,4,0V38h8v6a2,2,0,0,0,4,0V38h6a2,2,0,0,0,0-4H38V26ZM34,14v8H26V14ZM14,14h8v8H14Zm0,20V26h8v8Zm20,0H26V26h8Z"></path>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
