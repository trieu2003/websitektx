import React, { useState } from "react";

const Register = () => {
  const [form, setForm] = useState({
    hoTen: "",
    maSoSinhVien: "",
    lop: "",
    soDienThoai: "",
    email: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dữ liệu đăng ký:", form);
    // TODO: Gửi dữ liệu lên server (axios, fetch,...)
  };

  return (
    <section className="py-5">
      <div className="container">
        <h2 className="text-center mb-4 fw-bold text-primary">Đăng Ký Nội Trú</h2>
        <form className="mx-auto col-md-8 shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-bold">Họ và tên</label>
            <input
              type="text"
              className="form-control"
              name="hoTen"
              value={form.hoTen}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Mã số sinh viên</label>
            <input
              type="text"
              className="form-control"
              name="maSoSinhVien"
              value={form.maSoSinhVien}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Lớp</label>
            <input
              type="text"
              className="form-control"
              name="lop"
              value={form.lop}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Số điện thoại</label>
            <input
              type="tel"
              className="form-control"
              name="soDienThoai"
              value={form.soDienThoai}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">Gửi Đăng Ký</button>
        </form>
      </div>
    </section>
  );
};

export default Register;
