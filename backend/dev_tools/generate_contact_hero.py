import os
from nano_banana_generator import NanoBananaGenerator

# Initialize Generator
generator = NanoBananaGenerator()

# Prompt for a professional contact page image - focus on phone/mobile consultation
prompt = "A close-up shot of a sleek, high-end smartphone lying on a dark wooden office desk. The phone screen is glowing, displaying a professional topographic 3D map interface. Next to the phone, there is a stylish notebook and a designer pen. The background is a soft-focus, premium modern office with elegant warm lighting accents. No surveying instruments visible. Cinematic photography, teal and orange color grading, ultra-realistic, 8k resolution, professional atmosphere."

# Output Directory
OUTPUT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "assets", "site_images"))
os.makedirs(OUTPUT_DIR, exist_ok=True)

print(f"Generating contact phone hero image using Nana Banana...")

result = generator.generate_image(
    prompt=prompt,
    negative_prompt="surveying station, tripod, total station, camera, gloomy, blurry, low resolution, simple, cartoon, fake, illustration, 3d render",
    width=1920,
    height=1080,
    context_filename="contact_hero_phone",
    output_dir=OUTPUT_DIR
)

print(f"Result: {result['status']}")
print(f"Saved to: {result['path']}")
