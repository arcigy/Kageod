import os
from nano_banana_generator import NanoBananaGenerator

# Initialize Generator
generator = NanoBananaGenerator()

# Prompt for Geometric Plans - Technical/Paper/Drafting aesthetic
prompt = "A high-quality top-down professional shot of a geodetic geometric plan (technical drawing) on a desk next to a digital tablet displaying map coordinates. A professional drafting pen and a scale ruler are present. High-end, technical, precise aesthetic, soft architectural office lighting, 8k resolution."

# Output Directory
OUTPUT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "assets", "generated"))
os.makedirs(OUTPUT_DIR, exist_ok=True)

print(f"Generating geometric plan technical image...")

result = generator.generate_image(
    prompt=prompt,
    negative_prompt="cartoon, blurry, low quality, messy house, construction site, equipment, 3d render, bright colors",
    width=1024,
    height=1024,
    context_filename="service_geometric_plan_technical",
    output_dir=OUTPUT_DIR
)

print(f"Saved to: {result['path']}")
