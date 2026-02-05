import os
from nano_banana_generator import NanoBananaGenerator

# Initialize Generator
generator = NanoBananaGenerator()

# Prompt for an older total station in a meadow/field
prompt = "A slightly older professional Leica/Topcon total station on a heavy wooden tripod, set up in a vast green meadow or field with distant hills. Authentic surveying scene from the 2000s or 2010s. The equipment looks well-maintained but used. Soft natural daylight, realistic photography, sharp focus on the optic, 8k resolution."

# Output Directory
OUTPUT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "assets", "generated"))
os.makedirs(OUTPUT_DIR, exist_ok=True)

print(f"Generating classic total station in a meadow image...")

result = generator.generate_image(
    prompt=prompt,
    negative_prompt="modern digital high-tech GPS, futuristic, construction site, buildings, excavator, carbon fiber, newest model",
    width=1024,
    height=1024,
    context_filename="service_classic_station_meadow",
    output_dir=OUTPUT_DIR
)

print(f"Saved to: {result['path']}")
