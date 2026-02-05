import os
from nano_banana_generator import NanoBananaGenerator

# Initialize Generator
generator = NanoBananaGenerator()

# Prompt for a professional geodesy services header image
prompt = "Professional geodesy surveying equipment (total station/theodolite) on a tripod in a modern architectural site during blue hour. Sharp focus on the hardware, bokeh background with construction lights. High-end, cinematic lighting, 8k resolution, technical and precise aesthetic."

# Output Directory
OUTPUT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "assets", "generated"))
os.makedirs(OUTPUT_DIR, exist_ok=True)

print(f"Generating geodesy services hero image...")

result = generator.generate_image(
    prompt=prompt,
    negative_prompt="cartoon, blurry, low quality, messy, bright colors, day time solar flare",
    width=1920,
    height=800,
    context_filename="services_hero",
    output_dir=OUTPUT_DIR
)

print(f"Saved to: {result['path']}")
