export default function MathLayout({ children }) {
  return (
    <div className="flex flex-col w-full bg-yellow-500 portrait:bg-yellow-500 landscape:bg-yellow-500 min-h-screen">
      {children}
    </div>
  );
}
