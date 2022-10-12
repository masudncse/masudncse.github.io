(function ($) {
  ("use strict");

  // MAGNIFIC POPUP
  $(".image-link").magnificPopup({ type: "image" });

  // LINE PROGRESS BAR
  enableLineProgress();

  // RADIAL PROGRESS BAR
  enableRadialProgress();

  // ACCORDIAN
  panelAccordian();

  $('a[href="#"]').on("click", function (event) {
    return;
  });

  setTimeout(function () {
    $(".navigation-section").css("display", "flex");
  }, 500);

  $(".toggleBtn").on("click", function (event) {
    $(".navigation-section").toggleClass("toggleClass");
  });

  // Add smooth scrolling to all links
  $(".nav-link").on("click", function (event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top,
        },
        800,
        function () {
          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        }
      );
    } // End if
  });

  if ($.isFunction($.fn.fluidbox)) {
    $("a").fluidbox();
  }

  var countCounterUp = 0;

  var a = 0;

  countCounterUp = enableCounterUp(countCounterUp);

  $(window).on("scroll", function () {
    countCounterUp = enableCounterUp(countCounterUp);
  });
})(jQuery);

function panelAccordian() {
  var panelTitle = $(".panel-title");
  panelTitle.on("click", function () {
    $(".panel-title").removeClass("active");
    $(this).toggleClass("active");
  });
}

function enableRadialProgress() {
  $(".radial-progress").each(function () {
    var $this = $(this),
      progPercent = $this.data("prog-percent");

    var bar = new ProgressBar.Circle(this, {
      color: "#aaa",
      strokeWidth: 3,
      trailWidth: 1,
      easing: "easeInOut",
      duration: 1400,
      text: {},
      from: { color: "#aaa", width: 1 },
      to: { color: "#FEAE01", width: 3 },
      // Set default step function for all animate calls
      step: function (state, circle) {
        circle.path.setAttribute("stroke", state.color);
        circle.path.setAttribute("stroke-width", state.width);

        var value = Math.round(circle.value() * 100);
        if (value === 0) {
          circle.setText("");
        } else {
          circle.setText(value);
        }
      },
    });

    $(this).waypoint(
      function () {
        bar.animate(progPercent);
      },
      { offset: "90%" }
    );
  });
}

function enableLineProgress() {
  $(".line-progress").each(function () {
    var $this = $(this),
      progPercent = $this.data("prog-percent");

    var bar = new ProgressBar.Line(this, {
      strokeWidth: 1,
      easing: "easeInOut",
      duration: 1400,
      color: "#FEAE01",
      trailColor: "#eee",
      trailWidth: 1,
      svgStyle: { width: "100%", height: "100%" },
      text: {
        style: {},
      },
      from: { color: "#FFEA82" },
      to: { color: "#ED6A5A" },
      step: (state, bar) => {
        bar.setText(Math.round(bar.value() * 100) + " %");
      },
    });

    $(this).waypoint(
      function () {
        bar.animate(progPercent);
      },
      { offset: "90%" }
    );
  });
}

function enableCounterUp(a) {
  var counterElement;

  if (isExists("#counter")) {
    counterElement = $("#counter");
  } else {
    return;
  }

  var oTop = $("#counter").offset().top - window.innerHeight;
  if (a == 0 && $(window).scrollTop() > oTop) {
    $(".counter-value").each(function () {
      var $this = $(this),
        countDuration = $this.data("duration"),
        countTo = $this.attr("data-count");
      $({
        countNum: $this.text(),
      }).animate(
        {
          countNum: countTo,
        },
        {
          duration: countDuration,
          easing: "swing",
          step: function () {
            $this.text(Math.floor(this.countNum));
          },
          complete: function () {
            $this.text(this.countNum);
          },
        }
      );
    });
    a = 1;
  }

  return a;
}

function isExists(elem) {
  if ($(elem).length > 0) {
    return true;
  }
  return false;
}

// filter
$(function () {
  $(".portfolioFilter > a").on("click", function (e) {
    e.preventDefault();
    $("#portfolio .p-item").hide();
    $($(this).first().data("filter")).each(function () {
      $(this).slideDown();
    });
  });
});

// load more
$(function () {
  $("#portfolio .p-item").slice(0, 48).show();
  $("#loadMore").on("click", function (e) {
    e.preventDefault();
    $("#portfolio .p-item:hidden").slice(0, 3).slideDown();
    if ($("#portfolio .p-item:hidden").length == 0) {
      $("#loadMoreContainer").fadeOut("slow");
    }
    $("html,body").animate(
      {
        scrollTop: $(this).offset().top - 220,
      },
      1500
    );
  });
});
