export function Table({ children }) {
  return <table className="table-auto w-full border-collapse border border-gray-300">{children}</table>;
}
export function TableHeader({ children }) {
  return <thead className="bg-gray-100">{children}</thead>;
}
export function TableBody({ children }) {
  return <tbody>{children}</tbody>;
}
export function TableRow({ children }) {
  return <tr>{children}</tr>;
}
export function TableHead({ children }) {
  return <th className="border border-gray-300 px-2 py-1 text-left">{children}</th>;
}
export function TableCell({ children }) {
  return <td className="border border-gray-300 px-2 py-1">{children}</td>;
}