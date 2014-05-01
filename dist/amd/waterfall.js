(function() {
  define(['./ops', './linear', './rectangle'], function(O, Linear, Rectangle) {
    return function(_arg) {
      var M, absolute, accessor, bar_width, bottom, compute, curves, d, data, data_, gutter, height, high, i, last, left, line, low, m, max, min, n, right, scale, top, value, width, _i, _j, _len, _len1, _ref, _ref1;
      data = _arg.data, accessor = _arg.accessor, width = _arg.width, height = _arg.height, gutter = _arg.gutter, compute = _arg.compute, min = _arg.min, max = _arg.max;
      if (accessor == null) {
        accessor = function(x) {
          return x;
        };
      }
      if (gutter == null) {
        gutter = 0;
      }
      if (min == null) {
        min = 0;
      }
      if (max == null) {
        max = 0;
      }
      last = 0;
      data_ = [];
      for (_i = 0, _len = data.length; _i < _len; _i++) {
        d = data[_i];
        _ref = accessor(d), value = _ref.value, absolute = _ref.absolute;
        _ref1 = absolute ? [0, value || last] : [last, last + value], low = _ref1[0], high = _ref1[1];
        m = Math.min(low, high);
        M = Math.max(low, high);
        min = Math.min(min, m);
        max = Math.max(max, M);
        last = high;
        data_.push({
          item: d,
          low: low,
          high: high
        });
      }
      n = data_.length;
      bar_width = (width - gutter * (n - 1)) / n;
      curves = [];
      scale = Linear([min, max], [height, 0]);
      for (i = _j = 0, _len1 = data_.length; _j < _len1; i = ++_j) {
        d = data_[i];
        left = i * (bar_width + gutter);
        right = left + bar_width;
        bottom = scale(d.low);
        top = scale(d.high);
        line = Rectangle({
          left: left,
          right: right,
          bottom: bottom,
          top: top
        });
        curves.push(O.enhance(compute, {
          item: d.item,
          line: line,
          index: i
        }));
      }
      return {
        curves: curves,
        scale: scale
      };
    };
  });

}).call(this);
