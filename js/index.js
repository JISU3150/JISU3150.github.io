$(document).ready(function () {
  // $("html, body").animate({ scrollTop: 0 }, "slow");
  /*profile, view버튼 클릭시 profile_wrap 펼쳐지는 효과*/
  $(".profile").click(function () {
    $("#profile_wrap").css({ position: "fixed" });
    $("#profile_wrap")
      .stop()
      .animate({ width: "100%", opacity: "1" }, 500, function () {
        $(this).children(".tab_wrap").addClass("on");
      });
    $(".tab_wrap>ul>li").removeClass("on");
    $(".tab_wrap>ul>li:nth-of-type(1)").addClass("on");
    $(".tab").removeClass("on");
    $(".tab").eq(0).addClass("on");
  });

  $(".view").click(function () {
    $("#profile_wrap").css({ position: "fixed" });
    $("#profile_wrap")
      .stop()
      .animate({ width: "100%", opacity: "1" }, 500, function () {
        $(this).children(".tab_wrap").addClass("on");
      });
    $(".tab_wrap>ul>li").removeClass("on");
    $(".tab_wrap>ul>li:nth-of-type(1)").addClass("on");
    $(".tab").removeClass("on");
    $(".tab").eq(0).addClass("on");
  });

  $(".close").click(function () {
    $("#profile_wrap")
      .stop()
      .animate({ width: "0%", opacity: "0" }, 500, function () {
        $(this).children(".tab_wrap").removeClass("on");
      });
  });

  /*profile tab key*/
  $(".tab_wrap>ul>li").click(function () {
    let i = $(this).index();
    $(".tab_wrap>ul>li").removeClass("on");
    $(this).addClass("on");
    $(".tab").removeClass("on");
    $(".tab").eq(i).addClass("on");
  });

  /*profile_wrap icon 자동으로 넘어가기*/
  let a = 0;
  let icon = $(".icon_wrap>img").length;
  // console.log(icon);
  setInterval(function () {
    if (a >= icon - 1) {
      a = 0;
    } else {
      a++;
    }
    $(".icon_wrap>img").fadeOut();
    $(".icon_wrap>img").eq(a).fadeIn();
  }, 2000);

  /*scroll*/
  let con1 = $("#con1").offset().top;
  let con2 = $("#con2").offset().top;
  let con3 = $("#con3").offset().top;
  let con4 = $("#con4").offset().top;
  // console.log(con1);
  $(window).scroll(function () {});

  /*uxui project 위로 자동슬라이드*/
  let b = 0;
  let ux = $(".ux_slide_img>li").length;
  let hei = 100;
  setInterval(function () {
    b++;
    if (b == ux - 1) {
      $(".ux_slide_img")
        .stop()
        .animate({ top: "-400%" }, function () {
          $(".ux_slide_img").css({ top: 0 });
        });
      b = 0;
    } else {
      $(".ux_slide_img")
        .stop()
        .animate({ top: -b * hei + "%" });
    }
  }, 4000);

  /*con3 slide effect*/
  let c = 0;
  let con3_slide = $(".redesign_text").length;
  let redesign;
  $(".redesign_text").eq(0).addClass("on");
  $(".con3_right_content").eq(0).fadeIn(0);
  restart();
  function restart() {
    redesign = setInterval(function () {
      // console.log(con3_slide);
      c++;
      if (c >= con3_slide) {
        c = 0;
      }
      $(".redesign_text").removeClass("on");
      $(".redesign_text").eq(c).addClass("on");
      $(".con3_right_content").fadeOut(0);
      $(".con3_right_content").eq(c).fadeIn(0);
    }, 5000);
  }

  /*con3 다음 버튼 누를 때*/
  $(".right_a").click(function () {
    clearInterval(redesign);
    c++;
    if (c >= con3_slide) {
      c = 0;
    }
    $(".redesign_text").removeClass("on");
    $(".redesign_text").eq(c).addClass("on");
    $(".con3_right_content").fadeOut();
    $(".con3_right_content").eq(c).fadeIn();

    restart();
  });

  /*con3 이전 버튼 누를 때*/
  $(".left_a").click(function () {
    clearInterval(redesign);
    c--;
    if (c < 0) {
      c = 3;
    }
    $(".redesign_text").removeClass("on");
    $(".redesign_text").eq(c).addClass("on");
    $(".con3_right_content").fadeOut();
    $(".con3_right_content").eq(c).fadeIn();

    restart();
  });

  /*con4 모달박스*/
  let i = 0;
  $(".poster_img li").click(function () {
    $(this).index();
    $(".modal").eq($(this).index()).addClass("on");
  });
  $(".x").click(function () {
    $(".modal").removeClass("on");
  });

  /*con4 가로 슬라이드*/
  let num = 0;
  $(".design_top").on("mousewheel", function (event, delta) {
    // console.log(delta);
    event.preventDefault();
    if (delta < 0) {
      //delta : -1
      if (num < 4) {
        num++;
        $(".poster_img")
          .stop()
          .animate({ left: -10 * num + "%" });
      }
    } else if (delta > 0) {
      //delta : 1
      if (num > 0) {
        num--;
        $(".poster_img")
          .stop()
          .animate({ left: 6.5 * num + "%" }, function () {});
        console.log(moveTop);
      }
      // return;
    }
  });
});

/*스크롤 화면전환*/
window.onload = function () {
  var elm = ".con";
  $(elm).each(function (index) {
    // 개별적으로 Wheel 이벤트 적용
    $(this).on("mousewheel DOMMouseScroll", function (e) {
      e.preventDefault();
      var delta = 0;
      if (!event) event = window.event;
      if (event.wheelDelta) {
        delta = event.wheelDelta / 120;
        if (window.opera) delta = -delta;
      } else if (event.detail) delta = -event.detail / 3;
      var moveTop = $(window).scrollTop();
      var elmSelecter = $(elm).eq(index);
      // 마우스휠을 위에서 아래로
      if (delta < 0) {
        if ($(elmSelecter).next() != undefined) {
          try {
            moveTop = $(elmSelecter).next().offset().top;
          } catch (e) {}
        }
        // 마우스휠을 아래에서 위로
      } else {
        if ($(elmSelecter).prev() != undefined) {
          try {
            moveTop = $(elmSelecter).prev().offset().top;
          } catch (e) {}
        }
      }

      // 화면 이동 0.8초(800)
      $("html,body")
        .stop()
        .animate(
          {
            scrollTop: moveTop + "px",
          },
          {
            duration: 800,
            complete: function () {},
          }
        );
    });
  });
};
