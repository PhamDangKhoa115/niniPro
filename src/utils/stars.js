function hashString(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function seededRand(seed) {
  let s = seed >>> 0;
  return function () {
    s = (1664525 * s + 1013904223) >>> 0;
    return (s & 0xffffffff) / 0x100000000;
  };
}

export function safeName(raw) {
  const s = (raw || "")
    .replace(/[\u200B-\u200D\uFEFF]/g, "") // remove zero-width chars
    .trim()
    .replace(/\s+/g, " ")
    .slice(0, 30);

  // optional: chặn tên rỗng
  return s;
}

export function buildStarsFromPeople(people, myName) {
  const stars = [];

  // background dust
  const bgCount = 420;
  for (let i = 0; i < bgCount; i++) {
    const r = Math.random();
    stars.push({
      kind: "dust",
      x: (Math.random() - 0.5) * 2400,
      y: (Math.random() - 0.5) * 1400,
      radius: 0.6 + r * 1.6,
      tw: Math.random() * 10,
      a: 0.08 + Math.random() * 0.22,
    });
  }

  // person stars stable by name
  for (const p of people) {
    const name = p?.name || "";
    const rnd = seededRand(hashString(name));

    const ang = rnd() * Math.PI * 2;
    const dist = 520 + rnd() * 1500; // ✅ đẩy ra xa + range lớn hơn
    const squish = 0.72 + (rnd() - 0.5) * 0.18; // ellipse ít dẹt hơn

    const x = Math.cos(ang) * dist + (rnd() - 0.5) * 260;
    const y = Math.sin(ang) * dist * squish + (rnd() - 0.5) * 220;
    stars.push({
      kind: "person",
      name,
      x,
      y,
      radius: 1.8 + rnd() * 2.6,
      tw: rnd() * 10,
      a: 0.45 + rnd() * 0.35,
      isMe: false,
    });
  }

  // mark me
  for (const s of stars) {
    if (
      s.kind === "person" &&
      myName &&
      s.name.toLowerCase() === myName.toLowerCase()
    ) {
      s.isMe = true;
      s.radius *= 1.6;
      s.a = 0.92;
    }
  }

  return stars;
}
