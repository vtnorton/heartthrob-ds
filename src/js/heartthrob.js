$(document).ready(function () {
    $.fn.clickToggle = function (func1, func2) {
        var funcs = [func1, func2];
        this.data('toggleclicked', 0);
        this.click(function () {
            var data = $(this).data();
            var tc = data.toggleclicked;
            $.proxy(funcs[tc], this)();
            data.toggleclicked = (tc + 1) % 2;
        });
        return this;
    };


    $(".box-user").clickToggle(function () {
        $(".box-user ul").css("display", "block")
    }, function () {
        $(".box-user ul").css("display", "none")
    });

    $("#hamburguerMenu").clickToggle(function () {
        $(".nav-navigation-list ul li a").css("color", "transparent");
        $(".nav-navigation-list ul li a").css("overflow", "hidden");
        $(".nav-navigation-list ul li a i").css("color", "#fff");
        $(".nav-container").animate({ "width": "65px" }, 400, function () {
            $("content").css({ "width": "calc(100% - 65px)" });
        });
    }, function () {
        $(".nav-container").animate({ "width": "240px" }, 400, function () {
            $(".nav-navigation-list ul li a").css("color", "#fff");
            $(".nav-navigation-list ul li a").css("overflow", "auto");
        });
        $("content").css({ "width": "calc(100% - 240px)" });
    });

    var boxheight = $(".box").height() / 2;
    $(".box").css("margin-top", "calc(25% - " + boxheight + "px)");

    var altura = $(window).height() - 48;
    $(".nav-pane").css("height", altura + "px");
    NProgress.start();
    NProgress.done();

    $("content").niceScroll({
        cursorcolor: "#52658C",
        cursorwidth: "12px",
        cursorborder: "0px solid #000",
        scrollspeed: 60,
        autohidemode: false,
        background: '#ddd',
        hidecursordelay: 400,
        cursorfixedheight: false,
        cursorminheight: 20,
        enablekeyboard: true,
        horizrailenabled: true,
        bouncescroll: false,
        smoothscroll: true,
        iframeautoresize: true,
        touchbehavior: false,
        zindex: 99,
        cursorborderradius: "0px"
    });

    $(".nav-navigation-list ul li ul").niceScroll({
        cursorcolor: "#52658C",
        cursorwidth: "12px",
        cursorborder: "0px solid #000",
        scrollspeed: 60,
        autohidemode: false,
        background: '#404040',
        hidecursordelay: 400,
        cursorfixedheight: false,
        cursorminheight: 20,
        enablekeyboard: true,
        horizrailenabled: true,
        bouncescroll: false,
        smoothscroll: true,
        iframeautoresize: true,
        touchbehavior: false,
        zindex: 9,
        cursorborderradius: "0px"
    });
});

$("content").mouseover(function () {
    $("content").getNiceScroll().resize();
});

function openMenu(menuparaabrir, mensageiro) {
    $(menuparaabrir).slideToggle("normal", function () {
        if ($(mensageiro).css("font-weight") == "600") {
            $(mensageiro).css("font-weight", "300");
            //$(mensageiro + " .menu-drop").css("background-position-x", "-84px !important");
        } else {
            $(mensageiro).css("font-weight", "600");
            //$(mensageiro + " .menu-drop").css("background-position-x", "-56px !important");
        }
    });
    //TODO: mudar o ícone para seta para cima
};

function backStep(destino, mensageiro) {
    $(mensageiro).removeClass("view-opened");
    $(mensageiro).addClass("view-alarm");
    $(mensageiro).addClass("view-closed", 1000);

    $(destino).removeClass("view-closed", 1000);
    $(destino).addClass("view-opened");
}

function nextStep(destino, mensageiro) {
    $(mensageiro).addClass("view-passed");
    $(mensageiro).removeClass("view-opened");
    $(mensageiro).addClass("view-closed", 1000);

    $(destino).removeClass("view-closed", 1000);
    $(destino).addClass("view-opened");
}