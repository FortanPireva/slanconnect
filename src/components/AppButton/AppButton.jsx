export default function AppButton({ children, onClick, classes }) {
  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
