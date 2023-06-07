import React from "react";
import { useDroppable } from "@dnd-kit/core";

interface Props {
  children: React.ReactNode;
}

export default function Droppable(props: Props) {
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable",
  });
  const style = {
    color: isOver ? "green" : undefined,
  };

  return (
    <div
      className="flex flex-col rounded-md bg-neutral8 p-3"
      ref={setNodeRef}
      style={style}
    >
      {props.children}
    </div>
  );
}
