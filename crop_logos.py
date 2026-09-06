import sys
try:
    from PIL import Image
    
    img = Image.open('public/images/logo e palette SYNCRO TECH.png')
    width, height = img.size
    print(f"Original size: {width}x{height}")
    
    # Let's crop manually based on estimated relative positions.
    # 1. Logo (Simbolo) - top left
    # It's in the left third, from top to roughly middle.
    left1, top1, right1, bottom1 = int(width*0.05), int(height*0.1), int(width*0.3), int(height*0.6)
    simbolo = img.crop((left1, top1, right1, bottom1))
    # We should trim transparent/background space if possible, but let's just save the crop for now.
    
    # 2. Logo con scritte sotto - top middle
    left2, top2, right2, bottom2 = int(width*0.35), int(height*0.1), int(width*0.65), int(height*0.6)
    vertical = img.crop((left2, top2, right2, bottom2))
    
    # 4. Logo con scritte accanto - bottom left
    left3, top3, right3, bottom3 = int(width*0.05), int(height*0.65), int(width*0.65), int(height*0.95)
    horizontal = img.crop((left3, top3, right3, bottom3))
    
    # Convert black background to transparent for better integration
    def make_bg_transparent(image):
        image = image.convert("RGBA")
        datas = image.getdata()
        new_data = []
        for item in datas:
            # Change all very dark pixels to transparent
            if item[0] < 15 and item[1] < 15 and item[2] < 20:
                new_data.append((0, 0, 0, 0))
            else:
                new_data.append(item)
        image.putdata(new_data)
        # crop bounding box
        return image.crop(image.getbbox())
        
    make_bg_transparent(simbolo).save('public/images/logo-simbolo.png')
    make_bg_transparent(vertical).save('public/images/logo-vertical.png')
    make_bg_transparent(horizontal).save('public/images/logo-horizontal.png')
    
    print("Logos successfully cropped and saved.")
except ImportError:
    print("Pillow not installed. Please install it.")
