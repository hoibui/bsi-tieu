// Menu di động: từ 991px trở xuống hiện nút ☰ mở ngăn menu (kèm ô tìm kiếm).
// Dựng từ chính menu ở đầu trang (#nav) nên luôn đồng bộ với menu desktop.
(function () {
    var bar = document.querySelector('.menu .menu__inner');
    var nav = document.querySelector('.menu #nav');
    if (!bar || !nav) return;

    var css = '' +
        '.mm2-toggle{display:none;width:44px;height:44px;border:0;border-radius:8px;background:#e0457b;cursor:pointer;padding:0;position:relative}' +
        '.mm2-toggle span,.mm2-toggle:before,.mm2-toggle:after{content:"";position:absolute;left:11px;right:11px;height:3px;border-radius:2px;background:#fff}' +
        '.mm2-toggle:before{top:14px}.mm2-toggle span{top:20px}.mm2-toggle:after{top:26px}' +
        '.mm2-overlay{position:fixed;inset:0;z-index:100001;background:rgba(0,0,0,.5);opacity:0;visibility:hidden;transition:opacity .25s}' +
        '.mm2-drawer{position:fixed;top:0;right:0;bottom:0;z-index:100002;width:min(86vw,340px);background:#fff;overflow-y:auto;' +
        'transform:translateX(100%);transition:transform .25s;padding:14px 18px 28px;box-shadow:-8px 0 30px rgba(0,0,0,.25)}' +
        '.mm2-open .mm2-overlay{opacity:1;visibility:visible}.mm2-open .mm2-drawer{transform:none}' +
        '.mm2-open{overflow:hidden}' +
        '.mm2-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}' +
        '.mm2-head strong{font-size:18px;color:#e0457b}' +
        '.mm2-close{border:0;background:none;font-size:32px;line-height:1;cursor:pointer;color:#555;padding:4px 8px}' +
        '.mm2-search{display:flex;gap:8px;margin-bottom:14px}' +
        '.mm2-search input{flex:1;min-width:0;padding:11px 12px;border:1px solid #ccc;border-radius:6px;font:inherit}' +
        '.mm2-search button{border:0;border-radius:6px;background:#e0457b;color:#fff;padding:0 16px;font-weight:600;cursor:pointer}' +
        '.mm2-drawer ul{list-style:none;margin:0;padding:0}' +
        '.mm2-drawer li a{display:block;padding:14px 4px;font-weight:600;color:#222;border-bottom:1px solid #eee;text-decoration:none}' +
        '.mm2-drawer li a.mm2-active{color:#e0457b}' +
        '.mm2-drawer li ul{padding-left:14px}.mm2-drawer li ul a{font-weight:400;font-size:15px;padding:11px 4px}' +
        '@media (max-width:991px){' +
        '.menu .menu--right{display:none!important}' +
        '.mm2-toggle{display:block}}' +
        '@media (min-width:992px){.mm2-overlay,.mm2-drawer{display:none}}';
    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    // Nút ☰ đặt cạnh logo
    var toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'mm2-toggle';
    toggle.setAttribute('aria-label', 'Mở menu');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.innerHTML = '<span></span>';
    bar.appendChild(toggle);

    // Ngăn menu: sao chép các liên kết từ #nav
    var clone = nav.querySelector('ul').cloneNode(true);
    clone.removeAttribute('class');
    clone.querySelectorAll('ul').forEach(function (u) { u.removeAttribute('class'); });
    clone.querySelectorAll('a').forEach(function (a) {
        a.removeAttribute('class');
        if (a.querySelector('i.fa-home')) { a.textContent = 'Trang chủ'; a.setAttribute('href', './'); }
        if (a.getAttribute('href') === '' && !a.textContent.trim()) a.textContent = 'Trang chủ';
        var here = location.pathname.replace(/^\/|\.html$/g, '').replace(/\/$/, '');
        var target = (a.getAttribute('href') || '').replace(/^\.\//, '').replace(/\.html$/, '');
        if (target && target === here) a.className = 'mm2-active';
    });

    var overlay = document.createElement('div');
    overlay.className = 'mm2-overlay';
    var drawer = document.createElement('div');
    drawer.className = 'mm2-drawer';
    drawer.setAttribute('role', 'dialog');
    drawer.setAttribute('aria-label', 'Menu');
    drawer.innerHTML =
        '<div class="mm2-head"><strong>Menu</strong><button type="button" class="mm2-close" aria-label="Đóng menu">&times;</button></div>' +
        '<form class="mm2-search"><input type="search" name="keyword" placeholder="Tìm kiếm..." aria-label="Tìm kiếm"><button type="submit">Tìm</button></form>';
    drawer.appendChild(clone);
    document.body.appendChild(overlay);
    document.body.appendChild(drawer);

    function setOpen(open) {
        document.documentElement.classList.toggle('mm2-open', open);
        toggle.setAttribute('aria-expanded', String(open));
        if (!open) toggle.focus();
    }
    toggle.addEventListener('click', function () { setOpen(true); });
    overlay.addEventListener('click', function () { setOpen(false); });
    drawer.querySelector('.mm2-close').addEventListener('click', function () { setOpen(false); });
    drawer.addEventListener('click', function (e) { if (e.target.closest('a')) document.documentElement.classList.remove('mm2-open'); });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && document.documentElement.classList.contains('mm2-open')) setOpen(false);
    });
    drawer.querySelector('form').addEventListener('submit', function (e) {
        e.preventDefault();
        var k = this.keyword.value.trim();
        if (k) location.href = 'tim-kiem?keyword=' + encodeURIComponent(k);
    });
    window.addEventListener('resize', function () {
        if (window.innerWidth > 991) document.documentElement.classList.remove('mm2-open');
    });
})();
