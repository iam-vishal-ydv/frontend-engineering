import { useEffect, useRef } from "react";

type Recipe = {
  id: number;
  name: string;
  image: string;
  rating: number;
};
type ListingProps = {
  data: Recipe[];
  onSelect: (name: string) => void;
  selectedIndex: number;
};

function Listing({ data, onSelect, selectedIndex }: ListingProps) {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    itemRefs.current[selectedIndex]?.scrollIntoView({
      block: "nearest",
      behavior: "smooth",
    });
  }, [selectedIndex]);
  return (
    <>
      {data?.length ? (
        data.map((item, index) => (
          <div
            key={item.id}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            className={`listing-item ${selectedIndex === index ? "active" : ""}`}
            onMouseDown={() => onSelect(item.name)}
          >
            {item.name}
          </div>
        ))
      ) : (
        <div className="listing-item text-center">No data match</div>
      )}
    </>
  );
}

export default Listing;
