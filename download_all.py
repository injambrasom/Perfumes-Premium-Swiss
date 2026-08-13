import urllib.request
import re
import os

url = 'https://postimg.cc/gallery/6NH8k0T'
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

os.makedirs('public/img', exist_ok=True)

try:
    req = urllib.request.Request(url, headers=headers)
    html = urllib.request.urlopen(req).read().decode('utf-8')
    
    # Extract image page links like https://postimg.cc/xxxxxxx
    page_links = re.findall(r'href="(https://postimg\.cc/[a-zA-Z0-9]{7,8})"', html)
    unique_page_links = sorted(list(set(page_links)))
    print(f"Found {len(unique_page_links)} image pages in gallery.")
    
    direct_urls = set()
    
    # Also find direct images already in gallery HTML
    direct_in_html = re.findall(r'https://i\.postimg\.cc/[a-zA-Z0-9]+/[^"\s\'<>]+', html)
    for d in direct_in_html:
        if not d.endswith('.th.png') and not d.endswith('.th.jpg'):
            direct_urls.add(d)
            
    for pl in unique_page_links:
        try:
            p_req = urllib.request.Request(pl, headers=headers)
            p_html = urllib.request.urlopen(p_req).read().decode('utf-8')
            # Look for direct image URL in main view page
            d_matches = re.findall(r'https://i\.postimg\.cc/[a-zA-Z0-9]+/[^"\s\'<>]+', p_html)
            for dm in d_matches:
                if not dm.endswith('.th.png') and not dm.endswith('.th.jpg'):
                    direct_urls.add(dm)
        except Exception as e:
            print(f"Error fetching page {pl}: {e}")

    print(f"Total direct image URLs found: {len(direct_urls)}")
    for u in sorted(list(direct_urls)):
        filename = u.split('/')[-1]
        dest = os.path.join('public/img', filename)
        try:
            img_req = urllib.request.Request(u, headers=headers)
            data = urllib.request.urlopen(img_req).read()
            with open(dest, 'wb') as f:
                f.write(data)
            print(f"Saved: {filename} ({len(data)} bytes)")
        except Exception as e:
            print(f"Error downloading {u}: {e}")

except Exception as e:
    print(f"Error processing gallery: {e}")
