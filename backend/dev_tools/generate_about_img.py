import os
from nano_banana_generator import NanoBananaGenerator

# Initialize Generator
generator = NanoBananaGenerator()

# Prompt for "O nás" - Combining heritage (since 1990) with modern precision
prompt = "Cinematic wide shot of a team of professional surveyors in high-visibility gear working with high-end total stations in a scenic landscape during golden hour. The image should convey experience, trust, and advanced technology. Professional architecture photography style, sharp focus, 8k resolution, cinematic lighting."

# Output Directory
OUTPUT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "assets", "generated"))
os.makedirs(OUTPUT_DIR, exist_ok=True)

print(f"Generating cinematic team/about image...")

result = generator.generate_image(
    prompt=prompt,
    negative_prompt="cartoon, blurry, low quality, messy, bright colors, street, cars, urban",
    width=1200,
    height=800,
    context_filename="about_team_cinematic",
    output_dir=OUTPUT_DIR
)

print(f"Saved to: {result['path']}")
