import { useAnimations, useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useContext, useEffect, useMemo, useRef } from "react";
import { SkeletonUtils } from "three-stdlib";
import { EditContext } from "../context/EditContext";

export const Dino = ({ name, objectId, onClick, position, ...props }) => {
  const group = useRef();
  const { scene, animations } = useGLTF(`models/dinos/${name}.glb`);
  const clone = useMemo(() => SkeletonUtils.clone(scene), { scene });
  const { actions } = useAnimations(animations, group);

  const { isEditMode, selectedId, draggedPosition } = useContext(EditContext);
  const isSelected = objectId === selectedId;

  useEffect(() => {
    // console.log(actions);
    actions[`Armature|${name}_Idle`].reset().play();
  }, [draggedPosition]);

  return (
    <>
      {isEditMode ? (
        <group
          scale={[1.5, 1.5, 1.5]}
          onClick={onClick(objectId)}
          position={isSelected ? draggedPosition : position}
          {...props}
          ref={group}
        >
          <mesh>
            <boxGeometry args={[6, 1, 8]} />
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
