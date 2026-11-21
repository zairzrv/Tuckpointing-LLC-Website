/*
   work.js: Our work page (work.html)
   Use case: filter the gallery by job type
   Use case: click a photo to zoom in (Bootstrap model)
   Use case: before / after comparison slider */
$(function () {

  /* Use case: filter 
     Every filter button has data-filter="chimney" (or "all"),
     every photo has data-cat="chimney". Show the ones that match. */
  $(".filter").on("click", function () {
    const cat = $(this).data("filter");

    $(".filter").removeClass("on");     // un-highlight all buttons
    $(this).addClass("on");             // highlight the clicked one

    $(".shot").each(function () {
      const match = cat === "all" || $(this).data("cat") === cat;
      if (match) {
        $(this).fadeIn(250);
      } else {
        $(this).fadeOut(200);
      }
    });
  });

  /* Use case: zoom
     One shared modal (#zoomModal). On click we copy the clicked
     photo's src and alt text into it, then open it. */
  const zoom = new bootstrap.Modal("#zoomModal");

  $(".shot").on("click", function () {
    const img = $(this).find("img");
    $("#zoomImg").attr({ src: img.attr("src"), alt: img.attr("alt") });
    $("#zoomTitle").text(img.attr("alt"));
    zoom.show();
  });

  /* Use case: before / after slider
     Two pictures are stacked exactly on top of each other.
     The "after" picture is clipped so only its left v% shows,
     and the range input (0 to 100) sets v. */
  $("#beforeImg").attr("src", wallSvg(PALETTE.brick, true));    // worn wall
  $("#afterImg").attr("src", wallSvg(PALETTE.brick, false));    // fixed wall

  function setCompare(v) {
    // inset(top right bottom left): hide (100 - v)% from the right side
    $("#afterImg").css("clip-path", `inset(0 ${100 - v}% 0 0)`);
    $("#divider").css("left", v + "%");
  }

  $("#compareRange").on("input", function () {
    setCompare(this.value);       // "input" fires continuously while dragging
  });
  setCompare(50);                 // start in the middle
});
