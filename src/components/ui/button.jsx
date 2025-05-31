export function Button({ children, variant, size, ...props }) {
  let base = "rounded px-3 py-1 font-semibold ";
  if (variant === "ghost") base += "bg-transparent hover:bg-gray-200 ";
  else base += "bg-blue-600 text-white hover:bg-blue-700 ";
  if (size === "icon") base += "p-1 ";
  return <button {...props} className={base}>{children}</button>;
}
