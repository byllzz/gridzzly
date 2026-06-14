import CSSGridGenerator from './components/CSSGridGenerator';
import Header from './components/Header';
export default function App() {
  return (
    <div className="flex flex-col items-center justify-between! w-full h-screen min-h-full">
      <Header />
      <CSSGridGenerator />
    </div>
  );
}
