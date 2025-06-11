import React from "react";
import FeatureCard from "./FeatureCard";

const Features = () => {
  const features = [
    {
      title: "Đăng Ký Nội Trú",
      description: "Đăng ký và nhận phòng dễ dàng, nhanh chóng.",
    },
    {
      title: "Yêu Cầu Sửa Chữa",
      description: "Gửi yêu cầu sửa chữa thiết bị trong phòng.",
    },
    {
      title: "Thanh Toán Online",
      description: "Thanh toán phí nội trú và dịch vụ tiện lợi.",
    },
  ];

  return (
    <section className="features py-5 bg-white">
      <div className="container">
        <h2 className="text-center mb-5 fw-bold">Dịch Vụ Chính</h2>
        <div className="row">
          {features.map((f, idx) => (
            <FeatureCard key={idx} title={f.title} description={f.description} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
