export const STORE_KEY = "moon_people_v1";

export function readPeople() {
  try {
    const arr = JSON.parse(localStorage.getItem(STORE_KEY) || "[]");
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

export function writePeople(arr) {
  localStorage.setItem(STORE_KEY, JSON.stringify(arr));
}

export function upsertPerson(name) {
  const now = Date.now();
  const people = readPeople();

  const idx = people.findIndex(
    (p) => (p?.name || "").toLowerCase() === name.toLowerCase(),
  );

  if (idx >= 0) people[idx].lastSeen = now;
  else people.push({ name, firstSeen: now, lastSeen: now });

  const MAX = 200;
  people.sort((a, b) => (b.lastSeen || 0) - (a.lastSeen || 0));
  writePeople(people.slice(0, MAX));
  return readPeople();
}

export function resetPeople() {
  localStorage.removeItem(STORE_KEY);
}
