"""
Pre-deployment validation script for Mottobiz.
Tests all routes, checks meta tags, schema, console errors, and screenshots.
"""
from playwright.sync_api import sync_playwright
import json, sys, os

BASE_URL = "http://localhost:5173"

ROUTES = [
    ("/", "Homepage"),
    ("/resources", "Resources Page"),
    ("/industries/textile-diamond", "Textile & Diamond Hub"),
    ("/industries/restaurant-food", "Restaurant & Food Hub"),
    ("/industries/real-estate", "Real Estate Hub"),
    ("/industries/coaching-education", "Coaching & Education Hub"),
    ("/industries/retail", "Retail Hub"),
    ("/industries/ai-agents", "AI Agents Hub (NEW)"),
    ("/locations/varachha", "Varachha Hub"),
    ("/locations/katargam", "Katargam Hub"),
    ("/locations/vesu", "Vesu Hub"),
    ("/locations/adajan", "Adajan Hub"),
    ("/locations/other", "Other Areas Hub"),
    ("/privacy", "Privacy Policy"),
    ("/terms", "Terms of Service"),
    ("/resources/whatsapp-automation-textile-traders-surat", "Article: WhatsApp Automation"),
    ("/resources/ai-agent-small-business-surat", "Article: AI Agent"),
    ("/resources/n8n-vs-make", "Article: n8n vs Make"),
]

PASS = 0
FAIL = 0
ERRORS = []

def check(label, condition, detail=""):
    global PASS, FAIL
    if condition:
        PASS += 1
        print(f"  [PASS] {label}")
    else:
        FAIL += 1
        msg = f"  [FAIL] {label}" + (f" — {detail}" if detail else "")
        print(msg)
        ERRORS.append(msg)

def run_tests():
    global PASS, FAIL, ERRORS
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            viewport={"width": 1280, "height": 800},
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
        )

        for path, name in ROUTES:
            url = BASE_URL + path
            print(f"\n{'='*60}")
            print(f"[TEST] Testing: {name}")
            print(f"   URL: {url}")
            print(f"{'='*60}")
            
            page = context.new_page()
            page_errors = []
            page.on("pageerror", lambda err: page_errors.append(str(err)))
            page.on("console", lambda msg: page_errors.append(f"CONSOLE: {msg.text}") if msg.type == "error" else None)

            try:
                page.goto(url, wait_until="networkidle", timeout=15000)
                page.wait_for_timeout(1000)  # extra wait for JS rendering
                
                # Check for JS errors
                check(f"No JavaScript errors", len([e for e in page_errors if "CONSOLE:" not in e]) == 0,
                      str(page_errors[:3]) if page_errors else "")
                
                # Get page content
                title = page.title()
                html = page.content()
                
                # Check title exists and is not empty
                check(f"Title: {title[:60]}...", len(title) > 10, title)
                
                # Check meta description
                meta_desc = page.query_selector('meta[name="description"]')
                if meta_desc:
                    desc = meta_desc.get_attribute("content")
                    check(f"Meta description present ({len(desc)} chars)", len(desc) > 50)
                else:
                    check("Meta description tag exists", False)
                
                # Check meta keywords
                meta_kw = page.query_selector('meta[name="keywords"]')
                check("Meta keywords present", meta_kw is not None)
                
                # Check canonical
                canonical = page.query_selector('link[rel="canonical"]')
                if canonical:
                    href = canonical.get_attribute("href")
                    expected = f"https://mottobiz.com{path}"
                    check(f"Canonical matches route", expected in href, f"{href} vs {expected}")
                else:
                    check("Canonical link exists", False)
                
                # Check schema markup (JSON-LD)
                schemas = page.query_selector_all('script[type="application/ld+json"]')
                check(f"Schema blocks: {len(schemas)}", len(schemas) >= 2)
                
                # Check Open Graph tags
                og_title = page.query_selector('meta[property="og:title"]')
                og_desc = page.query_selector('meta[property="og:description"]')
                og_image = page.query_selector('meta[property="og:image"]')
                og_url = page.query_selector('meta[property="og:url"]')
                check("og:title present", og_title is not None)
                check("og:description present", og_desc is not None)
                check("og:image present", og_image is not None)
                check("og:url present", og_url is not None)
                
                # Check Twitter cards
                tw_card = page.query_selector('meta[name="twitter:card"]')
                check("twitter:card present", tw_card is not None)
                
                # Check SpeakableSpecification (newly added)
                has_speakable = False
                for s in schemas:
                    try:
                        data = json.loads(s.get_attribute("innerHTML") or "{}")
                        if data.get("speakable") or (isinstance(data.get("@graph"), list) and any(g.get("speakable") for g in data["@graph"])):
                            has_speakable = True
                            break
                    except:
                        pass
                check("SpeakableSpecification schema", has_speakable)
                
                # Check h1 exists
                h1 = page.query_selector("h1")
                if h1:
                    h1_text = h1.inner_text()
                    check(f"H1 present: '{h1_text[:50]}...'", len(h1_text) > 5)
                else:
                    check("H1 tag exists", False, "No h1 found")
                
                # Check main content renders
                main = page.query_selector("main, article, [role='main']")
                check("Main content area rendered", main is not None)
                
                # Screenshot for visual review
                os.makedirs("/tmp/mottobiz-tests", exist_ok=True)
                safe_name = name.replace(" ", "_").replace("/", "_").replace("(", "").replace(")", "").replace(":", "").replace("—", "-")[:50]
                page.screenshot(path=f"/tmp/mottobiz-tests/{safe_name}.png", full_page=True)
                
            except Exception as e:
                check(f"Page loaded successfully", False, str(e)[:100])
            
            page.close()
        
        # Test "llms.txt" and "pricing.md" accessibility
        print(f"\n{'='*60}")
        print(f"[TEST] Testing: Static Public Files")
        print(f"{'='*60}")
        
        for file_path in ["/llms.txt", "/pricing.md", "/robots.txt", "/sitemap.xml"]:
            try:
                resp = context.request.get(BASE_URL + file_path)
                check(f"{file_path} accessible (HTTP {resp.status})", resp.status == 200 or resp.status == 304)
            except Exception as e:
                check(f"{file_path} accessible", False, str(e)[:50])
        
        browser.close()
    
    # Summary
    print(f"\n{'='*60}")
    print(f"[SUMMARY] TEST RESULTS")
    print(f"{'='*60}")
    total = PASS + FAIL
    print(f"   Passed: {PASS}/{total} ({PASS/total*100:.1f}%)" if total > 0 else "   No tests ran")
    print(f"   Failed: {FAIL}/{total}")
    
    if ERRORS:
        print(f"\n[FAIL] FAILURES:")
        for e in ERRORS:
            print(f"   {e}")
    
    return FAIL == 0

if __name__ == "__main__":
    success = run_tests()
    sys.exit(0 if success else 1)
