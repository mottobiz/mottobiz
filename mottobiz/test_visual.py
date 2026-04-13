"""Visual verification script for Mottobiz website"""
from playwright.sync_api import sync_playwright
import os

def main():
    # Ensure screenshots directory exists
    os.makedirs('screenshots', exist_ok=True)
    
    with sync_playwright() as p:
        # Desktop screenshot (1920x1080)
        browser = p.chromium.launch(headless=True)
        
        # Desktop viewport
        context = browser.new_context(viewport={'width': 1920, 'height': 1080})
        page = context.new_page()
        page.goto('http://localhost:5174/')
        page.wait_for_load_state('networkidle')
        page.screenshot(path='screenshots/desktop-after-changes.png', full_page=True)
        print("Desktop screenshot saved: screenshots/desktop-after-changes.png")
        
        # Mobile viewport (iPhone 12 Pro)
        mobile_context = browser.new_context(viewport={'width': 390, 'height': 844})
        mobile_page = mobile_context.new_page()
        mobile_page.goto('http://localhost:5174/')
        mobile_page.wait_for_load_state('networkidle')
        mobile_page.screenshot(path='screenshots/mobile-after-changes.png', full_page=True)
        print("Mobile screenshot saved: screenshots/mobile-after-changes.png")
        
        # Tablet viewport (iPad Pro)
        tablet_context = browser.new_context(viewport={'width': 1024, 'height': 1366})
        tablet_page = tablet_context.new_page()
        tablet_page.goto('http://localhost:5174/')
        tablet_page.wait_for_load_state('networkidle')
        tablet_page.screenshot(path='screenshots/tablet-after-changes.png', full_page=True)
        print("Tablet screenshot saved: screenshots/tablet-after-changes.png")
        
        browser.close()
        print("\nAll screenshots captured successfully!")

if __name__ == '__main__':
    main()
