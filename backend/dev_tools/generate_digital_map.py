import os
from nano_banana_generator import NanoBananaGenerator

# Initialize Generator
generator = NanoBananaGenerator()

# Prompt from user request
# "kartografická mapa, nebeská modrá, hologram"
prompt = "A futuristic digital cartographic map floating in a void. Deeply detailed topographic contour lines glowing in heavenly blue and cyan neon. Digital grid overlays, GPS coordinates, elevation numbers. A clean, professional, high-tech aesthetic. 4k, cinematic depth of field, sleek dark background."

# Output Directory
OUTPUT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "assets", "generated"))
os.makedirs(OUTPUT_DIR, exist_ok=True)

print(f"Generating digital map hologram...")

result = generator.generate_image(
    prompt=prompt,
    negative_prompt="orange, red, warm colors, low quality, blurry, cartoon, illustration, drawing, cluttered, physical paper",
    width=1920,
    height=1080,
    context_filename="digital_future_hologram",
    output_dir=OUTPUT_DIR
)

print(f"Saved to: {result['path']}")
