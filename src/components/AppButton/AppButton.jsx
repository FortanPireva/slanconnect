export default function AppButton({ children, onClick, className }) {
  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
}
