import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  dragId: string;
  content: string;
  className: string;
}

const Item: React.FC<Props> = ({ dragId, content, className }) => {
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
        "my-3 flex flex-row justify-center rounded-sm bg-gradient-to-br from-[#035388] to-[#2BB0ED] align-middle  shadow-md" +
        " " +
        className
      }
    >
      <div className="flex flex-col justify-center border-r-2 px-1">
        <p className="text-white">30 min</p>
      </div>
      <div
        className={" h-[60px] flex-grow p-4 text-white "}
        data-id={dragId}
        {...attributes}
        {...listeners}
      >
        {content}
      </div>
    </div>
  );
};

export default Item;
