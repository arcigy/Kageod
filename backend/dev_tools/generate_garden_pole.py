import os
from nano_banana_generator import NanoBananaGenerator

# Initialize Generator
generator = NanoBananaGenerator()

# Prompt for a surveying pole (výtyčka) in a garden setting for fence staking
prompt = "Professional geodetic surveying pole with a glass prism on top, held precisely on a grass lawn in a residential garden. The scene shows the process of staking out a new fence line where no old fence exists. Soft daylight, realistic garden background with trees and bushes, high-quality surveying equipment, 8k resolution, cinematic photography."

# Output Directory
OUTPUT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "assets", "generated"))
os.makedirs(OUTPUT_DIR, exist_ok=True)

print(f"Generating surveying pole in garden image for fence staking...")

result = generator.generate_image(
    prompt=prompt,
    negative_prompt="total station, tripod, construction site, excavator, mud, ruins, crane, industrial, cartoon, blurry, low quality",
    width=1024,
    height=1024,
    context_filename="service_pole_garden_fence",
    output_dir=OUTPUT_DIR
)

print(f"Saved to: {result['path']}")
