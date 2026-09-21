// Rotates a base (dx, dz) input vector to match the camera's current
// orientation, so WASD stays relative to what's on screen instead of
// fixed to world axes — otherwise "forward" silently changes meaning
// every time the camera rotates.
export function rotateInput(dx: number, dz: number, angle: number) {
  const cos = Math.round(Math.cos(angle));
  const sin = Math.round(Math.sin(angle));
  return {
    dx: Math.round(dx * cos + dz * sin),
    dz: Math.round(-dx * sin + dz * cos),
  };
}
