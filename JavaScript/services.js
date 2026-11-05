/* =========================================================
   services.js: Services page (services.html)
   Use case: Is my town in range?
   ========================================================= */
$(function () {

  // The towns we serve, all lowercase so the comparison ignores capitals.
  // (Later this list can come from the database instead.)
  const TOWNS = ["onrida", "galisburg", "gavana", "knoxville", "kickapoo", "monrith"];

  function checkTown() {
    const raw = $("#townInput").val().trim();

    // Clean the input: lowercase, and drop a trailing ", IL" or "Illinois"
    // so "Galesburg, IL" still matches "galesburg".
    const town = raw.toLowerCase().replace(/,?\s*(il|illinois)\.?$/, "").trim();

    const $out = $("#townResult").removeClass("ok no");   // clear old green/red

    if (!town) {                                          // empty box
      $out.text("Type a town first.").addClass("no");
      return;
    }

    // Capitalize each word for a nicer message: "east galesburg" -> "East Galesburg"
    const name = town.replace(/\b\w/g, c => c.toUpperCase());

    if (TOWNS.includes(town)) {
      $out.text(`Yes, we serve ${name}! Call or text for an estimate.`).addClass("ok");
    } else {
      $out.text(`${name} may be outside our usual area, but we cover about an hour from Oneida. Give us a call and we'll let you know.`).addClass("no");
    }
  }

  // Run the check on a button click OR when Enter is pressed in the box.
  $("#townCheck").on("click", checkTown);
  $("#townInput").on("keydown", function (e) {
    if (e.key === "Enter") checkTown();
  });
});
