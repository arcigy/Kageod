import os
from nano_banana_generator import NanoBananaGenerator

# Initialize Generator
generator = NanoBananaGenerator()

# Prompt for "O nás" - Professional business handshake in suits, indoor setting
# Emphasizing corporate trust and professional agreements
prompt = "Ultra-professional close-up of two men in high-quality tailored business suits shaking hands. Only the hands and sleeves of the suits are visible. The background is a modern, minimalist corporate indoor setting with soft, clean architectural lighting. No geodetic equipment, no outdoor elements. Cinematic depth of field, sharp detail on the fabric and handshake, 8k resolution. Represents high-end business trust and official partnership."

# Output Directory (as requested, using site_images)
OUTPUT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "assets", "site_images"))
os.makedirs(OUTPUT_DIR, exist_ok=True)

print(f"Generating corporate handshake image for About Us...")

result = generator.generate_image(
    prompt=prompt,
    negative_prompt="nature, trees, grass, field, geodetic equipment, tripod, total station, faces, construction site, messy, casual clothes, outdoor",
    width=1200,
    height=800,
    context_filename="about_handshake_suits_indoor",
    output_dir=OUTPUT_DIR
)

print(f"Saved to: {result['path']}")
