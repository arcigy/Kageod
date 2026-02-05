import os
from nano_banana_generator import NanoBananaGenerator

# Initialize Generator
generator = NanoBananaGenerator()

# Prompt for a highly realistic Leica/Trimble surveying setup
prompt = "Ultra-realistic close-up of a professional Trimble R12i GNSS receiver mounted on a surveying pole, held by a surveyor wearing high-visibility gear. In the background, a construction site with an excavator. Sharp detail on the GNSS antenna and controller screen. Daylight, high contrast, professional photography, 8k resolution, authentic surveying equipment."

# Output Directory
OUTPUT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "assets", "generated"))
os.makedirs(OUTPUT_DIR, exist_ok=True)

print(f"Generating realistic GPS/GNSS surveying pole image...")

result = generator.generate_image(
    prompt=prompt,
    negative_prompt="cartoon, blurry, low quality, abstract, futuristic glowing lines, fake equipment, clean studio shot",
    width=1024,
    height=1024,
    context_filename="service_gps_pole_realistic",
    output_dir=OUTPUT_DIR
)

print(f"Saved to: {result['path']}")
