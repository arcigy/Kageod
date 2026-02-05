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

# Going for 200 frames for ULTIMATE smoothness
target_frames = 200
# High-end resolution for sharpness
target_width = 2560

step = max(1, total_frames / target_frames)

print(f"Extracting {target_frames} frames for ULTIMATE satisfying smoothness...")

saved_count = 0
while saved_count < target_frames:
    cap.set(cv2.CAP_PROP_POS_FRAMES, int(saved_count * step))
    success, image = cap.read()
    if not success:
        break
    
    height, width = image.shape[:2]
    new_height = int(height * (target_width / width))
    resized = cv2.resize(image, (target_width, new_height), interpolation=cv2.INTER_CUBIC)
    
    frame_name = f"frame_{saved_count:03d}.webp"
    cv2.imwrite(os.path.join(output_folder, frame_name), resized, [cv2.IMWRITE_WEBP_QUALITY, 92])
    saved_count += 1

cap.release()
print(f"Successfully extracted {saved_count} frames to {output_folder}")
