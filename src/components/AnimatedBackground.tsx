export const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* Static gradient base */}
      <div className="absolute inset-0 bg-gradient-static opacity-50" />
    </div>
  );
};