import os
from nano_banana_generator import NanoBananaGenerator

# Initialize Generator
generator = NanoBananaGenerator()

# Prompt for Geometric Plans - Professional office setting with CAD and paper drawings
prompt = "Professional geodetic office setting. On the desk, there is a large paper geometric plan (technical drawing) with stamps and red lines. Next to it, a large computer monitor displays professional CAD software (AutoCAD style) with a complex technical map or building plan. High-end workspace, architectural office lighting, sharp focus, cinematic atmosphere, 8k resolution, precise and technical geodetic environment."

# Output Directory
OUTPUT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "assets", "generated"))
os.makedirs(OUTPUT_DIR, exist_ok=True)

print(f"Generating geometric plan office image with CAD and paper...")

result = generator.generate_image(
    prompt=prompt,
    negative_prompt="cartoon, blurry, low quality, construction site, field work, outdoor, messy, bright colors, gaming pc, faces",
    width=1024,
    height=1024,
    context_filename="service_geometric_plan_office_cad",
    output_dir=OUTPUT_DIR
)

print(f"Saved to: {result['path']}")
