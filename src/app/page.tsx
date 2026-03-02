export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="max-w-2xl text-center space-y-6">
        <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          MyUI
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Next-generation MCP-first UI component library. Production-grade
          components that look stunning out of the box.
        </p>
        <div className="flex gap-4 justify-center pt-4">
          <div className="inline-flex items-center rounded-lg bg-muted px-4 py-2 text-sm font-mono">
            Add the MCP server to get started
          </div>
        </div>
      </div>
    </main>
  );
}
