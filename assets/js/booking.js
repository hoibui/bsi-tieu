// Đặt lịch hẹn: gửi form tới Google Apps Script (xem docs/booking-apps-script.gs)
// - Trang /lich-kham: form có sẵn (#booking-form).
// - Mọi trang: bấm nút "Đặt lịch hẹn" sẽ mở popup có cùng form. Nếu JS lỗi, nút vẫn mở Zalo như cũ.
var BOOKING_ENDPOINT = 'https://script.google.com/macros/s/AKfycbwJOJjgfCpyZno-SKszlcJG0Ixd2bTPX4d-8_kC4A4jhVZLVeY1v55UDy1Rl51Czumg/exec';

$(function () {
    function todayStr() {
        var d = new Date();
        return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
    }

    // Gắn xử lý gửi cho một form đặt lịch; onDone() chạy sau khi gửi thành công.
    function bindForm($form, onDone) {
        $form.find('input[name=date]').attr('min', todayStr());
        $form.on('submit', function (e) {
            e.preventDefault();
            var f = this.elements;
            var name = $.trim(f.name.value), phone = $.trim(f.phone.value);

            if (!name || !phone || !f.date.value || !f.time.value) {
                showNotify('Vui lòng điền đầy đủ các mục có dấu *', 'Thiếu thông tin', 'warning');
                return;
            }
            if (!/^(0|\+84)\d{9,10}$/.test(phone.replace(/[\s.-]/g, ''))) {
                showNotify('Số điện thoại không hợp lệ', 'Lỗi', 'error');
                return;
            }
            if (f.website.value) return; // bot
            if (!BOOKING_ENDPOINT) {
                showNotify('Chức năng đặt lịch chưa được cấu hình', 'Lỗi', 'error');
                return;
            }

            var form = this;
            var $btn = $form.find('.booking-submit').prop('disabled', true).text('Đang gửi...');
            // Content-Type text/plain tránh preflight CORS với Apps Script
            fetch(BOOKING_ENDPOINT, {
                method: 'POST',
                headers: {'Content-Type': 'text/plain;charset=utf-8'},
                body: JSON.stringify({
                    name: name, phone: phone, date: f.date.value, time: f.time.value,
                    service: f.service.value, note: $.trim(f.note.value)
                })
            }).then(function (r) { return r.json(); }).then(function (res) {
                if (!res.ok) throw new Error(res.error || 'error');
                showNotify('Phòng khám sẽ liên hệ xác nhận sớm nhất.', 'Đặt lịch thành công', 'success');
                form.reset();
                if (onDone) onDone();
            }).catch(function () {
                showNotify('Gửi không thành công, vui lòng thử lại hoặc gọi trực tiếp phòng khám.', 'Lỗi', 'error');
            }).then(function () {
                $btn.prop('disabled', false).text('Đặt lịch hẹn');
            });
        });
    }

    // Form có sẵn ở trang /lich-kham
    var $pageForm = $('#booking-form');
    if ($pageForm.length) bindForm($pageForm);

    // ---- Popup ----
    var css = '.bk-overlay{position:fixed;inset:0;z-index:100000;display:none;align-items:center;justify-content:center;' +
        'background:rgba(0,0,0,.55);padding:16px;overflow-y:auto}' +
        '.bk-overlay.open{display:flex}' +
        '.bk-modal{position:relative;background:#fff;border-radius:10px;width:100%;max-width:520px;max-height:100%;' +
        'overflow-y:auto;padding:24px 24px 20px;box-shadow:0 10px 40px rgba(0,0,0,.3)}' +
        '.bk-modal h3{margin:0 0 6px;font-size:22px;text-align:center}' +
        '.bk-close{position:absolute;top:8px;right:12px;border:0;background:none;font-size:28px;line-height:1;cursor:pointer;color:#666}' +
        '.bk-modal .booking-form{max-width:none;margin:0}' +
        '.booking-row{margin-bottom:14px}.booking-row label{display:block;font-weight:600;margin-bottom:4px}' +
        '.booking-row input,.booking-row select,.booking-row textarea{width:100%;padding:10px 12px;border:1px solid #ccc;border-radius:6px;font:inherit}' +
        '.booking-submit{padding:12px 28px;border:0;border-radius:6px;background:#e0457b;color:#fff;font-weight:600;cursor:pointer}' +
        '.booking-submit:disabled{opacity:.6;cursor:wait}';
    $('head').append($('<style>').text(css));

    var html =
        '<div class="bk-overlay" id="bk-overlay" role="dialog" aria-modal="true" aria-labelledby="bk-title">' +
        '<div class="bk-modal">' +
        '<button type="button" class="bk-close" aria-label="Đóng">&times;</button>' +
        '<h3 id="bk-title">Đặt lịch hẹn</h3>' +
        '<form id="bk-popup-form" class="booking-form" novalidate>' +
        '<p class="booking-note">Vui lòng điền thông tin, phòng khám sẽ liên hệ xác nhận lịch hẹn với bạn.</p>' +
        '<div class="booking-row"><label for="bkp-name">Họ và tên *</label><input type="text" id="bkp-name" name="name" required maxlength="100"></div>' +
        '<div class="booking-row"><label for="bkp-phone">Số điện thoại *</label><input type="tel" id="bkp-phone" name="phone" required maxlength="15" inputmode="tel"></div>' +
        '<div class="booking-row"><label for="bkp-date">Ngày khám mong muốn *</label><input type="date" id="bkp-date" name="date" required></div>' +
        '<div class="booking-row"><label for="bkp-time">Giờ khám mong muốn *</label><select id="bkp-time" name="time" required>' +
        '<option value="">-- Chọn giờ --</option><option>Buổi sáng (8:00 - 12:00)</option><option>Buổi chiều (13:00 - 17:00)</option><option>Buổi tối (17:00 - 20:00)</option></select></div>' +
        '<div class="booking-row"><label for="bkp-service">Dịch vụ</label><select id="bkp-service" name="service">' +
        '<option>Khám thai</option><option>Khám phụ khoa</option><option>Tư vấn hiếm muộn / IVF</option><option>Khác</option></select></div>' +
        '<div class="booking-row"><label for="bkp-note">Ghi chú</label><textarea id="bkp-note" name="note" rows="3" maxlength="500"></textarea></div>' +
        '<input type="text" name="website" tabindex="-1" autocomplete="off" style="position:absolute;left:-9999px" aria-hidden="true">' +
        '<button type="submit" class="booking-submit">Đặt lịch hẹn</button>' +
        '</form></div></div>';
    var $overlay = $(html).appendTo('body');
    var lastFocus = null;

    function openPopup() {
        lastFocus = document.activeElement;
        $overlay.addClass('open');
        $('body').css('overflow', 'hidden');
        setTimeout(function () { $('#bkp-name').trigger('focus'); }, 0);
    }
    function closePopup() {
        $overlay.removeClass('open');
        $('body').css('overflow', '');
        if (lastFocus && lastFocus.focus) lastFocus.focus();
    }
    bindForm($('#bk-popup-form'), closePopup);
    $overlay.on('click', function (e) { if (e.target === this) closePopup(); });
    $overlay.find('.bk-close').on('click', closePopup);
    $(document).on('keydown', function (e) { if (e.key === 'Escape' && $overlay.hasClass('open')) closePopup(); });

    // Nút "Đặt lịch hẹn" (đầu trang + menu mobile) -> mở popup.
    // Dùng capture để chặn trước các handler redirect Zalo gắn trực tiếp trong apps.js.
    document.addEventListener('click', function (e) {
        var a = e.target.closest && e.target.closest('a.home__btn');
        if (!a || a.textContent.replace(/\s+/g, ' ').trim().toLowerCase() !== 'đặt lịch hẹn') return;
        e.preventDefault();
        e.stopPropagation();
        openPopup();
    }, true);
});
