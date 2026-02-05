import os
from nano_banana_generator import NanoBananaGenerator

# Initialize Generator
generator = NanoBananaGenerator()

# Prompt for "O nás" - Professional handshake representing trust and heritage
prompt = "Close-up cinematic shot of two men in professional outdoor gear shaking hands firmly. Only the hands and arms are visible. In the background, a professional geodetic total station on a tripod is blurred. Soft golden hour lighting, cinematic atmosphere, high-end photography, 8k resolution. Represents trust, partnership, and tradition."

# Output Directory
OUTPUT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "assets", "site_images"))
os.makedirs(OUTPUT_DIR, exist_ok=True)

print(f"Generating handshake trust image for About Us...")

result = generator.generate_image(
    prompt=prompt,
    negative_prompt="cartoon, blurry, low quality, faces, messy, bright colors, street, cars, urban, multiple people",
    width=1200,
    height=800,
    context_filename="about_handshake_trust",
    output_dir=OUTPUT_DIR
)

print(f"Saved to: {result['path']}")
