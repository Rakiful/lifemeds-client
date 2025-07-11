import { Link } from "react-router";
import discount from "../../assets/icons/discount.png";

export const SingleProductCard = ({ item }) => {
  return (
    <div className="relative p-4 border border-teal-200 bg-teal-100 rounded-xl shadow hover:shadow-lg shadow-teal-200 transition-all">
      {/* Discount Badge */}
      <div className="absolute top-0 left-0 w-13 h-13">
        <div className="relative">
          <img className="absolute" src={discount} alt="discount" />
          <p className="absolute mt-4 ml-3 font-bold text-white text-md">
            {item.discountPercent || "0"}%
          </p>
        </div>
      </div>

      {/* Product Image */}
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-40 object-contain"
      />

      {/* Details */}
      <div className="text-center space-y-1">
        <h3 className="mt-2 font-semibold text-xl">{item.name}</h3>
        <p className="text-sm text-gray-500">{"Bd Shop"}</p>
        <p className="min-h-20">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod
          expedita ut libero iste mollitia, nulla pariatur dolorum nisi neque
          excepturi?
        </p>
        <p className="text-green-700 font-semibold text-xl">${item.price}</p>
        <Link
          to={`/product/${item._id}`}
          className="btn bg-teal-500 hover:bg-teal-700 transition-all text-white"
        >
          Buy Now
        </Link>
      </div>
    </div>
  );
};
