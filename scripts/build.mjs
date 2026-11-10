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
const MARK = '<!-- generated-by: scripts/build.mjs -->';
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

export function build({root = ROOT, postsDir = POSTS_DIR} = {}) {
    const template = fs.readFileSync(path.join(root, 'templates/article.html'), 'utf8');
    const posts = loadPosts(postsDir);

    const seen = new Set();
    for (const p of posts) {
        if (seen.has(p.slug)) throw new Error(`Duplicate slug ${p.slug}`);
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
        });
        fs.writeFileSync(out, page.replace('<!DOCTYPE html>', `<!DOCTYPE html>\n${MARK}`));
    }

    const listFile = path.join(root, 'kien-thuc.html');
    fs.writeFileSync(listFile, updateList(fs.readFileSync(listFile, 'utf8'), posts));
    return posts;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const posts = build();
    console.log(`Built ${posts.length} post(s): ${posts.map((p) => p.slug).join(', ') || '-'}`);
}
