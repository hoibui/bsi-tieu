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

    MailApp.sendEmail(NOTIFY_EMAIL, 'Lịch hẹn mới: ' + d.name,
      'Họ tên: ' + d.name + '\nSĐT: ' + d.phone + '\nNgày: ' + d.date + '\nGiờ: ' + d.time +
      '\nDịch vụ: ' + d.service + '\nGhi chú: ' + (d.note || ''));

    return json({ok: true});
  } catch (err) {
    return json({ok: false, error: String(err)});
  }
}

function json(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
