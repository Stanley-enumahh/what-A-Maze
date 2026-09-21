// import "@react-three/fiber";

// interface Props {
//   center: [number, number, number];
// }

// // A large, dim plane beneath the level so tiles read as "resting on
// // something" instead of floating in pure black. Positioned at the level's
// // center so it stays under the level regardless of level size/position.
// export function GroundPlane({ center }: Props) {
//   return (
//     <mesh position={[center[0], -1, center[2]]} rotation={[-Math.PI / 2, 0, 0]}>
//       <planeGeometry args={[60, 60]} />
//       <meshStandardMaterial color="#2e2e61" />
//     </mesh>
//   );
// }

import "@react-three/fiber";

interface Props {
  center: [number, number, number];
}

export function GroundPlane({ center }: Props) {
  return (
    <mesh position={[center[0], -4, center[2]]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[60, 60]} />
      <meshStandardMaterial color="#1f1f46" />
    </mesh>
  );
}
