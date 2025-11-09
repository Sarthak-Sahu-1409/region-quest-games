export const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* Animated gradient base */}
      <div className="absolute inset-0 bg-gradient-animated opacity-60" />
      
      {/* Floating gradient orbs */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-br from-primary/30 to-primary-glow/20 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute top-40 right-20 w-80 h-80 bg-gradient-to-br from-secondary/30 to-secondary/20 rounded-full blur-3xl animate-float-medium" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-20 left-1/4 w-72 h-72 bg-gradient-to-br from-success/30 to-success/20 rounded-full blur-3xl animate-float-fast" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-40 right-1/3 w-64 h-64 bg-gradient-to-br from-accent/30 to-accent/20 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '3s' }} />
      <div className="absolute top-1/2 left-1/2 w-56 h-56 bg-gradient-to-br from-primary-glow/25 to-accent/15 rounded-full blur-3xl animate-float-medium" style={{ animationDelay: '1.5s' }} />
      
      {/* Particles */}
      {[...Array(25)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-primary/20 dark:bg-primary-glow/30 animate-particle-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 4 + 2}px`,
            height: `${Math.random() * 4 + 2}px`,
            animationDelay: `${Math.random() * 20}s`,
            animationDuration: `${Math.random() * 20 + 30}s`,
          }}
        />
      ))}
      
      {/* Additional accent particles */}
      {[...Array(15)].map((_, i) => (
        <div
          key={`accent-${i}`}
          className="absolute rounded-full bg-accent/15 dark:bg-accent/25 animate-particle-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            animationDelay: `${Math.random() * 25 + 5}s`,
            animationDuration: `${Math.random() * 25 + 35}s`,
          }}
        />
      ))}
    </div>
  );
};