export default function Topbar({ title }: { title: string }) {
  return (
    <header className="flex items-center justify-between mb-4">
      <h1 className="text-2xl font-semibold">{title}</h1>
    </header>
  );
}
