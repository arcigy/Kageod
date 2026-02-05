import os
from nano_banana_generator import NanoBananaGenerator

# Initialize Generator
generator = NanoBananaGenerator()

# Prompt for a GNSS rover on a real property plot
prompt = "Close-up of a professional GNSS surveying rover (GPS pole) being used to mark a corner point on a residential property. The pole is placed on a lush green grass field with a blurred house or property fence in the background. High-quality surveying equipment, sunlight, professional photography, 8k resolution, authentic and precise geodetic workflow."

# Output Directory
OUTPUT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "assets", "generated"))
os.makedirs(OUTPUT_DIR, exist_ok=True)

print(f"Generating realistic GPS surveying pole on a plot image...")

result = generator.generate_image(
    prompt=prompt,
    negative_prompt="construction site, excavator, mud, ruins, crane, industrial, cartoon, blurry, low quality",
    width=1024,
    height=1024,
    context_filename="service_gps_plot_realistic",
    output_dir=OUTPUT_DIR
)

print(f"Saved to: {result['path']}")
