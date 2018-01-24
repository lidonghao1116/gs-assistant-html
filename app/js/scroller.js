$.fn.scroller = function (cardTop) {
    var _this = this,
        child = _this.children();
    var childh = child.outerHeight(),
        _thish = _this.innerHeight();
    var scale = 1;

    if (_this.children('.track').length) {
        child.css('top', 0);
        _this.children('.track').remove();
    }
    if (childh > _thish) {
        _this.append('<div class=\"track\"><span class=\"track-btn\"></span></div>');

    } else {
        _this.children('.track').remove();
        return _this;
    }
    var track = _this.children('.track'),
        track_btn = track.children();
    track_btn.height(Math.max(Math.round(track.height() * _thish / childh), 40));
    var maxh = track.height() - track_btn.height();
    // 新加代码nana
    //初始化之后滚动定位
    if (childh > _thish) {
        var scale = cardTop/(childh - _thish);
        var newtop = scale*maxh;
        scrollbar(newtop);
    }
    
    _this.on('DOMMouseScroll', wheel);
    _this.on('mousewheel', wheel);

    track_btn.on('mousedown', function (e) {
        var starty = e.pageY - $(this).position().top;

        $(document).on('mousemove.scroller', function (e) {
            e.preventDefault();
            var endy = e.pageY - starty;
            scrollbar(endy);
        });

        $(document).on('mouseup.scroller', function () {
            $(document).off('.scroller');
        });
    });

    $(window).on('resize.scroller', function () {
        _thish = _this.innerHeight();
        track_btn.height(Math.max(Math.round(track.height() * _thish / childh), 40));
        maxh = track.height() - track_btn.height();
        scrollbar(scale * maxh);
    });

    function wheel(e) {
        e.preventDefault();
        var e = e.originalEvent;
        var bool = e.wheelDelta ? e.wheelDelta > 0 : e.detail < 0;
        if (bool) {
            scrollbar(track_btn.position().top - 10);
        } else {
            scrollbar(track_btn.position().top + 10);
        }
    }

    function scrollbar(newtop) {
        newtop = newtop > maxh ? maxh : (newtop < 0 ? 0 : newtop);
        scale = newtop / maxh;
        track_btn.css('top', newtop);
        child.css('top', scale * (_thish - childh));
    }

    return _this;
}