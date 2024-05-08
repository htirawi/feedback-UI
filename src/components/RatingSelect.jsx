const RatingSelect = ({ selected, select }) => {
  const handleChange = ({ target: { value } }) => {
    select(Number(value));
  };

  return (
    <ul className="rating">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
        <li key={value}>
          <input
            type="radio"
            id={`rating-${value}`}
            name="rating"
            value={value}
            checked={selected === value}
            onChange={handleChange}
          />
          <label htmlFor={`rating-${value}`}>{value}</label>
        </li>
      ))}
    </ul>
  );
};

export default RatingSelect;
