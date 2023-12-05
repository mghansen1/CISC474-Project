import argparse
from PIL import Image, ImageSequence

# Function to break a GIF into individual frames
def break_gif_into_frames(gif_path):
    gif = Image.open(gif_path)
    frames = [frame.copy() for frame in ImageSequence.Iterator(gif)]
    print(f'Number of Frames: {gif.n_frames}')
    return frames

#Creates a sprite sheet from frames
def create_sprite_sheet(frames, output_path):

    total_width = sum(frame.width for frame in frames)
    max_height = max(frame.height for frame in frames)

    # Create a new blank image (sprite sheet) with appropriate dimensions
    sprite_sheet = Image.new('RGBA', (total_width, max_height), (0, 0, 0, 0))

    # Paste frames horizontally into the sprite sheet
    x_offset = 0
    for frame in frames:
        sprite_sheet.paste(frame, (x_offset, 0))
        x_offset += frame.width

    # Save the sprite sheet
    sprite_sheet.save(output_path)

# Parse command-line arguments
parser = argparse.ArgumentParser(description='Convert GIF to sprite sheet')
parser.add_argument('input_gif', help='Input GIF file')
parser.add_argument('--output_sprite_sheet', required=False, help='Output sprite sheet file')
args = parser.parse_args()

if __name__ == "__main__":
    input_gif_path = args.input_gif
    if (args.output_sprite_sheet):
        output_sprite_sheet_path = args.output_sprite_sheet
    else: # Save unspecified sprite sheets as a .png
        output_sprite_sheet_path = args.input_gif.split(".")[0] + ".png" 
        

    frames = break_gif_into_frames(input_gif_path)
    create_sprite_sheet(frames, output_sprite_sheet_path)

# Use Script
# >> python gif2sprite.py <input>.gif <chosen output name (optional)>.<jpeg, png>