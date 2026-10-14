"""Post-process a raw browser screenshot into public/screenshots/<id>.png (Sprint §7.1).

Coordinates are in the viewport frame the screenshot tool reports (vw x vh); they are scaled to the image.
Usage:
  python dev/script/shot.py <raw.png> <id> --vw 1920 --vh 945 [--crop x0,y0,x1,y1] [--box x0,y0,x1,y1] [--redact x0,y0,x1,y1 ...]
"""
import argparse
import os

from PIL import Image, ImageDraw

MAX_W = 1280
MAX_BYTES = 200 * 1024


def rect(s):
    return tuple(float(v) for v in s.split(','))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('raw')
    ap.add_argument('id')
    ap.add_argument('--vw', type=float, required=True)
    ap.add_argument('--vh', type=float, required=True)
    ap.add_argument('--crop', type=rect)
    ap.add_argument('--box', type=rect)
    ap.add_argument('--redact', type=rect, nargs='*', default=[])
    a = ap.parse_args()

    img = Image.open(a.raw).convert('RGB')
    sx, sy = img.width / a.vw, img.height / a.vh
    sc = lambda r: (r[0] * sx, r[1] * sy, r[2] * sx, r[3] * sy)
    d = ImageDraw.Draw(img)
    for r in a.redact:
        d.rectangle(sc(r), fill=(200, 200, 200))
    if a.box:
        w = max(3, int(4 * sx))
        x0, y0, x1, y1 = sc(a.box)
        d.rectangle((x0 - w, y0 - w, x1 + w, y1 + w), outline=(229, 57, 53), width=w)
    if a.crop:
        img = img.crop(tuple(int(v) for v in sc(a.crop)))
    if img.width > MAX_W:
        img = img.resize((MAX_W, int(img.height * MAX_W / img.width)), Image.LANCZOS)

    out = os.path.join('public', 'screenshots', a.id + '.png')
    for colors in (256, 128, 64):
        img.quantize(colors=colors, method=Image.Quantize.MEDIANCUT).save(out, optimize=True)
        if os.path.getsize(out) <= MAX_BYTES:
            break
    print(out, img.size, os.path.getsize(out), 'bytes')


if __name__ == '__main__':
    main()
