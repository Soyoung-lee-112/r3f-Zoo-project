import { useAnimations, useGLTF } from "@react-three/drei";
import { useContext, useEffect, useMemo, useRef } from "react";
import { SkeletonUtils } from "three-stdlib";
import { EditContext } from "../context/EditContext";
import { RigidBody } from "@react-three/rapier";

export const Animal = ({ name, objectId, onClick, position, ...props }) => {
  const group = useRef();
  const { scene, animations } = useGLTF(`models/animals/${name}.glb`);
  const clone = useMemo(() => SkeletonUtils.clone(scene), { scene });
  const { actions } = useAnimations(animations, group);

  const { isEditMode, selectedId, draggedPosition } = useContext(EditContext);
  const isSelected = objectId === selectedId;

  useEffect(() => {
    // console.log(actions);
    actions["Idle"].reset().play();
  }, [draggedPosition]);
  return (
    <>
      {isEditMode ? (
        <group
          scale={[2.5, 2.5, 2.5]}
          onClick={onClick(objectId)}
          position={isSelected ? draggedPosition : position}
          {...props}
          ref={group}
        >
          <mesh>
            <boxGeometry args={[3, 1, 4]} />
            <meshBasicMaterial transparent opacity={0.7} color={"green"} />
          </mesh>
          <primitive object={clone}></primitive>;
        </group>
      ) : (
        <RigidBody
          position={position}
          colliders={"hull"}
          enabledRotations={[false, false, false]}
        >
          <group {...props} ref={group}>
            <primitive object={clone}></primitive>;
          </group>
        </RigidBody>
      )}
    </>
  );
};
