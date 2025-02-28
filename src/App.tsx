import { ChevronLeft, ChevronRight } from 'lucide-react'
import './App.css'
import { useRef } from 'react';

function App() {
  const isDragging = useRef(false);
  const parentRef = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLDivElement>(null);

  const mouseChildMove = (e: MouseEvent) => {
    if (!isDragging.current) return;
    if(parentRef.current && childRef.current) {
      const rect = parentRef.current.getBoundingClientRect();
      let offsetX = e.clientX - rect.left;
      let rectWidth = rect.width;
      if (offsetX < 0) offsetX = 0;
      if (offsetX > rectWidth) offsetX = rectWidth;
      childRef.current.style.width = `${offsetX-3}px`;
    }
  };

  const mouseChildUp = () => {
    isDragging.current = false;
    document.removeEventListener('mouseup', mouseChildUp);
    document.removeEventListener('mousemove', mouseChildMove);
  };

  const mouseChildDown = () => {
    isDragging.current = true;
    document.addEventListener('mouseup', mouseChildUp);
    document.addEventListener('mousemove', mouseChildMove);
  }

  return (
    <>
      <div className="w-full h-screen flex flex-row items-center justify-center  bg-[#fefefe]">
        <div 
          style={{ 
            backgroundImage: 'url("https://t4.ftcdn.net/jpg/09/26/03/83/360_F_926038379_6SoiqzDmbmxKspgXOGa4ibvhkKyCzPrn.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
          ref={parentRef}
          className="relative w-70 h-100 flex flex-col items-start justify-center rounded-xl"
        >
          <div 
            ref={childRef}
            className="absolute z-1 w-[50%] h-full flex flex-row items-center justify-end bg-[#1a1a1aab] rounded-tl-xl rounded-bl-xl rounded-br-xl border-r-4 border-r-white">
            <button
              onMouseDown={mouseChildDown}
              className="absolute flex flex-row items-center justify-center gap-x-2 text-white outline-none mr-[-2.2rem]"
            >
              <ChevronLeft size={30} strokeWidth={3} />
              <ChevronRight size={30} strokeWidth={3} />
            </button>
          </div>
          <div className="absolute z-3 rounded-bl-xl rounded-br-xl bottom-0 left-0 w-full flex flex-col justify-center items-center py-5 backdrop-blur-[5px]">
            <div className="w-fit flex flex-col items-start justify-center">
              <h1 className="text-white text-3xl font-[500]">Professional</h1>
              <h1 className="text-white text-3xl font-[500]">editing included</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
