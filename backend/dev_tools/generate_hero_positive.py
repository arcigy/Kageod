import os
from nano_banana_generator import NanoBananaGenerator

# Initialize Generator
generator = NanoBananaGenerator()

# Prompt from user request
# "rozozstavane nieco, je tam nas pristroj na meranie a je západ slnka"
prompt = "A close-up of a professional surveying total station on a tripod at a construction site during a warm golden sunset. In the soft-focus background, the frame of a modern house under construction is visible. The scene is bathed in warm, positive, orange and gold sunlight. Hopeful and professional atmosphere. Realistic 4k photography, cinematic."

# Output Directory
OUTPUT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "assets", "generated"))
os.makedirs(OUTPUT_DIR, exist_ok=True)

print(f"Generating hero positive image...")

result = generator.generate_image(
    prompt=prompt,
    negative_prompt="dark, gloomy, storm, rain, night, illustration, 3d render, fake, cartoon, blurry, low resolution",
    width=1920,
    height=1080,
    context_filename="hero_construction_sunset",
    output_dir=OUTPUT_DIR
)

print(f"Saved to: {result['path']}")
