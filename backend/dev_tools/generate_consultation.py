import os
from nano_banana_generator import NanoBananaGenerator

# Initialize Generator
generator = NanoBananaGenerator()

# Prompt from user request
prompt = "A professional land surveyor in a high-vis vest and hard hat shaking hands or pointing at a tablet screen explaining something to a client in casual business attire on a construction site or open field. Realistic photography, warm lighting, professional atmosphere, high quality, 4k."

# Output Directory
OUTPUT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "assets", "generated"))
os.makedirs(OUTPUT_DIR, exist_ok=True)

print(f"Generating consultation image...")

result = generator.generate_image(
    prompt=prompt,
    negative_prompt="cartoon, illustration, fake, low quality, blurry",
    width=1920,
    height=1080,
    context_filename="consultation_meeting",
    output_dir=OUTPUT_DIR
)

print(f"Saved to: {result['path']}")
