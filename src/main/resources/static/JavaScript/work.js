/*
   work.js: Our work page (work.html)
   Use case: filter the gallery by job type
   Use case: click a photo to zoom in (Bootstrap model)*/
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

   $("#gallery").on("click", ".shot", function () {
    const img = $(this).find("img");
    $("#zoomImg").attr({ src: img.attr("src"), alt: img.attr("alt") });
    $("#zoomTitle").text(img.attr("alt"));
    zoom.show();
  });
  
  /* Use case: load the gallery from the database.
      If there are no projects yet, keep the placeholder tiles from work.html. */
   $.getJSON("/api/projects", function (projects) {
     if (projects.length === 0) return;

     const $gallery = $("#gallery").empty();
     projects.forEach(function (p) {
       // Build each tile with .attr() and .text() instead of pasting
       // HTML strings, so a title can never break the page.
       const $img = $("<img>").attr({ src: p.imagePath, alt: p.title });
       const $label = $("<span>").text(p.title);
       $("<button>")
         .addClass("shot")
         .attr({ type: "button", "data-cat": p.category })
         .append($img, $label)
         .appendTo($gallery);
     });
   });
});
