from playwright.sync_api import sync_playwright
import os

output_dir = r"D:\IDEprojects\Mottobiz\screenshots"
os.makedirs(output_dir, exist_ok=True)

with sync_playwright() as p:
    # Desktop
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    page.goto("http://localhost:5174", timeout=30000)
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(3000)
    
    # Layout audit
    print("=" * 60)
    print("DESKTOP LAYOUT AUDIT (AFTER FIX)")
    print("=" * 60)
    
    # Check section padding
    for sid in ["pain", "proof", "services", "how-it-works", "who", "testimonials", "audit", "faq", "cta"]:
        el = page.locator(f"#{sid}")
        if el.count() > 0:
            pt = el.evaluate("el => window.getComputedStyle(el).paddingTop")
            pb = el.evaluate("el => window.getComputedStyle(el).paddingBottom")
            print(f"#{sid} paddingTop: {pt}, paddingBottom: {pb}")
    
    # Check card padding
    cards = page.locator(".card")
    if cards.count() > 0:
        card_pad = cards.first.evaluate("el => window.getComputedStyle(el).padding")
        card_shadow = cards.first.evaluate("el => window.getComputedStyle(el).boxShadow")
        print(f"Card padding: {card_pad}")
        print(f"Card box-shadow: {card_shadow}")
        
        # Check inner card padding (p-8)
        inner_cards = page.locator(".card.p-8, .card.p-7, .card.p-6, .card.p-10")
        total_cards_with_padding = 0
        for i in range(cards.count()):
            cp = cards.nth(i).evaluate("el => window.getComputedStyle(el).padding")
            if cp != "0px":
                total_cards_with_padding += 1
        print(f"Cards with padding: {total_cards_with_padding}/{cards.count()}")
    
    # Check button padding
    btn_primary = page.locator(".btn-primary")
    if btn_primary.count() > 0:
        btn_pad = btn_primary.first.evaluate("el => window.getComputedStyle(el).padding")
        print(f"btn-primary padding: {btn_pad}")
    
    # Check heading sizes
    h2_first = page.locator("h2").first
    if h2_first.count() > 0:
        h2_fs = h2_first.evaluate("el => window.getComputedStyle(el).fontSize")
        print(f"First h2 fontSize: {h2_fs}")
    
    # Check centering
    centered = page.locator(".text-center")
    print(f".text-center elements: {centered.count()}")
    
    # Check overflow
    body_w = page.evaluate("() => document.body.scrollWidth")
    vp_w = page.evaluate("() => window.innerWidth")
    print(f"Desktop - body: {body_w}px, viewport: {vp_w}px, overflow: {body_w > vp_w}")
    
    # Full page screenshot
    page.screenshot(path=os.path.join(output_dir, "desktop_fixed_full.png"), full_page=True)
    
    # Section screenshots
    for sid in ["pain", "proof", "services", "how-it-works", "who", "testimonials", "audit", "faq", "cta"]:
        el = page.locator(f"#{sid}")
        if el.count() > 0:
            el.screenshot(path=os.path.join(output_dir, f"desktop_fixed_{sid}.png"))
    
    hero = page.locator("section").first
    if hero.count() > 0:
        hero.screenshot(path=os.path.join(output_dir, "desktop_fixed_hero.png"))
    
    browser.close()
    
    # Mobile
    browser2 = p.chromium.launch(headless=True)
    mp = browser2.new_page(viewport={"width": 375, "height": 812}, is_mobile=True, has_touch=True)
    mp.goto("http://localhost:5174", timeout=30000)
    mp.wait_for_load_state("networkidle")
    mp.wait_for_timeout(3000)
    
    print()
    print("=" * 60)
    print("MOBILE LAYOUT AUDIT (AFTER FIX)")
    print("=" * 60)
    
    # Check section padding on mobile
    for sid in ["pain", "proof", "services", "how-it-works", "who", "testimonials", "audit", "faq", "cta"]:
        el = mp.locator(f"#{sid}")
        if el.count() > 0:
            pt = el.evaluate("el => window.getComputedStyle(el).paddingTop")
            pb = el.evaluate("el => window.getComputedStyle(el).paddingBottom")
            print(f"#{sid} paddingTop: {pt}, paddingBottom: {pb}")
    
    # Check mobile overflow
    body_w_m = mp.evaluate("() => document.body.scrollWidth")
    vp_w_m = mp.evaluate("() => window.innerWidth")
    print(f"Mobile - body: {body_w_m}px, viewport: {vp_w_m}px, overflow: {body_w_m > vp_w_m}")
    
    mp.screenshot(path=os.path.join(output_dir, "mobile_fixed_full.png"), full_page=True)
    
    # Mobile section screenshots
    for sid in ["pain", "proof", "services", "how-it-works", "who", "testimonials", "audit", "faq", "cta"]:
        el = mp.locator(f"#{sid}")
        if el.count() > 0:
            el.screenshot(path=os.path.join(output_dir, f"mobile_fixed_{sid}.png"))
    
    hero_m = mp.locator("section").first
    if hero_m.count() > 0:
        hero_m.screenshot(path=os.path.join(output_dir, "mobile_fixed_hero.png"))
    
    browser2.close()
    print()
    print("DONE - All screenshots and audit complete!")