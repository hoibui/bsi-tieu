// Tìm kiếm phía trình duyệt cho /tim-kiem?keyword=...
// Dữ liệu: search-index.json (do scripts/build.mjs tạo khi deploy). Không phân biệt dấu/hoa thường.
(function () {
    var box = document.getElementById('search-results');
    if (!box) return;

    function norm(s) {
        return String(s).toLowerCase().replace(/đ/g, 'd').normalize('NFD').replace(/[̀-ͯ]/g, '');
    }
    function esc(s) {
        return String(s).replace(/[&<>"']/g, function (c) {
            return {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c];
        });
    }
    function message(text, cls) {
        box.innerHTML = '<div class="alert ' + (cls || 'alert-warning') + ' w-100" role="alert"><strong>' + esc(text) + '</strong></div>';
    }

    var keyword = (new URLSearchParams(location.search).get('keyword') || '').trim();
    var input = document.getElementById('keyword');
    if (input) input.value = keyword;
    if (!keyword) { message('Chưa nhập từ khóa tìm kiếm'); return; }

    var tokens = norm(keyword).split(/\s+/).filter(Boolean);

    // Đoạn trích quanh vị trí khớp đầu tiên (so khớp trên bản đã bỏ dấu, độ dài giữ nguyên nhờ map từng ký tự)
    function snippet(text) {
        var flat = Array.prototype.map.call(text, function (ch) {
            var n = norm(ch);
            return n.length === 1 ? n : ch.toLowerCase();
        }).join('');
        var pos = -1;
        for (var i = 0; i < tokens.length && pos < 0; i++) pos = flat.indexOf(tokens[i]);
        var start = Math.max(0, pos - 60);
        var part = text.slice(start, start + 220);
        return (start > 0 ? '… ' : '') + part + (start + 220 < text.length ? ' …' : '');
    }

    fetch('search-index.json').then(function (r) {
        if (!r.ok) throw new Error('index');
        return r.json();
    }).then(function (items) {
        var results = items.map(function (it) {
            var title = norm(it.title), text = norm(it.text), score = 0;
            for (var i = 0; i < tokens.length; i++) {
                var inTitle = title.indexOf(tokens[i]) >= 0, inText = text.indexOf(tokens[i]) >= 0;
                if (!inTitle && !inText) return null; // mọi từ khóa đều phải xuất hiện
                score += (inTitle ? 5 : 0) + (inText ? 1 : 0);
            }
            return {it: it, score: score};
        }).filter(Boolean).sort(function (a, b) { return b.score - a.score; });

        if (!results.length) { message('Không tìm thấy kết quả'); return; }
        box.innerHTML = '<div class="w-100">' + results.map(function (r) {
            return '<div class="search-result"><a class="text-decoration-none" href="' + esc(r.it.url) + '">' + esc(r.it.title) +
                '</a><p>' + esc(snippet(r.it.text)) + '</p></div>';
        }).join('') + '</div>';
    }).catch(function () {
        message('Không tải được dữ liệu tìm kiếm, vui lòng thử lại sau.');
    });
})();
