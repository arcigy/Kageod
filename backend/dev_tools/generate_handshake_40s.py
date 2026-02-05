import os
from nano_banana_generator import NanoBananaGenerator

# Initialize Generator
generator = NanoBananaGenerator()

# Prompt for "O nás" - Handshake between two 40-year-old men in a modern office
prompt = "Close-up of a firm handshake between two men in their 40s. They are wearing smart-casual clothing (e.g., a dark polo shirt and a crisp cotton button-down shirt). The setting is a bright, modern professional office with a hint of architectural plans or a computer monitor in the blurred background. Natural light, clean and professional atmosphere, sharp focus on the hands, cinematic depth of field, 8k resolution. Represents a deal between two modern professionals."

# Output Directory
OUTPUT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "assets", "site_images"))
os.makedirs(OUTPUT_DIR, exist_ok=True)

print(f"Generating modern office handshake image for About Us...")

result = generator.generate_image(
    prompt=prompt,
    negative_prompt="nature, forest, grass, field, old hands, wrinkled skin, teenagers, elderly people, business suits, ties, luxury boardroom, surveying equipment, tripod, total station, cartoon, blurry, low quality",
    width=1200,
    height=800,
    context_filename="about_handshake_office_40s",
    output_dir=OUTPUT_DIR
)

print(f"Saved to: {result['path']}")
