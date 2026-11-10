import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {build, escHtml, formatDate, jsonSafe, updateList, renderPriceTable} from './build.mjs';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function sandbox(posts, stories = {}) {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'bsi-'));
    fs.mkdirSync(path.join(root, 'templates'));
    fs.mkdirSync(path.join(root, 'content/posts'), {recursive: true});
    fs.mkdirSync(path.join(root, 'content/stories'), {recursive: true});
    fs.copyFileSync(path.join(REPO, 'templates/article.html'), path.join(root, 'templates/article.html'));
    fs.copyFileSync(path.join(REPO, 'kien-thuc.html'), path.join(root, 'kien-thuc.html'));
    fs.copyFileSync(path.join(REPO, 'cau-chuyen.html'), path.join(root, 'cau-chuyen.html'));
    fs.copyFileSync(path.join(REPO, 'gia-dich-vu.html'), path.join(root, 'gia-dich-vu.html'));
    fs.mkdirSync(path.join(root, 'content/pages'), {recursive: true});
    fs.copyFileSync(path.join(REPO, 'content/pages/gia-dich-vu.md'), path.join(root, 'content/pages/gia-dich-vu.md'));
    for (const [name, text] of Object.entries(posts)) fs.writeFileSync(path.join(root, 'content/posts', name), text);
    for (const [name, text] of Object.entries(stories)) fs.writeFileSync(path.join(root, 'content/stories', name), text);
    return root;
}
const run = (root) => build({root});

test('builds a page, escapes the title and lists the post first', () => {
    const root = sandbox({
        'bai-thu.md': `---\ntitle: 'Bé "yêu" <script>alert(1)</script>'\ndate: 2026-11-10T09:30:00+07:00\nthumbnail: upload/news/a.jpg\n---\n## Tiêu đề\n\nNội dung **đậm**.\n`,
    });
    run(root);
    const page = fs.readFileSync(path.join(root, 'bai-thu.html'), 'utf8');
    assert.match(page, /<h2>Bé &quot;yêu&quot; &lt;script&gt;/);
    assert.doesNotMatch(page, /<script>alert\(1\)/);
    assert.match(page, /<strong>đậm<\/strong>/);
    assert.match(page, /Ngày đăng:10\/11\/2026 09:30 AM/);
    assert.match(page, /"datePublished": "2026-11-10"/);
    assert.match(page, /https:\/\/phantrungtieu\.com\/upload\/news\/a\.jpg/);
    assert.doesNotMatch(page, /\{\{\w+\}\}/);
    const list = fs.readFileSync(path.join(root, 'kien-thuc.html'), 'utf8');
    assert.ok(list.indexOf('href="bai-thu"') > list.indexOf('POSTS:START'));
    assert.ok(list.indexOf('href="bai-thu"') < list.indexOf('POSTS:END'));
});

test('is idempotent: building twice does not duplicate list items', () => {
    const root = sandbox({'a.md': `---\ntitle: A\ndate: 2026-01-01T00:00:00+07:00\n---\nx\n`});
    run(root);
    const once = fs.readFileSync(path.join(root, 'kien-thuc.html'), 'utf8');
    run(root);
    assert.equal(fs.readFileSync(path.join(root, 'kien-thuc.html'), 'utf8'), once);
    assert.equal(once.split('href="a"').length - 1, 2); // image link + title link
});

test('skips drafts and sorts newest first', () => {
    const root = sandbox({
        'old.md': `---\ntitle: Old\ndate: 2025-01-01T00:00:00+07:00\n---\nx\n`,
        'new.md': `---\ntitle: New\ndate: 2026-01-01T00:00:00+07:00\n---\nx\n`,
        'wip.md': `---\ntitle: WIP\ndate: 2026-06-01T00:00:00+07:00\ndraft: true\n---\nx\n`,
    });
    run(root);
    const list = fs.readFileSync(path.join(root, 'kien-thuc.html'), 'utf8');
    assert.ok(list.indexOf('href="new"') < list.indexOf('href="old"'));
    assert.ok(!list.includes('href="wip"'));
    assert.ok(!fs.existsSync(path.join(root, 'wip.html')));
});

test('refuses to overwrite a hand-written page', () => {
    const root = sandbox({'index.md': `---\ntitle: X\ndate: 2026-01-01T00:00:00+07:00\n---\nx\n`});
    fs.writeFileSync(path.join(root, 'index.html'), '<html>real home</html>');
    assert.throws(() => run(root), /would overwrite/);
    assert.equal(fs.readFileSync(path.join(root, 'index.html'), 'utf8'), '<html>real home</html>');
});

test('rejects bad slugs, missing title and bad dates', () => {
    assert.throws(() => run(sandbox({'Bad_Name.md': `---\ntitle: X\ndate: 2026-01-01\n---\n`})), /Invalid post file name/);
    assert.throws(() => run(sandbox({'a.md': `---\ndate: 2026-01-01\n---\n`})), /missing title/);
    assert.throws(() => run(sandbox({'a.md': `---\ntitle: X\n---\n`})), /invalid date/);
});

test('stories go to cau-chuyen.html and posts stay on kien-thuc.html', () => {
    const root = sandbox(
        {'kt.md': `---\ntitle: Kiến thức A\ndate: 2026-01-01T00:00:00+07:00\n---\nx\n`},
        {'cc.md': `---\ntitle: Câu chuyện B\ndate: 2026-02-01T00:00:00+07:00\n---\ny\n`},
    );
    run(root);
    const kt = fs.readFileSync(path.join(root, 'kien-thuc.html'), 'utf8');
    const cc = fs.readFileSync(path.join(root, 'cau-chuyen.html'), 'utf8');
    assert.ok(kt.includes('href="kt"') && !kt.includes('href="cc"'));
    assert.ok(cc.includes('href="cc"') && !cc.includes('href="kt"'));
    const page = fs.readFileSync(path.join(root, 'cc.html'), 'utf8');
    assert.match(page, /href="cau-chuyen"><span>Câu chuyện<\/span>/);
    assert.match(page, /"name": "Câu chuyện", "item": "https:\/\/phantrungtieu\.com\/cau-chuyen"/);
    assert.match(fs.readFileSync(path.join(root, 'kt.html'), 'utf8'), /href="kien-thuc"><span>Kiến thức<\/span>/);
    run(root); // idempotent
    assert.equal(fs.readFileSync(path.join(root, 'cau-chuyen.html'), 'utf8'), cc);
});

test('rejects the same slug in two sections', () => {
    const md = `---\ntitle: X\ndate: 2026-01-01T00:00:00+07:00\n---\nx\n`;
    assert.throws(() => run(sandbox({'dup.md': md}, {'dup.md': md})), /Duplicate slug/);
});

test('real kien-thuc.html and cau-chuyen.html have markers; zero posts leaves lists unchanged', () => {
    const cc = fs.readFileSync(path.join(REPO, 'cau-chuyen.html'), 'utf8');
    assert.equal(updateList(cc, []), cc);
});

test('real kien-thuc.html has markers and zero posts leaves the list empty', () => {
    const html = fs.readFileSync(path.join(REPO, 'kien-thuc.html'), 'utf8');
    assert.equal(updateList(html, []), html);
});

test('helpers', () => {
    assert.equal(escHtml(`<a href="x">&'`), '&lt;a href=&quot;x&quot;&gt;&amp;&#39;');
    assert.equal(jsonSafe('</script>'), '"\\u003c/script\\u003e"');
    assert.deepEqual(formatDate(new Date('2023-04-25T18:03:00+07:00')), {display: '25/04/2023 06:03 PM', iso: '2023-04-25'});
});

test('price page is rendered from content/pages and is idempotent and escaped', () => {
    const root = sandbox({});
    fs.writeFileSync(path.join(root, 'content/pages/gia-dich-vu.md'),
        `---\ntitle: Giá\nrows:\n  - service: "A <b>x</b>"\n    price: "1,000"\n---\n`);
    build({root});
    const once = fs.readFileSync(path.join(root, 'gia-dich-vu.html'), 'utf8');
    assert.match(once, /<td>A &lt;b&gt;x&lt;\/b&gt;<\/td>\s*<td>1,000<\/td>/);
    assert.equal(once.split('<tr>').length - 1, 2); // header + 1 row
    build({root});
    assert.equal(fs.readFileSync(path.join(root, 'gia-dich-vu.html'), 'utf8'), once);
});

test('committed gia-dich-vu.html matches the committed content file', () => {
    const root = sandbox({});
    const before = fs.readFileSync(path.join(root, 'gia-dich-vu.html'), 'utf8');
    build({root});
    assert.equal(fs.readFileSync(path.join(root, 'gia-dich-vu.html'), 'utf8'), before);
});
