from playwright.sync_api import sync_playwright
import os

output_dir = r"D:\IDEprojects\Mottobiz\screenshots"
os.makedirs(output_dir, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    page.goto("http://localhost:5174", timeout=30000)
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)
    page.screenshot(path=os.path.join(output_dir, "desktop_full.png"), full_page=True)
    
    sections = ["pain", "proof", "services", "how-it-works", "who", "testimonials", "audit", "faq", "cta"]
    for sid in sections:
        try:
            el = page.locator(f"#{sid}")
            if el.count() > 0:
                el.screenshot(path=os.path.join(output_dir, f"desktop_{sid}.png"))
                print(f"OK desktop #{sid}")
        except Exception as e:
            print(f"Skip desktop #{sid}: {e}")
    
    try:
        hero = page.locator("section").first
        hero.screenshot(path=os.path.join(output_dir, "desktop_hero.png"))
        print("OK desktop hero")
    except Exception as e:
        print(f"Skip hero: {e}")
    
    browser.close()

    browser2 = p.chromium.launch(headless=True)
    mp = browser2.new_page(viewport={"width": 375, "height": 812}, is_mobile=True, has_touch=True)
    mp.goto("http://localhost:5174", timeout=30000)
    mp.wait_for_load_state("networkidle")
    mp.wait_for_timeout(2000)
    mp.screenshot(path=os.path.join(output_dir, "mobile_full.png"), full_page=True)
    
    for sid in sections:
        try:
            el = mp.locator(f"#{sid}")
            if el.count() > 0:
                el.screenshot(path=os.path.join(output_dir, f"mobile_{sid}.png"))
                print(f"OK mobile #{sid}")
        except Exception as e:
            print(f"Skip mobile #{sid}: {e}")
    
    try:
        hero = mp.locator("section").first
        hero.screenshot(path=os.path.join(output_dir, "mobile_hero.png"))
        print("OK mobile hero")
    except Exception as e:
        print(f"Skip mobile hero: {e}")
    
    browser2.close()
    print("All screenshots done!")