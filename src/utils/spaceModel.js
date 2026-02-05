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

export function buildSpace(constellations, activePhase = 1) {
  const stars = [];
  const links = []; // line connections for constellation effect

  // background dust
  const bgCount = 420;
  for (let i = 0; i < bgCount; i++) {
    const r = Math.random();
    stars.push({
      kind: "dust",
      x: (Math.random() - 0.5) * 2600,
      y: (Math.random() - 0.5) * 1500,
      radius: 0.6 + r * 1.6,
      tw: Math.random() * 10,
      a: 0.06 + Math.random() * 0.2,
    });
  }

  // Constellations (locations)
  const visible = constellations.filter((c) => c.phase <= activePhase);

  for (const c of visible) {
    const rnd = seededRand(hashString(c.id));
    const cx = c.coords.x;
    const cy = c.coords.y;

    // create stars inside a cluster
    const nodeIds = [];
    for (let i = 0; i < (c.starCount || 8); i++) {
      const ang = rnd() * Math.PI * 2;
      const dist = 30 + rnd() * 120; // cluster radius
      const x = cx + Math.cos(ang) * dist + (rnd() - 0.5) * 18;
      const y = cy + Math.sin(ang) * dist * 0.75 + (rnd() - 0.5) * 18;

      const id = `${c.id}-s${i}`;
      nodeIds.push(id);

      stars.push({
        kind: "star",
        id,
        constellationId: c.id,
        label: c.name, // label cho cụm (chỉ hiện 1 lần ở “anchor”)
        labelKind: i === 0 ? "anchor" : "member",
        x,
        y,
        radius: i === 0 ? 2.6 : 1.8 + rnd() * 1.8,
        tw: rnd() * 10,
        a: i === 0 ? 0.95 : 0.55 + rnd() * 0.25,
        phase: c.phase,
        appearPhase: c.phase,
      });
    }

    // build constellation links: nối sao gần nhau theo “chuỗi”
    for (let i = 0; i < nodeIds.length - 1; i++) {
      links.push({
        a: nodeIds[i],
        b: nodeIds[i + 1],
        appearPhase: c.phase,
        constellationId: c.id,
      });
    }
  }

  return { stars, links };
}
