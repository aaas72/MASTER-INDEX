export default function Fab() {
  return (
    <div className="fixed bottom-8 right-8 z-50">
      <button className="custom-shadow flex h-14 w-14 items-center justify-center bg-primary-container text-white transition-all hover:scale-105 active:scale-95">
        <span className="material-symbols-outlined">add</span>
      </button>
    </div>
  );
}