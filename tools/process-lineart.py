#!/usr/bin/env python3
"""
DrawPath Studio · Atomic Lineart Post-Processor & Verifier
Converts pure-white-background red/blue/ink textbook lineart into razor-sharp
transparent WebP plates using ImageMagick's exact white-unpremultiplication math.

Usage:
  python tools/process-lineart.py <input_image> <output_webp> [--max-dim 1200] [--pad 24]
  python tools/process-lineart.py --verify [plates_dir]
"""

from __future__ import annotations

import argparse
import os
import subprocess
import sys
from pathlib import Path


def run_magick(args: list[str]) -> subprocess.CompletedProcess[str]:
    cmd = ["magick", *args]
    res = subprocess.run(cmd, capture_output=True, text=True)
    if res.returncode != 0:
        raise RuntimeError(f"ImageMagick failed ({res.returncode}): {res.stderr.strip()}")
    return res


def process_single(
    src: Path,
    dst: Path,
    *,
    max_dim: int = 1200,
    pad: int = 24,
    quality: int = 90,
) -> None:
    if not src.exists():
        raise FileNotFoundError(f"Input not found: {src}")
    dst.parent.mkdir(parents=True, exist_ok=True)

    # Exact color-preserving white-to-alpha extraction:
    #   1. Normalize paper dust (any brightness >= 95% snaps to pure white).
    #   2. Trim excessive white border (with 3% fuzz) and re-pad evenly.
    #   3. Compute alpha = level(max(1-R, 1-G, 1-B)) so colored red/blue lines stay rich
    #      while background dust becomes 100% transparent.
    #   4. Unpremultiply RGB against white: C = 1 - (1 - P) / alpha, eliminating white halos
    #      even on dark-mode surfaces.
    #   5. Resize within max_dim preserving aspect ratio and encode crisp transparent WebP.
    cmd_args = [
        str(src),
        "-alpha", "off",
        "-colorspace", "sRGB",
        "-level", "0%,95%",
        "-fuzz", "3%",
        "-trim",
        "+repage",
        "-bordercolor", "#ffffff",
        "-border", f"{pad}x{pad}",
        "-resize", f"{max_dim}x{max_dim}>",
        "(",
        "+clone",
        "-negate",
        "-separate",
        "-evaluate-sequence", "max",
        "-level", "2%,88%",
        "-colorspace", "sRGB",
        ")",
        "(",
        "-clone", "0",
        "-negate",
        "-clone", "1",
        "-compose", "DivideSrc",
        "-composite",
        "-negate",
        ")",
        "-delete", "0",
        "+swap",
        "-alpha", "off",
        "-compose", "CopyOpacity",
        "-composite",
        "-define", "webp:alpha-quality=100",
        "-define", "webp:method=6",
        "-quality", str(quality),
        str(dst),
    ]
    run_magick(cmd_args)
    size_kb = dst.stat().st_size / 1024.0
    dims = run_magick(["identify", "-format", "%wx%h", str(dst)]).stdout.strip()
    print(f"[OK] {src.name} -> {dst} ({dims}, {size_kb:.1f} KB)")


def verify_directory(plates_dir: Path, max_kb: float = 220.0) -> int:
    if not plates_dir.exists():
        print(f"[FAIL] Plates directory not found: {plates_dir}")
        return 1

    files = sorted(plates_dir.rglob("*.webp"))
    if not files:
        print(f"[FAIL] No .webp files found in {plates_dir}")
        return 1

    failures = 0
    for path in files:
        size_kb = path.stat().st_size / 1024.0
        # Inspect dimensions, alpha channel existence, and corner alpha values
        info = run_magick([
            "identify",
            "-format",
            "%w %h %A %[fx:p{0,0}.a] %[fx:p{w-1,0}.a] %[fx:p{0,h-1}.a] %[fx:p{w-1,h-1}.a]",
            str(path),
        ]).stdout.strip().split()
        w, h, has_alpha = int(info[0]), int(info[1]), info[2]
        corner_alphas = [float(x) for x in info[3:7]]
        max_corner_alpha = max(corner_alphas)

        issues: list[str] = []
        if has_alpha.lower() not in ("blend", "true", "undefined", "copy"):
            issues.append(f"alpha={has_alpha}")
        if max_corner_alpha > 0.02:
            issues.append(f"non-transparent corner alpha={max_corner_alpha:.3f}")
        if size_kb > max_kb:
            issues.append(f"too large ({size_kb:.1f} KB > {max_kb:.0f} KB)")
        if w < 200 or h < 200:
            issues.append(f"low-res ({w}x{h})")

        if issues:
            failures += 1
            print(f"[FAIL] {path.relative_to(plates_dir)}: {', '.join(issues)}")
        else:
            print(f"[PASS] {path.relative_to(plates_dir)}: {w}x{h}, {size_kb:.1f} KB, corner_a={max_corner_alpha:.3f}")

    print(f"\nVerified {len(files)} WebP plate(s): {len(files) - failures} passed, {failures} failed.")
    return 1 if failures else 0


def main() -> int:
    parser = argparse.ArgumentParser(description="Process or verify transparent lineart WebP plates.")
    parser.add_argument("input", nargs="?", help="Input image path")
    parser.add_argument("output", nargs="?", help="Output .webp path")
    parser.add_argument("--max-dim", type=int, default=1200, help="Max width/height in px")
    parser.add_argument("--pad", type=int, default=24, help="Padding px around trimmed lineart")
    parser.add_argument("--quality", type=int, default=90, help="WebP quality (0-100)")
    parser.add_argument("--verify", action="store_true", help="Verify all .webp plates in directory")
    parser.add_argument("--dir", default="assets/plates", help="Directory to verify with --verify")
    args = parser.parse_args()

    if args.verify:
        return verify_directory(Path(args.dir))

    if not args.input or not args.output:
        parser.print_help()
        return 2

    process_single(
        Path(args.input),
        Path(args.output),
        max_dim=args.max_dim,
        pad=args.pad,
        quality=args.quality,
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
