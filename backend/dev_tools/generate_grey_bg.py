import os
from nano_banana_generator import NanoBananaGenerator

# Initialize Generator
generator = NanoBananaGenerator()

# Prompt for a neutral grey technical background
prompt = "Subtle dark charcoal grey matte texture with very faint, elegant technical grid lines and micro-dots. Minimalist, professional, high-end engineering aesthetic. Absolutely no colors, only shades of deep grey and charcoal. 4k resolution."

# Output Directory
OUTPUT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "assets", "generated"))
os.makedirs(OUTPUT_DIR, exist_ok=True)

print(f"Generating neutral grey tech background...")

result = generator.generate_image(
    prompt=prompt,
    negative_prompt="red, orange, lava, fire, glow, colorful, bright, blue, green, purple",
    width=1920,
    height=1080,
    context_filename="bg_texture_grey",
    output_dir=OUTPUT_DIR
)

print(f"Saved to: {result['path']}")
