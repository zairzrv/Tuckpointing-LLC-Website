/* 
   contact.js: Contact page (contact.html)
   Use case: estimate request form with validation */
$(function () {

  /*Use case: estimate form*/

  // Show how many photos were picked.
  $("#fPhotos").on("change", function () {
    const n = this.files.length;
    $("#photoCount").text(n ? `${n} photo${n > 1 ? "s" : ""} selected` : "");
  });

  $("#estimateForm").on("submit", function (e) {
    e.preventDefault();          // stop the browser from reloading the page
    let ok = true;

    // need(field, rule): run the rule on the field's value.
    // Bootstrap's "is-invalid" class turns the box red and shows
    // the .invalid-feedback message right under it.
    function need(selector, rule) {
      const good = rule($(selector).val().trim());
      $(selector).toggleClass("is-invalid", !good);
      if (!good) ok = false;
    }

    need("#fName",  v => v.length > 0);
    need("#fPhone", v => v.replace(/\D/g, "").length === 10);  // keep digits only, need 10
    need("#fTown",  v => v.length > 0);
    need("#fArea",  v => v.length > 0);

    if (!ok) {
      $(this).find(".is-invalid").first().focus();   // jump to the first problem
      return;
    }

    // Everything is valid: show a personal thank-you built from their answers.
    const pref = $("input[name=pref]:checked").val();
    $("#doneName").text($("#fName").val().trim());
    $("#doneSummary").text(
      `We'll ${pref === "text" ? "text" : "call"} you at ${$("#fPhone").val().trim()} ` +
      `about your ${$("#fArea").val().toLowerCase()} in ${$("#fTown").val().trim()}.`
    );
    $(this).slideUp(200);
    $("#estimateDone").prop("hidden", false).hide().slideDown(200);
  });

  // As soon as the user fixes a field, remove its red error.
  $("#estimateForm .form-control, #estimateForm .form-select").on("input change", function () {
    $(this).removeClass("is-invalid");
  });

  // "Send another": clear the form and swap the panels back.
  $("#estimateAgain").on("click", function () {
    $("#estimateForm")[0].reset();
    $("#photoCount").text("");
    $("#estimateDone").slideUp(200);
    $("#estimateForm").slideDown(200);
  });

  if (location.hash === "#estimate") {
    document.getElementById("estimate").scrollIntoView();
  }
});
