/**
 * Backend cho form đặt lịch (lich-kham.html). Chạy trên Google Apps Script, miễn phí.
 *
 * Cài đặt:
 * 1. Tạo Google Sheet mới, đặt hàng 1: Thời gian | Họ tên | SĐT | Ngày | Giờ | Dịch vụ | Ghi chú
 * 2. Extensions > Apps Script, dán toàn bộ file này, sửa NOTIFY_EMAIL.
 * 3. Deploy > New deployment > Web app
 *      Execute as: Me | Who has access: Anyone
 * 4. Copy URL "Web app" dán vào BOOKING_ENDPOINT trong assets/js/booking.js
 */
var NOTIFY_EMAIL = 'your-email@example.com';

function doPost(e) {
  try {
    var d = JSON.parse(e.postData.contents);
    if (!d.name || !d.phone || !d.date || !d.time) throw new Error('missing');

    // Chặn công thức bị inject vào Sheet (=, +, -, @)
    var safe = function (v) {
      v = String(v || '').slice(0, 500);
      return /^[=+\-@]/.test(v) ? "'" + v : v;
    };
    var row = [new Date(), safe(d.name), "'" + safe(d.phone), safe(d.date), safe(d.time), safe(d.service), safe(d.note)];
    SpreadsheetApp.getActiveSpreadsheet().getSheets()[0].appendRow(row);

    var mail = buildEmail(d);
    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      subject: mail.subject,
      body: mail.text,        // bản chữ thường, cho ứng dụng mail không hiển thị HTML
      htmlBody: mail.html,
      name: 'Website Phòng khám BS Phan Trung Tiều'
    });

    return json({ok: true});
  } catch (err) {
    return json({ok: false, error: String(err)});
  }
}

function json(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}

var THU = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];

function escHtml(v) {
  return String(v == null ? '' : v).replace(/[&<>"']/g, function (c) {
    return {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c];
  });
}

// '2026-11-10' -> 'Thứ 3, 10/11/2026'
function prettyDate(iso) {
  var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(iso));
  if (!m) return String(iso);
  var day = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])).getDay();
  return THU[day] + ', ' + m[3] + '/' + m[2] + '/' + m[1];
}

// '0986564144' hoặc '+84 986 564 144' -> số quốc tế cho link Zalo/tel
function intlPhone(phone) {
  var digits = String(phone).replace(/[^\d+]/g, '');
  if (digits.indexOf('+') === 0) return digits;
  return '+84' + digits.replace(/^0/, '');
}

function buildEmail(d) {
  var date = prettyDate(d.date);
  var note = String(d.note || '').trim();
  var phone = String(d.phone).trim();
  var tel = intlPhone(phone);
  var zalo = 'https://zalo.me/' + tel.replace('+', '');

  var subject = 'Lịch hẹn mới: ' + d.name + ' – ' + d.time + ', ' + date;

  var text = 'LỊCH HẸN MỚI\n\n' +
    'Ngày: ' + date + '\nGiờ: ' + d.time + '\n\n' +
    'Họ tên: ' + d.name + '\nSĐT: ' + phone + '\nDịch vụ: ' + (d.service || '') + '\n' +
    'Ghi chú: ' + (note || '(không có)') + '\n\n' +
    'Gọi: ' + 'tel:' + tel + '\nZalo: ' + zalo + '\n';

  var row = function (label, valueHtml) {
    return '<tr><td style="padding:10px 16px;color:#6b7280;width:110px;vertical-align:top;border-bottom:1px solid #eef0f3">' +
      label + '</td><td style="padding:10px 16px;color:#111827;border-bottom:1px solid #eef0f3">' + valueHtml + '</td></tr>';
  };
  var btn = function (href, label, bg) {
    return '<a href="' + escHtml(href) + '" style="display:inline-block;margin:0 8px 8px 0;padding:11px 20px;' +
      'border-radius:6px;background:' + bg + ';color:#ffffff;text-decoration:none;font-weight:600">' + label + '</a>';
  };

  var html =
    '<div style="background:#f4f6f9;padding:24px 12px;font-family:Arial,Helvetica,sans-serif;font-size:15px">' +
    '<div style="max-width:520px;margin:0 auto;background:#ffffff;border-radius:10px;overflow:hidden;border:1px solid #e5e7eb">' +
    '<div style="background:#e0457b;color:#ffffff;padding:16px 20px;font-size:18px;font-weight:700">Lịch hẹn mới</div>' +
    '<div style="padding:20px;text-align:center;border-bottom:1px solid #eef0f3">' +
    '<div style="font-size:22px;font-weight:700;color:#111827">' + escHtml(d.time) + '</div>' +
    '<div style="margin-top:4px;font-size:16px;color:#374151">' + escHtml(date) + '</div></div>' +
    '<table role="presentation" cellspacing="0" cellpadding="0" style="width:100%;border-collapse:collapse">' +
    row('Họ tên', '<strong>' + escHtml(d.name) + '</strong>') +
    row('Điện thoại', '<strong>' + escHtml(phone) + '</strong>') +
    row('Dịch vụ', escHtml(d.service || '')) +
    row('Ghi chú', note ? escHtml(note).replace(/\n/g, '<br>') : '<span style="color:#9ca3af">(không có)</span>') +
    '</table>' +
    '<div style="padding:18px 20px">' + btn('tel:' + tel, 'Gọi ngay', '#16a34a') + btn(zalo, 'Nhắn Zalo', '#0068ff') + '</div>' +
    '<div style="padding:12px 20px;background:#f9fafb;color:#9ca3af;font-size:12px">Gửi tự động từ website phantrungtieu.com</div>' +
    '</div></div>';

  return {subject: subject, text: text, html: html};
}
