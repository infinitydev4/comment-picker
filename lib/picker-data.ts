import commentsData from './comments-data.json'

export type CommentEntry = {
  id: string
  username: string
  text: string
  profilePic?: string
}

export const GATHERING_USERNAMES = [
  'maya.travels',
  'leo.designs',
  'nora.k',
  'sam_lifts',
  'the.bloom',
  'vinyl.vera',
]

export const FIXED_WINNERS: CommentEntry[] = [
  {
    id: 'w1',
    username: 'yasmine_16213',
    text: '@x_fefa_xx @biba60076 @fati__547',
    profilePic: '/photos/profiles/yasmine_16213.jpg',
  },
  {
    id: 'w2',
    username: 'rose_lin3516',
    text: '@mimi71843 @hsm7.42hsm @jxrc_7',
    profilePic: '/photos/profiles/rose_lin3516.jpg',
  },
  {
    id: 'w3',
    username: 'ranianaya924',
    text: '@Dirsouk ان شاءلله',
    profilePic: '/photos/profiles/ranianaya924.jpg',
  },
]

export const COMMENT_POOL: CommentEntry[] = [
  ...FIXED_WINNERS,
  ...(commentsData as CommentEntry[]),
]

const PROFILE_PIC_BY_USERNAME = new Map<string, string>()
for (const entry of COMMENT_POOL) {
  if (entry.profilePic && !PROFILE_PIC_BY_USERNAME.has(entry.username)) {
    PROFILE_PIC_BY_USERNAME.set(entry.username, entry.profilePic)
  }
}

export function getProfilePic(username: string): string | undefined {
  return PROFILE_PIC_BY_USERNAME.get(username)
}

export function getRandomPoolEntry(): CommentEntry {
  return COMMENT_POOL[Math.floor(Math.random() * COMMENT_POOL.length)]
}

export function getFixedWinners(count: number): CommentEntry[] {
  return FIXED_WINNERS.slice(0, Math.min(count, FIXED_WINNERS.length))
}

export const CONFETTI_COLORS = [
  '#8b5cf6',
  '#ff4d9d',
  '#ff8a3d',
  '#7bd83a',
  '#36b7f5',
  '#ffce3a',
]
