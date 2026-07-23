"""Verify article page rendering for author, schema, and meta tags."""
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto("http://localhost:5173/resources/whatsapp-automation-textile-traders-surat", wait_until="domcontentloaded", timeout=10000)
    page.wait_for_timeout(3000)
    print("PAGE_LOADED")

    author_el = page.query_selector("text=By")
    print(f"AUTHOR_ELEMENT: {author_el.inner_text() if author_el else 'NONE'}")

    schema_info = page.evaluate("""
        () => {
            var result = {author: null, wordcount: null, breadcrumb: false, og_site: null, article_section: null};
            var metas = document.querySelectorAll("meta[property='og:site_name']");
            if (metas.length > 0) result.og_site = metas[0].getAttribute('content');
            var scripts = document.querySelectorAll('script[type="application/ld+json"]');
            for (var i = 0; i < scripts.length; i++) {
                try {
                    var d = JSON.parse(scripts[i].innerHTML);
                    if (d['@type'] === 'Article') {
                        result.author = d.author ? d.author.name : null;
                        result.wordcount = d.wordCount || null;
                        result.article_section = d.articleSection || null;
                    }
                    if (d['@type'] === 'BreadcrumbList') result.breadcrumb = true;
                } catch(e) {}
            }
            return result;
        }
    """)

    print(f"SCHEMA_AUTHOR: {schema_info['author']}")
    print(f"WORDCOUNT: {schema_info['wordcount']}")
    print(f"ARTICLE_SECTION: {schema_info['article_section']}")
    print(f"BREADCRUMB: {schema_info['breadcrumb']}")
    print(f"OG_SITE_NAME: {schema_info['og_site']}")

    browser.close()
    print("DONE")
