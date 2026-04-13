from playwright.sync_api import sync_playwright
import json

def check_layout(page, name, viewport_desc):
    results = []
    
    # Check all sections have text-center or centered content
    sections = page.locator("section")
    section_count = sections.count()
    results.append(f"{viewport_desc}: Found {section_count} sections")
    
    # Check Pain section centering
    pain = page.locator("#pain")
    if pain.count() > 0:
        pain_text = pain.evaluate("el => window.getComputedStyle(el).textAlign")
        pain_inner = pain.locator(".max-w-5xl")
        if pain_inner.count() > 0:
            inner_align = pain_inner.evaluate("el => window.getComputedStyle(el).textAlign")
            results.append(f"Pain section inner textAlign: {inner_align}")
    
    # Check card padding
    cards = page.locator(".card")
    card_count = cards.count()
    results.append(f"Found {card_count} cards")
    
    if card_count > 0:
        first_card = cards.first
        card_padding = first_card.evaluate("el => window.getComputedStyle(el).padding")
        card_shadow = first_card.evaluate("el => window.getComputedStyle(el).boxShadow")
        card_border_radius = first_card.evaluate("el => window.getComputedStyle(el).borderRadius")
        results.append(f"First card padding: {card_padding}")
        results.append(f"First card box-shadow: {card_shadow}")
        results.append(f"First card border-radius: {card_border_radius}")
    
    # Check button padding
    btn_primary = page.locator(".btn-primary")
    if btn_primary.count() > 0:
        btn_pad = btn_primary.first.evaluate("el => window.getComputedStyle(el).padding")
        btn_fs = btn_primary.first.evaluate("el => window.getComputedStyle(el).fontSize")
        results.append(f"btn-primary padding: {btn_pad}, fontSize: {btn_fs}")
    
    # Check section py (padding-top/bottom)
    for sid in ["pain", "proof", "services", "how-it-works", "who", "testimonials", "audit", "faq", "cta"]:
        el = page.locator(f"#{sid}")
        if el.count() > 0:
            pt = el.evaluate("el => window.getComputedStyle(el).paddingTop")
            pb = el.evaluate("el => window.getComputedStyle(el).paddingBottom")
            results.append(f"#{sid} paddingTop: {pt}, paddingBottom: {pb}")
    
    # Check heading sizes
    h2s = page.locator("h2")
    h2_count = h2s.count()
    results.append(f"Found {h2_count} h2 headings")
    if h2_count > 0:
        h2_fs = h2s.first.evaluate("el => window.getComputedStyle(el).fontSize")
        results.append(f"First h2 fontSize: {h2_fs}")
    
    # Check that content is centered (max-w containers have mx-auto)
    centered_containers = page.locator(".max-w-5xl, .max-w-6xl, .max-w-4xl, .max-w-3xl, .max-w-xl")
    cc_count = centered_containers.count()
    results.append(f"Found {cc_count} max-w centered containers")
    
    # Check text-center on sections
    text_center_els = page.locator(".text-center")
    tc_count = text_center_els.count()
    results.append(f"Found {tc_count} .text-center elements")
    
    # Check mobile viewport width vs content overflow
    body_width = page.evaluate("() => document.body.scrollWidth")
    viewport_width = page.evaluate("() => window.innerWidth")
    overflow = body_width > viewport_width
    results.append(f"body scrollWidth: {body_width}, viewport: {viewport_width}, overflow: {overflow}")
    
    # Check card hover transform
    if card_count > 0:
        card_transform = cards.first.evaluate("el => window.getComputedStyle(el).transform")
        results.append(f"Card initial transform: {card_transform}")
        # Hover
        cards.first.hover()
        page.wait_for_timeout(500)
        card_hover_transform = cards.first.evaluate("el => window.getComputedStyle(el).transform")
        card_hover_shadow = cards.first.evaluate("el => window.getComputedStyle(el).boxShadow")
        results.append(f"Card hover transform: {card_hover_transform}")
        results.append(f"Card hover box-shadow: {card_hover_shadow}")
    
    return results

with sync_playwright() as p:
    # Desktop
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    page.goto("http://localhost:5174", timeout=30000)
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)
    
    print("=" * 60)
    print("DESKTOP (1440x900) LAYOUT AUDIT")
    print("=" * 60)
    desktop_results = check_layout(page, "desktop", "DESKTOP")
    for r in desktop_results:
        print(r)
    
    browser.close()
    
    # Mobile
    browser2 = p.chromium.launch(headless=True)
    mp = browser2.new_page(viewport={"width": 375, "height": 812}, is_mobile=True, has_touch=True)
    mp.goto("http://localhost:5174", timeout=30000)
    mp.wait_for_load_state("networkidle")
    mp.wait_for_timeout(2000)
    
    print()
    print("=" * 60)
    print("MOBILE (375x812) LAYOUT AUDIT")
    print("=" * 60)
    mobile_results = check_layout(mp, "mobile", "MOBILE")
    for r in mobile_results:
        print(r)
    
    browser2.close()