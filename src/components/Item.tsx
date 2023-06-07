import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  dragId: string;
  value: string;
  className: string;
}

const Item: React.FC<Props> = ({ dragId, value, className }) => {
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
      className={
        "my-3 h-[60px] rounded-sm p-4 text-white shadow-md" +
        " " +
        "bg-gradient-to-br from-[#7B93DB] to-[#BED0F7]" +
        " " +
        className
      }
      data-id={dragId}
      {...attributes}
      {...listeners}
    >
      Testing {value}
    </div>
  );
};

export default Item;
