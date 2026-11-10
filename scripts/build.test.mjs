import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {build, escHtml, formatDate, jsonSafe, updateList} from './build.mjs';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function sandbox(posts) {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'bsi-'));
    fs.mkdirSync(path.join(root, 'templates'));
    fs.mkdirSync(path.join(root, 'content/posts'), {recursive: true});
    fs.copyFileSync(path.join(REPO, 'templates/article.html'), path.join(root, 'templates/article.html'));
    fs.copyFileSync(path.join(REPO, 'kien-thuc.html'), path.join(root, 'kien-thuc.html'));
    for (const [name, text] of Object.entries(posts)) fs.writeFileSync(path.join(root, 'content/posts', name), text);
    return root;
}
const run = (root) => build({root, postsDir: path.join(root, 'content/posts')});

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

test('real kien-thuc.html has markers and zero posts leaves the list empty', () => {
    const html = fs.readFileSync(path.join(REPO, 'kien-thuc.html'), 'utf8');
    assert.equal(updateList(html, []), html);
});

test('helpers', () => {
    assert.equal(escHtml(`<a href="x">&'`), '&lt;a href=&quot;x&quot;&gt;&amp;&#39;');
    assert.equal(jsonSafe('</script>'), '"\\u003c/script\\u003e"');
    assert.deepEqual(formatDate(new Date('2023-04-25T18:03:00+07:00')), {display: '25/04/2023 06:03 PM', iso: '2023-04-25'});
});
