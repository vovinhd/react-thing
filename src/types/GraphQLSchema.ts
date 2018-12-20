//TODO completely auto generate from endpoint
export interface Challenge {
    id: number
    title: string
    content: string
    tip?: string
    score?: number
    isSpare: Boolean
    createdAt: Date
    updatedAt: Date
    themenWoche: Themenwoche
    kategorie: Kategorie
    oberthema: Oberthema
    props: Props
}

export interface ChallengeCompletion {
    id: number
    createdAt: Date
    updatedAt: Date
    owner: User
    seasonPlanChallenge: SeasonPlanChallenge
}

export interface ChallengeRejection {
    id: number
    createdAt: Date
    updatedAt: Date
    owner: User
    seasonPlanChallenge: SeasonPlanChallenge
}

export interface ChallengeReplacement extends UserChallenge {
    challenge: Challenge
    id: number
    plan: SeasonPlan
    createdAt: Date
    updatedAt: Date
    owner: User
}

export interface ConnectionArgs {
    before?: string
    after?: string
    first?: number
    last?: number
}

export interface FeedComment {
    id: number
    body?: string
    dateCreated: Date
    sentiment: number
    author: User
    post: FeedPost
    parent?: [FeedComment]
    children?: [FeedComment]
}

export interface FeedCommentInput {
    body: string
    parent?: number
    post: number
}

export interface FeedPost {
    id: number
    title?: string
    body?: string
    dateCreated: Date
    author: User
    comments?: [FeedComment]
    isPinned: Boolean
}

export interface FeedPostConnection {
    edges: [FeedPostEdge]
    pageInfo: [FeedPostEdge]
}

export interface FeedPostEdge {
    cursor: string
    node: FeedPost
    cursorDecoded: string
}

export interface FeedPostInput {
    title: string
    body: string
    isPinned?: Boolean
}

export interface FeedPostPage {
    page: FeedPostConnection
    pageData: PageData
}

export interface Kategorie {
    name: string
    oberthemen: [Oberthema]
    themenWochen: [Themenwoche]
    createdAt: Date
    updatedAt: Date
    challenges: [Challenge]
    props: Props
}

export interface Media {
    id: number
    uploadedAt: string
    filename: string
    encoding: string
    mimetype: string
    path: string
    uploader: User
}

export interface Oberthema {
    name: string
    createdAt: Date
    updatedAt: Date
    kategorie: Kategorie
    themenWochen: [Themenwoche]
    challenges: [Challenge]
    props: Props
}

export interface PageData {
    count: number
    limit: number
    offset: number
}

export interface Props {
    pageid: number
    revid: number
    parentid: number
    user: string
    timestamp: Date
    createdAt: Date
    updatedAt: Date
    warnings: WikiWarning
}

export interface Quelle {
    id: number
    url: string
    title: string
    createdAt: Date
    updatedAt: Date
}

export interface Season {
    id: number
    startDate: Date
    startOffsetDate: Date
    endDate: Date
    title: string
    seasonPlan: [SeasonPlan]
}

export interface SeasonInput {
    id: number
    startDate: Date
    endDate: Date
    startOffsetDate: Date
    title: string
}

export interface SeasonPlan {
    id: number
    season: Season
    createdAt: Date
    updatedAt: Date
    duration: number
    position: number
    themenwoche: Themenwoche
    challenges: [SeasonPlanChallenge]
}

export interface SeasonPlanChallenge extends UserChallenge {
    challenge: Challenge
    id: number
    plan: SeasonPlan
    completions: ChallengeCompletion
    rejections: ChallengeRejection
}

export interface SeasonPlanInput {
    id: number
    seasonId: number
    themenwocheId: string
    position: number
    duration: number
}

export interface Themenwoche {
    title: string
    content: string
    headerImage: WikiImage
    createdAt: Date
    updatedAt: Date
    oberthema: Oberthema
    kategorie: Kategorie
    challenges: [Challenge]
    props: Props
    quellen: Quelle
    usages: [SeasonPlan]
}

export interface User {
    id: number
    userName: string
    screenName: string
    dateCreated: Date
    emailConfirmed: Boolean
    isBanned: Boolean
    role: number
    avatar: Media
    media: [Media]
    posts: [FeedPost]
    comments: [FeedComment]
    challengeCompletions: [ChallengeCompletion]
    challengeRejections: [ChallengeRejection]
    challengeReplacements: [ChallengeReplacement]
}

export interface UserChallenge {
    challenge: Challenge
    id: number
    plan: SeasonPlan
}

export interface UserConnection {
    edges: [UserEdge]
    pageInfo: [UserEdge]
}

export interface UserEdge {
    cursor: string
    node: User
    cursorDecoded: string
}

export interface UserPage {
    page: UserConnection
    pageData: PageData
}

export interface WikiImage {
    mimetype: string
    url: string
    uploader: string
    timestamp: Date
    createdAt: Date
    updatedAt: Date
    details: string
    canonicalName: string
    props: Props
}

export interface WikiWarning {
    id: number
    createdAt: Date
    updatedAt: Date
    props: Props
    warnings: string
}
