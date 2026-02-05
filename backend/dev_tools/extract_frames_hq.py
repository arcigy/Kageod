import cv2
import os

video_path = "assets/videjko1.mp4"
output_folder = "assets/site_images/hero_frames"

if not os.path.exists(output_folder):
    os.makedirs(output_folder)

# Clean existing frames
for f in os.listdir(output_folder):
    if f.endswith(".webp"):
        os.remove(os.path.join(output_folder, f))

cap = cv2.VideoCapture(video_path)
total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))

# Going for 150 frames for maximum density
target_frames = 150
# We want high quality, but full 4K (3840px) might be too slow for many devices to render on canvas
# Let's aim for a high-end 2560px (QHD) which looks 4K-sharp on most monitors but is vastly more performant
target_width = 2560

step = max(1, total_frames / target_frames)

print(f"Extracting {target_frames} HIGH-QUALITY frames (Width: {target_width}px)...")

saved_count = 0
while saved_count < target_frames:
    cap.set(cv2.CAP_PROP_POS_FRAMES, int(saved_count * step))
    success, image = cap.read()
    if not success:
        break
    
    # Calculate height to maintain aspect ratio
    height, width = image.shape[:2]
    new_height = int(height * (target_width / width))
    resized = cv2.resize(image, (target_width, new_height), interpolation=cv2.INTER_CUBIC)
    
    frame_name = f"frame_{saved_count:03d}.webp"
    # Quality 90 for that crystal clear look
    cv2.imwrite(os.path.join(output_folder, frame_name), resized, [cv2.IMWRITE_WEBP_QUALITY, 90])
    saved_count += 1

cap.release()
print(f"Successfully extracted {saved_count} HQ frames to {output_folder}")
