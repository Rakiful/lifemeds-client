import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export const CategoryCardSection = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/categories.json")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  return (
    <div className="py-10 px-4  mx-auto">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-center">
          Browse Categories
        </h2>
        <div className="divider w-30 mx-auto divider-accent mb-6"></div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {categories.map((cat, i) => (
          <div
            key={i}
            onClick={() => navigate(`/category/${cat.name.toLowerCase()}`)}
            className="border border-teal-200 rounded-xl shadow hover:shadow-lg shadow-teal-200 cursor-pointer p-4 flex flex-col items-center transition"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-20 h-20 object-contain mb-3"
            />
            <h3 className="text-lg font-semibold">{cat.name}</h3>
            <p className="text-sm text-gray-500">
              {cat.medicineCount} medicines
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
