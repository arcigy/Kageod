import os
import mimetypes
from google import genai
from google.genai import types
from PIL import Image, ImageDraw

class NanoBananaGenerator:
    """
    Tool for generating images using the Nano Banana API (Google GenAI SDK).
    """
    def __init__(self, api_key=None, api_url=None):
        self.api_key = api_key or os.getenv("NANO_BANANA_API_KEY")
        if self.api_key:
            self.client = genai.Client(api_key=self.api_key)
        else:
            print("(!) WARNING: No API Key provided for Nano Banana.")
            self.client = None

    def generate_image(self, 
                       prompt: str, 
                       negative_prompt: str = "",
                       width: int = 1024,
                       height: int = 1024,
                       context_filename: str = "image",
                       output_dir: str = "./generated",
                       **kwargs
                       ):
        
        full_path = os.path.join(output_dir, f"{context_filename}.png")
        print(f"(!) NANO BANANA: Attempting Generation for {context_filename}...")

        if not self.client:
            return self._fallback_placeholder(full_path, width, height, context_filename)

        try:
            model = "gemini-3-pro-image-preview"
            contents = [
                types.Content(
                    role="user",
                    parts=[
                        types.Part.from_text(text=f"{prompt} (Negative prompt: {negative_prompt})"),
                    ],
                ),
            ]
            # User requested 4K. Trying higher resolution configuration.
            # Note: API might cap at 2048 or 1024.
            generate_content_config = types.GenerateContentConfig(
                response_modalities=["IMAGE", "TEXT"],
                image_config=types.ImageConfig(image_size="2048x2048"), # Attempting higher res
            )

            generated = False
            for chunk in self.client.models.generate_content_stream(
                model=model,
                contents=contents,
                config=generate_content_config,
            ):
                if (chunk.candidates is None or 
                    chunk.candidates[0].content is None or 
                    chunk.candidates[0].content.parts is None):
                    continue
                
                part = chunk.candidates[0].content.parts[0]
                
                if part.inline_data and part.inline_data.data:
                    data_buffer = part.inline_data.data
                    # Save file
                    with open(full_path, "wb") as f:
                        f.write(data_buffer)
                    print(f"(!) SUCCESS: Real Image Saved to {full_path}")
                    generated = True
                    break # Stop after first image
            
            if generated:
                return { "status": "success", "path": full_path }
            else:
                raise Exception("No image data received in stream.")

        except Exception as e:
            print(f"(!) REAL GENERATION FAILED: {e}")
            return self._fallback_placeholder(full_path, width, height, context_filename)

    def _fallback_placeholder(self, full_path, width, height, text_content):
        print("(!) FALLBACK: Generating Placeholder...")
        try:
            # Sunset Gradient Placeholder
            img = Image.new('RGB', (width, height), color=(255, 107, 107)) 
            d = ImageDraw.Draw(img)
            for i in range(height):
                r = int(255 - (i / height) * 100)
                g = int(107 - (i / height) * 50)
                b = int(107 + (i / height) * 100)
                d.line([(0, i), (width, i)], fill=(r, g, b))
            d.ellipse([width*0.7, height*0.1, width*0.9, height*0.3], fill=(255, 200, 100, 128))
            d.rectangle([0, 0, width, height], outline=(255, 255, 255), width=4)
            
            img.save(full_path)
            print(f"(!) SAVED: Placeholder image at {full_path}")
        except Exception as e:
            print(f"(!) CRITICAL ERROR generating placeholder: {e}")
            with open(full_path, 'wb') as f: f.write(b'error')
            
        return { "status": "fallback", "path": full_path }
