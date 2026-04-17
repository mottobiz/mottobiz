// Stable public API for all article data/helpers.
// Keep imports as `@/data/articles` across the app.

export { ARTICLES, LOCATION_SERVICE_ARTICLES } from './articles/catalog'
export { ARTICLE_CONTENT, getArticleContent } from './articles/content'
export {
  getArticleBySlug,
  getArticlesByCategory,
  getArticlesByPillar,
  getFeaturedArticles,
  getRelatedArticles,
  getEnrichedArticle,
  getRelatedArticlesEnriched,
  getTLDR,
  getInteractiveBlocks,
} from './articles/helpers'

