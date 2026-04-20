export default function Fab() {
  return (
    <div className="fixed bottom-8 right-8 z-50">
      <button className="bg-primary-container text-white w-14 h-14 flex items-center justify-center custom-shadow hover:scale-105 active:scale-95 transition-all">
        <span className="material-symbols-outlined">add</span>
      </button>
    </div>
  );
}
