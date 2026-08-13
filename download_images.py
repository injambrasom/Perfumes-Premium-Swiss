import urllib.request
import re
import os

url = 'https://postimg.cc/gallery/6NH8k0T'
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

req = urllib.request.Request(url, headers=headers)
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    # Find all direct links from postimg like https://i.postimg.cc/xxxx/FILENAME.png
    matches = re.findall(r'https://i\.postimg\.cc/[a-zA-Z0-9]+/[^"\s\'<>]+', html)
    unique_urls = list(set(matches))
    print(f"Total unique images found: {len(unique_urls)}")
    
    os.makedirs('public/img', exist_ok=True)
    
    downloaded = []
    for u in sorted(unique_urls):
        name = u.split('/')[-1]
        dest = os.path.join('public/img', name)
        try:
            img_req = urllib.request.Request(u, headers=headers)
            data = urllib.request.urlopen(img_req).read()
            with open(dest, 'wb') as f:
                f.write(data)
            print(f"Downloaded: {name} ({len(data)} bytes) from {u}")
            downloaded.append((name, u, dest))
        except Exception as e:
            print(f"Failed to download {u}: {e}")
            
except Exception as e:
    print(f"Error reading gallery page: {e}")
