import os
from nano_banana_generator import NanoBananaGenerator

# Initialize Generator
generator = NanoBananaGenerator()

# Prompt for Geometric Plans - Field context to match the "format" of the others
prompt = "Professional geodetic surveying setup in an open field, showing a surveyor in a high-vis vest using a total station on a tripod to map out a boundary division. He is looking at a digital tablet with a technical plan on screen. Scenic landscape, blue hour lighting, sharp focus, cinematic photography, high-end technical feel, 8k resolution."

# Output Directory
OUTPUT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "assets", "generated"))
os.makedirs(OUTPUT_DIR, exist_ok=True)

print(f"Generating geometric plan field image...")

result = generator.generate_image(
    prompt=prompt,
    negative_prompt="cartoon, blurry, low quality, desk, paper, indoor, drafting, office, messy, close-up only",
    width=1024,
    height=1024,
    context_filename="service_geometric_plan_field",
    output_dir=OUTPUT_DIR
)

print(f"Saved to: {result['path']}")
