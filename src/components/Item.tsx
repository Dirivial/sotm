import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  dragId: string;
}

const Item: React.FC<Props> = ({ dragId }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: dragId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-primary6"
      data-id={dragId}
      {...attributes}
      {...listeners}
    >
      testing{dragId}
    </div>
  );
};

export default Item;
