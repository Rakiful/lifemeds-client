import { useNavigate } from "react-router";

export const CategoryCardSection = ({ categories }) => {
  const navigate = useNavigate();
  return (
    <div className="py-10 px-4  mx-auto">
      <div>
        <h1 className="text-2xl text-center lg:text-4xl text-teal-700 font-bold ">
          Browse Categories
        </h1>
        <hr className="mt-3 mb-5 lg:mt-5 lg:mb-10 w-24 lg:w-40 text-teal-700 border-2 lg:border-3 rounded-2xl mx-auto" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {categories.map((cat, i) => (
          <div
            key={i}
            onClick={() => navigate(`/category/${cat.categoryName}`)}
            className="border border-teal-200 rounded-xl shadow hover:shadow-lg shadow-teal-200 cursor-pointer p-4 flex flex-col items-center transition"
          >
            <img
              src={cat.categoryImage}
              alt={cat.categoryName}
              className="w-20 h-20 object-contain mb-3"
            />
            <h3 className="text-lg font-semibold">{cat.categoryName}</h3>
            <p className="text-sm text-gray-500">
              {cat.medicineCount} medicines
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};