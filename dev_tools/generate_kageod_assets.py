import os
import sys
from nano_banana_generator import NanoBananaGenerator

# Initialize Generator
generator = NanoBananaGenerator()

# Common Style - FUTURISTIC BLACK & ORANGE
STYLE = "futuristic, black and orange aesthetic, high contrast, golden hour, cinematic, sleek, sharp, hyper-realistic, dark mode, neon orange highlights, volumetric fog"
NEGATIVE = "purple, violet, pink, blue, cartoon, low quality, blurry, distorted, ugly, text, watermark, bad anatomy, drawing, illustration, retro"

# Asset Definitions (FUTURISTIC & REALISTIC)
assets = [
    {
        "filename": "hero_landscape_scan",
        "prompt": f"A hyper-realistic wide shot of a surveyor standing on a mountain peak at sunset. The sky is a dramatic canvas of deep black clouds and fiery orange sun rays. No purple. The surveyor silhouette is sharp against the light. The landscape below is dark and moody. 8k resolution, raw photo, vivid colors, high contrast, {STYLE}"
    },
    {
        "filename": "service_staking_boundaries",
        "prompt": f"Close-up of a surveyor's prism pole glowing with an orange reflection from the sun. The background is a dark, shadowed construction site. The lighting is dramatic chiaroscuro (light and dark). The equipment looks high-tech and precise. 8k, macro photography, {STYLE}"
    },
    {
        "filename": "service_building_measurement",
        "prompt": f"A concrete building structure at twilight. The sky is burning orange, the building is silhouetted in black. Laser measurement lines (thin neon orange) visualize the geometry of the building. Futuristic architecture visualization, clean lines, dark atmosphere, {STYLE}"
    },
    {
        "filename": "service_geometric_plan",
        "prompt": f"A digital tablet displaying a glowing orange cadastral map, resting on a dark surface (carbon fiber texture). The screen emits a warm light. High-tech workspace, cyberpunk vibes but professional. 8k render, sharp focus on screen, {STYLE}"
    },
    {
        "filename": "about_equipment_gear",
        "prompt": f"A robotic total station in the dark, illuminated by a single beam of orange light. The lens reflects the golden horizon. Dust particles floating in the light beam. Cinematic product photography, mysterious, powerful, {STYLE}"
    },
    {
        "filename": "contact_abstract_map",
        "prompt": f"A pure black background with a glowing neon orange 3D topographic map. The lines are sharp and precise. Data nodes pulsate with yellow light. Matrix style but in orange/black. Futuristic interface background, 8k, minimal, {STYLE}"
    },
    {
        "filename": "bg_texture_dark",
        "prompt": f"Pure black texture with very faint, subtle warm grey geometric patterns or grid. Minimalist, dark, suitable for website background. No color noise, {STYLE}"
    },
    {
        "filename": "survey_drone_wide",
        "prompt": f"A black survey drone with orange LED lights hovering against a burning sunset sky. The city below is almost pitch black, only outlined by streetlights. Cinematic, dramatic, action shot, 8k, {STYLE}"
    },
    {
        "filename": "digital_terrain_model",
        "prompt": f"A digital wireframe landscape floating in a black void. The wireframe is glowing fiery orange and gold. High contrast data visualization. Scientific, accurate, futuristic, {STYLE}"
    },
    {
        "filename": "surveyor_forest_autumn",
        "prompt": f"A surveyor in a dark forest, backlit by intense orange sunset beams cutting through the trees. Silhouette style. Mysterious and atmospheric. 8k, nature and technology contrast, {STYLE}"
    }
]

# Output Directory
OUTPUT_DIR = os.path.join("Projects", "KaGeOd", "assets", "generated")
os.makedirs(OUTPUT_DIR, exist_ok=True)

print(f"Starting Generation of {len(assets)} assets for KaGeOd (FUTURISTIC ORANGE/BLACK)...")

for asset in assets:
    print(f"\nGenerating: {asset['filename']}...")
    result = generator.generate_image(
        prompt=asset['prompt'],
        negative_prompt=NEGATIVE,
        width=1920 if "hero" in asset['filename'] else 1024,
        height=1080 if "hero" in asset['filename'] else 1024,
        context_filename=asset['filename'],
        output_dir=OUTPUT_DIR,
        num_inference_steps=40,
        guidance_scale=8.0
    )
    print(f"Saved to: {result['path']}")

print("\nAll assets generated successfully!")
