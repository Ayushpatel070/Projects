export default function Container({ children, className = "" }) {
  return (
    <div className={`max-w-5xl mx-auto px-4 w-full ${className}`}>
      {children}
    </div>
  );
}