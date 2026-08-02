import type React from "react";
import { IoIosClose } from "react-icons/io";

type Props = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
  onSelectRemove: () => void;
  onFocus: () => void;
  onBlur: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};
function Input({
  search,
  setSearch,
  onSelectRemove,
  onFocus,
  onBlur,
  placeholder,
  onKeyDown,
}: Props) {
  return (
    <div className="main-input-container">
      <input
        value={search}
        type="text"
        placeholder={placeholder}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearch(e.target.value)
        }
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={(e) => onKeyDown(e)}
      />
      <span
        onClick={() => onSelectRemove()}
        style={{ display: `${search.length == 0 ? "none" : "inline"}` }}
      >
        <IoIosClose size={30} />{" "}
      </span>
    </div>
  );
}

export default Input;
