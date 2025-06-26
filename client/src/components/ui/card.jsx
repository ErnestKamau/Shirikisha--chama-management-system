export function Card({ children, ...props }) {
  return <div {...props} className={`rounded-lg border bg-white shadow ${props.className || ""}`}>{children}</div>;
}
export function CardHeader({ children, ...props }) {
  return <div {...props} className={`p-4 border-b ${props.className || ""}`}>{children}</div>;
}
export function CardTitle({ children, ...props }) {
  return <h2 {...props} className={`text-lg font-semibold ${props.className || ""}`}>{children}</h2>;
}
export function CardContent({ children, ...props }) {
  return <div {...props} className={`p-4 ${props.className || ""}`}>{children}</div>;
}