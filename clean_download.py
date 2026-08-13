import urllib.request
import re
import os
import shutil

url = 'https://postimg.cc/gallery/6NH8k0T'
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

out_dir = 'public/images'
if os.path.exists(out_dir):
    shutil.rmtree(out_dir)
os.makedirs(out_dir, exist_ok=True)

try:
    req = urllib.request.Request(url, headers=headers)
    html = urllib.request.urlopen(req).read().decode('utf-8')
    
    # Extract page links like https://postimg.cc/XXXXXX
    page_codes = re.findall(r'href="https://postimg\.cc/([a-zA-Z0-9]{7,8})"', html)
    unique_codes = sorted(list(set(page_codes)))
    print(f"Found {len(unique_codes)} image pages.")
    
    images_downloaded = {}
    
    for code in unique_codes:
        page_url = f'https://postimg.cc/{code}'
        try:
            p_req = urllib.request.Request(page_url, headers=headers)
            p_html = urllib.request.urlopen(p_req).read().decode('utf-8')
            
            # Find direct image URL in download button or img src
            match = re.search(r'https://i\.postimg\.cc/[a-zA-Z0-9]+/[^"\s\'<>]+?\.(?:png|jpg|jpeg|webp)', p_html)
            if match:
                img_url = match.group(0)
                raw_filename = img_url.split('/')[-1]
                # clean filename
                clean_filename = re.sub(r'[^a-zA-Z0-9\._-]', '', raw_filename)
                dest = os.path.join(out_dir, clean_filename)
                
                img_req = urllib.request.Request(img_url, headers=headers)
                data = urllib.request.urlopen(img_req).read()
                
                with open(dest, 'wb') as f:
                    f.write(data)
                
                print(f"✅ Downloaded ({len(data)} bytes): {clean_filename} from {img_url}")
                images_downloaded[clean_filename] = dest
        except Exception as e:
            print(f"❌ Error for page {code}: {e}")

    print(f"\nDone! Total images downloaded cleanly: {len(images_downloaded)}")

except Exception as e:
    print(f"Error scraping gallery: {e}")
