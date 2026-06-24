import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
const sourcePath = path.join(root, 'comment.html')
const jsonPath = path.join(root, 'lib/comments-data.json')
const htmlPath = path.join(root, 'comments.html')

const html = fs.readFileSync(sourcePath, 'utf8')

function decodeText(raw) {
  return raw
    .replace(/<a[^>]*href="\/([^/"]+)\/"[^>]*>([\s\S]*?)<\/a>/gi, (_, user) => `@${user}`)
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#039;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim()
}

function profilePicFromAlt(username) {
  const needle = `alt="${username}'s profile picture"`
  const idx = html.indexOf(needle)
  if (idx === -1) return undefined
  const chunk = html.slice(idx, idx + 1500)
  const match = chunk.match(/src="(https:\/\/[^"]*cdninstagram[^"]+)"/)
  return match ? match[1].replace(/&amp;/g, '&') : undefined
}

const profileCache = new Map()
function getProfilePic(username) {
  if (!profileCache.has(username)) {
    profileCache.set(username, profilePicFromAlt(username))
  }
  return profileCache.get(username)
}

const spans = [...html.matchAll(/<span class="_ap3a[^"]*" dir="auto">([\s\S]*?)<\/span>/g)]
const comments = []
const seen = new Set()

for (const spanMatch of spans) {
  const spanIdx = spanMatch.index
  const text = decodeText(spanMatch[1])
  if (!text) continue

  const window = html.slice(Math.max(0, spanIdx - 8000), spanIdx)
  const altMatches = [...window.matchAll(/alt="([a-zA-Z0-9._]+)'s profile picture"/g)]
  let username = altMatches.at(-1)?.[1]

  if (!username || username === 'dirsouk.app') {
    username = [...window.matchAll(/href="\/([a-zA-Z0-9._]+)\/"[^>]*role="link"[^>]*>\1<\/a>/g)].at(-1)?.[1]
  }

  if (!username || username === 'dirsouk.app') continue

  const key = `${username}::${text}`
  if (seen.has(key)) continue
  seen.add(key)

  comments.push({
    id: `c${comments.length + 1}`,
    username,
    text,
    profilePic: getProfilePic(username),
  })
}

fs.writeFileSync(jsonPath, `${JSON.stringify(comments, null, 2)}\n`)

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

const articles = comments
  .map(
    (comment) => `  <article class="comment" data-username="${escapeHtml(comment.username)}">
    <img class="avatar" src="${escapeHtml(comment.profilePic || '')}" alt="${escapeHtml(comment.username)}" width="40" height="40" loading="lazy" />
    <div class="body">
      <strong>@${escapeHtml(comment.username)}</strong>
      <p>${escapeHtml(comment.text)}</p>
    </div>
  </article>`,
  )
  .join('\n')

const page = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <title>Commentaires — instagram.com/p/DZkfmBMMwcZ/</title>
  <meta name="source" content="https://www.instagram.com/p/DZkfmBMMwcZ/" />
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #fafafa; margin: 0; padding: 24px; color: #262626; }
    .wrap { max-width: 760px; margin: 0 auto; }
    h1 { font-size: 1.35rem; margin: 0 0 6px; }
    .meta { color: #8e8e8e; margin-bottom: 20px; font-size: 14px; }
    .comment { display: flex; gap: 12px; background: #fff; border: 1px solid #dbdbdb; border-radius: 16px; padding: 14px; margin-bottom: 10px; align-items: flex-start; }
    .avatar { width: 40px; height: 40px; border-radius: 50%; object-fit: cover; background: #efefef; flex-shrink: 0; }
    strong { display: block; margin-bottom: 4px; font-size: 14px; }
    p { margin: 0; font-size: 14px; line-height: 1.45; white-space: pre-wrap; word-break: break-word; }
  </style>
</head>
<body>
  <div class="wrap">
    <h1>Commentaires du post DZkfmBMMwcZ</h1>
    <p class="meta">${comments.length} commentaires extraits · @dirsouk.app · Source: comment.html</p>
${articles}
  </div>
</body>
</html>`

fs.writeFileSync(htmlPath, page)

console.log(`Extracted ${comments.length} comments from comment.html`)
console.log(`Wrote ${jsonPath}`)
console.log(`Wrote ${htmlPath}`)
