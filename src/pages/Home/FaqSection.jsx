import React from "react";
import img from "../../assets/img/faq.png";

export const FaqSection = () => {
  const faqs = [
    {
      question: "How do I place an order for medicine?",
      answer:
        "To place an order, simply browse products, add items to your cart, and proceed to checkout. You’ll receive confirmation via email after payment.",
    },
    {
      question: "Can I buy prescription medicine online?",
      answer:
        "Yes, but some prescription medicines may require a valid prescription upload. Please check product requirements before purchase.",
    },
    {
      question: "Are the medicines sold by verified pharmacies?",
      answer:
        "Yes, all sellers on our platform are verified pharmacies and vendors approved through our onboarding process.",
    },
    {
      question: "What payment methods are accepted?",
      answer:
        "We accept credit/debit cards, mobile banking (bKash, Nagad), and Cash on Delivery in selected areas.",
    },
    {
      question: "How long does delivery take?",
      answer:
        "Standard delivery usually takes 2-5 business days depending on your location and the seller's dispatch time.",
    },
  ];
  return (
    <div className="py-10 px-4 lg:px-10">
      <div>
        <h1 className="text-2xl text-center lg:text-4xl text-teal-700 font-bold ">
          LifeMeds FAQs & Beginner Guide
        </h1>
        <hr className="mt-3 mb-5 lg:mt-5 lg:mb-10 w-24 lg:w-40 text-teal-700 border-2 lg:border-3 rounded-2xl mx-auto" />
      </div>
      <div className="grid lg:grid-cols-2 items-center justify-center">
        <div className="space-y-4 max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              className="collapse collapse-arrow bg-base-100 border border-teal-200"
              key={index}
            >
              <input type="checkbox" />
              <div className="collapse-title text-lg font-medium text-teal-700">
                {faq.question}
              </div>
              <div className="collapse-content text-gray-600">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <img className="w-[60%]" src={img} alt="" />
        </div>
      </div>
    </div>
  );
};
