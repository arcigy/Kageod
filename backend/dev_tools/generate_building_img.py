import os
from nano_banana_generator import NanoBananaGenerator

# Initialize Generator
generator = NanoBananaGenerator()

# Prompt for surveying a finished building (kolaudácia)
prompt = "Professional geodetic measurement of a newly finished modern family house. A high-end total station on a tripod is positioned in the foreground, focusing on the house facade. The house is complete with a clean lawn and driveway. Authentic surveying workflow, sharp detail, cinematic architectural photography, blue hour lighting, 8k resolution."

# Output Directory
OUTPUT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "assets", "generated"))
os.makedirs(OUTPUT_DIR, exist_ok=True)

print(f"Generating realistic building measurement image...")

result = generator.generate_image(
    prompt=prompt,
    negative_prompt="construction site, mud, ruins, excavator, crane, messy, cartoon, blurry, low quality",
    width=1024,
    height=1024,
    context_filename="service_building_finished",
    output_dir=OUTPUT_DIR
)

print(f"Saved to: {result['path']}")
