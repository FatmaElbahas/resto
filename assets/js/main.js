
$(".open-menu").on("click", function () {
  $("#sidebar").addClass("show");
  $("#content").addClass("shifted");
  $(".open-menu").addClass("d-none");
  $(".close-menu").removeClass("d-none");

  // reset الحالة الأول
  $("#sidebar .nav-tab a").removeClass("show");

  // التأثير بالتدريج من أول عنصر لآخر عنصر
  $("#sidebar .nav-tab a").each(function (index) {
    $(this)
      .delay(index * 150)
      .queue(function (next) {
        $(this).addClass("show");
        next();
      });
  });
});

$(".close-menu").on("click", function () {
  $("#sidebar").removeClass("show");
  $("#content").removeClass("shifted");
  $(".open-menu").removeClass("d-none");
  $(".close-menu").addClass("d-none");

  // إزالة الكلاس show بدون انيميشن
  $("#sidebar .nav-tab a").removeClass("show");
});

$("a").on("click",function (e) {
    if ($(this).attr("href") === "#") {
      e.preventDefault();
    }
    $("#sidebar").removeClass("show");
    $("#content").removeClass("shifted");
    $(".open-menu").removeClass("d-none");
    $(".close-menu").addClass("d-none");
    $("#sidebar .nav-tab a").removeClass("show");
  });
// 
