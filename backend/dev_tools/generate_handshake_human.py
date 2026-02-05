import os
from nano_banana_generator import NanoBananaGenerator

# Initialize Generator
generator = NanoBananaGenerator()

# Prompt for "O nás" - Authentic handshake between two normal people in smart-casual/semi-formal attire
# Aiming for trust and humanity, not overly corporate lawyer look
prompt = "Close-up of two authentic-looking men in smart-casual attire (e.g., a high-quality button-down shirt and a semi-formal sweater or fleece jacket) shaking hands warmly. One hand is slightly weathered, suggesting real experience. Indoor setting, soft natural light through a window, minimalist but warm office background. No suits, no ties, no surveying tools. Focus on the firm, honest handshake. Cinematic depth of field, 8k resolution, realistic and human feel."

# Output Directory
OUTPUT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "assets", "site_images"))
os.makedirs(OUTPUT_DIR, exist_ok=True)

print(f"Generating authentic semi-formal handshake image for About Us...")

result = generator.generate_image(
    prompt=prompt,
    negative_prompt="business suits, silk ties, cufflinks, corporate lobbyists, lawyers, luxury boardroom, nature, field, surveying equipment, cartoon, blurry, low quality",
    width=1200,
    height=800,
    context_filename="about_handshake_authentic_human",
    output_dir=OUTPUT_DIR
)

print(f"Saved to: {result['path']}")
