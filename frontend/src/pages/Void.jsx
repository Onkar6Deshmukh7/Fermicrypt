import { useEffect, useState } from "react";

export default function Void() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen w-screen bg-black flex items-center justify-center relative overflow-hidden">
      <p
        className={`absolute bottom-4 right-6 text-[10px] text-gray-700 opacity-0 transition-opacity duration-[3000ms] ${
          visible ? "opacity-40" : "opacity-0"
        }`}
      >
        took you 330 million years to get out of here
       </p>
    </div>
  );
}
