import os
from nano_banana_generator import NanoBananaGenerator

# Initialize Generator
generator = NanoBananaGenerator()

# Prompt for a more "authentic" and "human" About Us image
# Focusing on a single experienced geodetic surveyor with a total station in a beautiful landscape
prompt = "Close-up of an experienced geodetic surveyor in professional high-visibility gear adjusting a high-precision total station on a wooden tripod. Background features a scenic green valley with misty mountains, morning golden hour light. Sharp focus on the equipment and the surveyor's hands, cinematic depth of field, 8k resolution, authentic geodetic fieldwork."

# Output Directory
OUTPUT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "assets", "generated"))
os.makedirs(OUTPUT_DIR, exist_ok=True)

print(f"Generating authentic surveyor at work image...")

result = generator.generate_image(
    prompt=prompt,
    negative_prompt="cartoon, blurry, low quality, messy, multiple people, city, cars, futuristic glowing effects, fake tools",
    width=1200,
    height=800,
    context_filename="about_surveyor_authentic",
    output_dir=OUTPUT_DIR
)

print(f"Saved to: {result['path']}")
