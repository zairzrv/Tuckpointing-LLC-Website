/*
   site.js: shared code that runs on EVERY page.
   Loaded after jQuery and Bootstrap, before the page's own script. */

/* Placeholder wall pictures
   We don't have real job photos yet, so this draws a brick wall as an SVG
   and turns it into an image URL. Delete this once real photos have a src. */
const PALETTE = {
  chimney:    { brick: "#8f2a1f", mortar: "#d8ccb2" },
  foundation: { brick: "#7a7067", mortar: "#cfc6b4" },
  stone:      { brick: "#a39276", mortar: "#e6dcc7" },
  brick:      { brick: "#a3241c", mortar: "#efe3cb" }
};

// colors = one PALETTE entry, worn = true draws dark mortar and a crack ("before" look)
function wallSvg(colors, worn) {
  let bricks = "";
  for (let row = 0; row < 12; row++) {
    const offset = row % 2 ? -30 : 0;               // every other row shifts half a brick
    for (let x = offset; x < 640; x += 60) {
      const shade = worn ? ((row * 7 + x) % 3 === 0 ? 0.55 : 0.75) : 1;
      bricks += `<rect x="${x + 2}" y="${row * 40 + 2}" width="56" height="36" rx="2" fill="${colors.brick}" opacity="${shade}"/>`;
    }
  }
  const mortar = worn ? "#3b332c" : colors.mortar;
  const crack = worn ? `<path d="M250 0 L270 80 L240 160 L280 240 L255 330 L290 480" stroke="#1b1714" stroke-width="5" fill="none"/>` : "";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480"><rect width="640" height="480" fill="${mortar}"/>${bricks}${crack}</svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

// $(function () { ... }) waits until the page's HTML is loaded, then runs.
$(function () {

  // Fill every <img data-placeholder="..."> that has no real src yet.
  $("img[data-placeholder]").each(function () {
    if (!$(this).attr("src")) {
      $(this).attr("src", wallSvg(PALETTE[$(this).data("placeholder")], false));
    }
  });

  // Highlight the current page in the navbar.
  // location.pathname is like "/site/work.html" -> we keep just "work.html".
  const current = location.pathname.split("/").pop() || "index.html";
  $(".navbar .nav-link").each(function () {
    if ($(this).attr("href") === current) {
      $(this).addClass("active").attr("aria-current", "page");
    }
  });

  // Keep the footer year current.
  $("#year").text(new Date().getFullYear());
});
