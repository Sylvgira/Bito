export const byOrder = <T extends { data: { order?: number } }>(items: T[]) =>
  [...items].sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99));

export const byDateDesc = <T extends { data: { publishDate: Date } }>(items: T[]) =>
  [...items].sort((a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime());

export const entryPath = (base: string, entry: { id: string }) => `/${base}/${entry.id}/`;

export const formatDate = (date: Date) =>
  new Intl.DateTimeFormat('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
