// Đặt lịch hẹn: gửi form tới Google Apps Script (xem docs/booking-apps-script.gs)
// Sau khi deploy Apps Script, dán URL "Web app" vào BOOKING_ENDPOINT.
var BOOKING_ENDPOINT = '';

$(function () {
    var $form = $('#booking-form');
    if (!$form.length) return;

    // Không cho chọn ngày trong quá khứ
    var d = new Date();
    var today = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
    $('#bk-date').attr('min', today);

    $form.on('submit', function (e) {
        e.preventDefault();
        var f = this;
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
            f.reset();
        }).catch(function () {
            showNotify('Gửi không thành công, vui lòng thử lại hoặc gọi trực tiếp phòng khám.', 'Lỗi', 'error');
        }).then(function () {
            $btn.prop('disabled', false).text('Đặt lịch hẹn');
        });
    });
});
