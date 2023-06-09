import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  dragId: string;
  content: string;
  removeItem?: (id: string) => void;
  opacity: string;
}

const Item: React.FC<Props> = ({ dragId, content, removeItem, opacity }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: dragId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleRemove = () => {
    if (removeItem) {
      removeItem(dragId);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`my-3 flex flex-row justify-center rounded-sm bg-gradient-to-br from-[#035388] to-[#2BB0ED] align-middle  shadow-md ${opacity}`}
    >
      <div className="flex flex-col justify-center border-r-2 px-1">
        <p className="text-white">30 min</p>
      </div>
      <div
        className={"h-[60px] flex-grow p-4 text-white"}
        data-id={dragId}
        {...attributes}
        {...listeners}
      >
        {content}
      </div>
      <div className="grid grid-cols-1 grid-rows-2">
        <button className="w-5" onClick={handleRemove}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="icon-close fill-white transition-colors ease-in-out hover:fill-supportingRed6"
          >
            <path
              className="secondary"
              fill-rule="evenodd"
              d="M15.78 14.36a1 1 0 0 1-1.42 1.42l-2.82-2.83-2.83 2.83a1 1 0 1 1-1.42-1.42l2.83-2.82L7.3 8.7a1 1 0 0 1 1.42-1.42l2.83 2.83 2.82-2.83a1 1 0 0 1 1.42 1.42l-2.83 2.83 2.83 2.82z"
            />
          </svg>
        </button>
        <div className="rounded-sm" {...attributes} {...listeners} />
      </div>
    </div>
  );
};

export default Item;
