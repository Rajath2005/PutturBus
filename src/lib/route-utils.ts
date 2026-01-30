export function normalizeCity(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "")
}

export function routeKey(from: string, to: string): string {
  return `${normalizeCity(from)}->${normalizeCity(to)}`
}
