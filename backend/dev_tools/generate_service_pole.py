import os
from nano_banana_generator import NanoBananaGenerator

# Initialize Generator
generator = NanoBananaGenerator()

# Prompt for a professional surveying rod/pole image
prompt = "A professional carbon fiber surveying pole with a precision prism on top, held vertically on a boundary stone in a lush green field. High-end surveying equipment, crisp detail, cinematic depth of field, blue hour lighting, 8k resolution, technical and precise aesthetic."

# Output Directory
OUTPUT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "assets", "generated"))
os.makedirs(OUTPUT_DIR, exist_ok=True)

print(f"Generating surveying pole image for boundary staking...")

result = generator.generate_image(
    prompt=prompt,
    negative_prompt="cartoon, blurry, low quality, messy, hands, people, bright colors",
    width=1024,
    height=1024,
    context_filename="service_staking_pole",
    output_dir=OUTPUT_DIR
)

print(f"Saved to: {result['path']}")
