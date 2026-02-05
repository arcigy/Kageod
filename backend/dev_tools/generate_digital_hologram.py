import os
from nano_banana_generator import NanoBananaGenerator

# Initialize Generator
generator = NanoBananaGenerator()

# Prompt from user request
# "hologram in heavenly blue, digitalization theme"
prompt = "A stunning 3D holographic wireframe map of a terrain topography floating in the air. The hologram is composed of glowing celestial blue (heavenly blue) and cyan neon lines. High-tech digitalization concept showing data points and digital grid. Dark, sleek background to make the blue pop. 4k resolution, cinematic, futuristic, sci-fi interface style."

# Output Directory
OUTPUT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "assets", "generated"))
os.makedirs(OUTPUT_DIR, exist_ok=True)

print(f"Generating digital hologram image...")

result = generator.generate_image(
    prompt=prompt,
    negative_prompt="orange, red, warm colors, low quality, blurry, cartoon, illustration, drawing, cluttered",
    width=1920,
    height=1080,
    context_filename="digital_future_hologram",
    output_dir=OUTPUT_DIR
)

print(f"Saved to: {result['path']}")
