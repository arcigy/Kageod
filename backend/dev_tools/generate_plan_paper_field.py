import os
from nano_banana_generator import NanoBananaGenerator

# Initialize Generator
generator = NanoBananaGenerator()

# Prompt for Geometric Plans - Combining field work with physical technical drawings
prompt = "A professional geodetic geometric plan (paper drawing) being held by a surveyor in a field. In the background, a professional total station on a tripod is visible. The focus is on the intricate lines and stamps of the geodetic document. Blue hour lighting, high-end technical feel, cinematic photography, 8k resolution, authentic surveying workflow."

# Output Directory
OUTPUT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "assets", "generated"))
os.makedirs(OUTPUT_DIR, exist_ok=True)

print(f"Generating geometric plan with physical paper drawing in field...")

result = generator.generate_image(
    prompt=prompt,
    negative_prompt="cartoon, blurry, low quality, office desk, indoor, messy, tablet only, no background, bright sunlight",
    width=1024,
    height=1024,
    context_filename="service_geometric_plan_with_paper",
    output_dir=OUTPUT_DIR
)

print(f"Saved to: {result['path']}")
