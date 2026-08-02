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
  return (
    <>
      {data?.length ? (
        data.map((item, index) => (
          <div
            key={item.id}
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
