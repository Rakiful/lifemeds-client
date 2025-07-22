import { Link } from "react-router";
import discount from "../../assets/icons/discount.png";

export const SingleProductCard = ({ item }) => {
  return (
    <div className="relative my-5 p-4 border border-teal-200 rounded-xl shadow hover:shadow-lg shadow-teal-300 transition-all">
      {/* Discount Badge */}
      <div className="absolute top-0 left-0 w-13 h-13">
        <div className="relative">
          <img className="absolute" src={discount} alt="discount" />
          <p className="absolute mt-4 ml-3 font-bold text-white text-md">
            {item.discount || "1"}%
          </p>
        </div>
      </div>

      {/* Product Image */}
      <img
        src={item.medicineImage}
        alt={item.medicineName}
        className="w-full h-40 object-contain"
      />

      {/* Details */}
      <div className="text-center space-y-1">
        <h3 className="mt-2 font-semibold text-xl">{item.medicineName}</h3>
        <p className="text-sm text-gray-500">{item.company}</p>
        <p className="text-green-700 font-semibold text-xl">${item.price}</p>
        <p className="h-15">{item.description}</p>
        <Link
          to={`/shop`}
          className="btn bg-teal-500 hover:bg-teal-700 transition-all text-white"
        >
          Buy Now
        </Link>
      </div>
    </div>
  );
};
