// Builds posts (content/posts/*.md) into static pages and updates the list on kien-thuc.html.
// Runs in CI before the Pages upload. Running it locally modifies kien-thuc.html and adds
// generated <slug>.html files; revert them with `git checkout kien-thuc.html && git clean -f -- '*.html'`
// (careful: only if you have no other untracked html files) or just don't commit them.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import matter from 'gray-matter';
import {marked} from 'marked';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ORIGIN = 'https://phantrungtieu.com';
const POSTS_DIR = path.join(ROOT, 'content/posts');
// Each section reads Markdown from `dir` and lists its posts in `listFile` (between the POSTS markers).
export const SECTIONS = [
    {dir: 'content/posts', listFile: 'kien-thuc.html', name: 'Kiến thức', href: 'kien-thuc'},
    {dir: 'content/stories', listFile: 'cau-chuyen.html', name: 'Câu chuyện', href: 'cau-chuyen'},
];
const MARK = '<!-- generated-by: scripts/build.mjs -->';
const PAGE_START = '<!-- PAGE:START -->';
const PAGE_END = '<!-- PAGE:END -->';
const LIST_START = '<!-- POSTS:START -->';
const LIST_END = '<!-- POSTS:END -->';

export const escHtml = (s) => String(s ?? '').replace(/[&<>"']/g, (c) =>
    ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));

// JSON that is safe to embed inside <script type="application/ld+json">
export const jsonSafe = (v) => JSON.stringify(v).replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026');

export function formatDate(date) {
    const p = Object.fromEntries(new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Ho_Chi_Minh', day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit', hour12: true,
    }).formatToParts(date).map((x) => [x.type, x.value]));
    const iso = new Intl.DateTimeFormat('sv-SE', {timeZone: 'Asia/Ho_Chi_Minh'}).format(date); // YYYY-MM-DD
    return {display: `${p.day}/${p.month}/${p.year} ${p.hour}:${p.minute} ${p.dayPeriod.toUpperCase()}`, iso};
}

export function plainText(html) {
    return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

export function render(template, vars) {
    return template.replace(/\{\{(\w+)\}\}/g, (m, k) => {
        if (!(k in vars)) throw new Error(`Template placeholder ${m} has no value`);
        return vars[k];
    });
}

export function loadPosts(dir = POSTS_DIR) {
    if (!fs.existsSync(dir)) return [];
    const posts = [];
    for (const file of fs.readdirSync(dir).filter((f) => f.endsWith('.md'))) {
        const slug = file.replace(/\.md$/, '');
        if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) throw new Error(`Invalid post file name "${file}" (use lowercase a-z, 0-9 and "-")`);
        const {data, content} = matter(fs.readFileSync(path.join(dir, file), 'utf8'));
        if (data.draft) continue;
        if (!data.title) throw new Error(`${file}: missing title`);
        const date = new Date(data.date);
        if (Number.isNaN(date.getTime())) throw new Error(`${file}: missing or invalid date`);
        const body = marked.parse(content, {gfm: true, breaks: false});
        const description = String(data.description || plainText(body).slice(0, 160));
        posts.push({slug, title: String(data.title), date, thumbnail: data.thumbnail ? String(data.thumbnail) : '', description, body});
    }
    return posts.sort((a, b) => b.date - a.date);
}

export function listItem(post) {
    const t = escHtml(post.title);
    const img = post.thumbnail || 'thumbs/480x320x2/assets/images/noimage.png';
    return `                    <div class="news__item col-md-6">
                        <div class="form-row">
                            <a class="news__photo col-lg-5" href="${post.slug}" title="${t}">
                                <figure class="news__photo-inner scale-img">
                                    <img alt="${t}" class="lazy w-100" data-src="${escHtml(img)}"
                                         onerror="this.src='thumbs/480x320x2/assets/images/noimage.png';"/>
                                </figure>
                            </a>
                            <div class="news__info col-lg-7">
                                <h3 class="news__name">
                                    <a class="text-decoration-none text-split transition" href="${post.slug}" title="${t}">${t}</a>
                                </h3>
                                <div class="news__time">Ngày đăng: ${formatDate(post.date).display}</div>
                                <p class="news__desc text-split">${escHtml(post.description)}</p>
                            </div>
                        </div>
                    </div>`;
}

export function updateList(html, posts) {
    const a = html.indexOf(LIST_START), b = html.indexOf(LIST_END);
    if (a < 0 || b < a) throw new Error(`kien-thuc.html is missing ${LIST_START} / ${LIST_END} markers`);
    const items = posts.map(listItem).join('\n');
    return html.slice(0, a + LIST_START.length) + '\n' + (items ? items + '\n' : '') + '                    ' + html.slice(b);
}

// Hand-written pages whose main content is edited in the CMS (content/pages/<name>.md, front matter only).
export const PAGES = [
    {data: 'content/pages/gia-dich-vu.md', file: 'gia-dich-vu.html', render: renderPriceTable},
    {data: 'content/pages/lich-kham.md', file: 'lich-kham.html', render: renderSchedule},
];

export function renderPriceTable(d) {
    const rows = (d.rows || []).map((r) => `                <tr>
                    <td>${escHtml(r.service)}</td>
                    <td>${escHtml(r.price)}</td>
                </tr>`).join('\n');
    return `<div class="price-page">
            <div class="main__title">
                <h2>${escHtml(d.title || 'Bảng Giá Dịch Vụ')}</h2>
            </div>
            <table class="price-table">
                <thead>
                <tr>
                    <th>${escHtml(d.service_header || 'Dịch vụ')}</th>
                    <th>${escHtml(d.price_header || 'Giá (VNĐ)')}</th>
                </tr>
                </thead>
                <tbody>
${rows}
                </tbody>
            </table>
        </div>`;
}

export function renderSchedule(d, bodyHtml = '') {
    const hours = (d.hours || []).map((h) => `                <li><span>${escHtml(h.day)}</span><strong>${escHtml(h.time)}</strong></li>`).join('\n');
    return `<div class="schedule-page">
            <div class="main__title">
                <h2>${escHtml(d.title || 'Lịch khám')}</h2>
            </div>
            <ul class="schedule-hours">
${hours}
            </ul>${d.note ? `\n            <p class="schedule-note">${escHtml(d.note)}</p>` : ''}${bodyHtml ? `\n            <div class="schedule-body ckeditor">${bodyHtml}</div>` : ''}
            <div class="schedule-cta">
                <a class="menu__btn home__btn --font-bold --bg-infra-red transition" href="https://zalo.me/0989589115" target="_blank">Đặt lịch hẹn</a>
            </div>
        </div>`;
}

export function updatePage(html, content) {
    const a = html.indexOf(PAGE_START), b = html.indexOf(PAGE_END);
    if (a < 0 || b < a) throw new Error(`page is missing ${PAGE_START} / ${PAGE_END} markers`);
    return html.slice(0, a + PAGE_START.length) + '\n        ' + content + '\n        ' + html.slice(b);
}

export function buildPages(root = ROOT, pages = PAGES) {
    for (const pg of pages) {
        const dataFile = path.join(root, pg.data);
        if (!fs.existsSync(dataFile)) continue;
        const {data, content} = matter(fs.readFileSync(dataFile, 'utf8'));
        const bodyHtml = content.trim() ? marked.parse(content, {gfm: true, breaks: false}) : '';
        const file = path.join(root, pg.file);
        fs.writeFileSync(file, updatePage(fs.readFileSync(file, 'utf8'), pg.render(data, bodyHtml)));
    }
}

export function build({root = ROOT, sections = SECTIONS} = {}) {
    const template = fs.readFileSync(path.join(root, 'templates/article.html'), 'utf8');
    const all = [];
    const seen = new Set();

    for (const section of sections) {
        const posts = loadPosts(path.join(root, section.dir));
        for (const p of posts) {
            if (seen.has(p.slug)) throw new Error(`Duplicate slug ${p.slug} (slugs must be unique across all sections)`);
            seen.add(p.slug);
            const out = path.join(root, `${p.slug}.html`);
            if (fs.existsSync(out) && !fs.readFileSync(out, 'utf8').includes(MARK)) {
                throw new Error(`Post "${p.slug}" would overwrite the existing page ${p.slug}.html. Rename the post.`);
            }
            const {display, iso} = formatDate(p.date);
            const image = p.thumbnail ? `${ORIGIN}/${p.thumbnail.replace(/^\/+/, '')}` : '';
            const page = render(template, {
                title: escHtml(p.title), titleJson: jsonSafe(p.title),
                description: escHtml(p.description), descriptionJson: jsonSafe(p.description),
                slug: p.slug, origin: ORIGIN, image: escHtml(image), imageJson: jsonSafe(image),
                dateDisplay: display, dateIso: iso, body: p.body,
                sectionName: escHtml(section.name), sectionNameJson: jsonSafe(section.name), sectionHref: section.href,
            });
            fs.writeFileSync(out, page.replace('<!DOCTYPE html>', `<!DOCTYPE html>\n${MARK}`));
        }
        const listFile = path.join(root, section.listFile);
        fs.writeFileSync(listFile, updateList(fs.readFileSync(listFile, 'utf8'), posts));
        all.push(...posts);
    }
    buildPages(root);
    return all;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const posts = build();
    console.log(`Built ${posts.length} post(s): ${posts.map((p) => p.slug).join(', ') || '-'}`);
}
