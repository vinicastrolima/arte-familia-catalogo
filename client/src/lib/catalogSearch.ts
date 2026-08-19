export function normalizeSearchText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function matchesSearch(
  query: string,
  values: Array<string | string[] | undefined>
) {
  const terms = normalizeSearchText(query).split(/\s+/).filter(Boolean);
  if (terms.length === 0) return true;

  const searchableText = normalizeSearchText(
    values.flatMap(value => value ?? []).join(" ")
  );

  return terms.every(term => searchableText.includes(term));
}
