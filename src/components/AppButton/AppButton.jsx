const defaultStyleCss =
  "group relative   justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";
export default function AppButton({
  children,
  onClick,
  className,
  defaultStyle = false,
}) {
  return (
    <button
      onClick={onClick}
      className={defaultStyle ? defaultStyleCss : className}
    >
      {children}
    </button>
  );
}
