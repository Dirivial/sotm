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
      className="my-3 h-[60px] rounded-sm bg-primary6 p-4 text-white shadow-md"
      data-id={dragId}
      {...attributes}
      {...listeners}
    >
      testing{dragId}
    </div>
  );
};

export default Item;
