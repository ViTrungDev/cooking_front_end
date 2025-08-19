import React, { useState } from "react";
import styles from "./Setting.module.scss"; // Import SCSS module

export default function ManageSetting() {
  const [tab, setTab] = useState("general");

  const [settings, setSettings] = useState({
    storeName: "Tiệm bánh Ngọt Ngào",
    address: "",
    phone: "",
    email: "",
    openingHours: "07:00 - 21:00",
    language: "Tiếng Việt",
    currency: "VNĐ",
    payment: ["COD"],
    shipping: "Nội thành HCM",
    seoTitle: "",
    seoDescription: "",
    keywords: "",
    notifyEmail: true,
    notifySMS: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Cài đặt đã lưu:", settings);
    alert("Cài đặt đã được lưu thành công!");
  };

  return (
    <div className={styles.container}>
      <div className={styles.settingCard}>
        

        {/* Tabs menu */}
        <div className={styles.tabs}>
          {[
            { id: "general", label: "Cài đặt chung" },
            { id: "payment", label: "Thanh toán" },
            { id: "shipping", label: "Vận chuyển" },
            { id: "seo", label: "SEO" },
            { id: "notify", label: "Thông báo" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`${styles.tabButton} ${
                tab === item.id ? styles.activeTab : styles.inactiveTab
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Nội dung form */}
        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Tab Cài đặt chung */}
          {tab === "general" && (
            <div className={styles.tabContent}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Tên cửa hàng</label>
                <input
                  type="text"
                  name="storeName"
                  value={settings.storeName}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>

              <div className={styles.grid}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Logo</label>
                  <input type="file" name="logo" className={styles.fileInput} />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Favicon</label>
                  <input type="file" name="favicon" className={styles.fileInput} />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Địa chỉ</label>
                <input
                  type="text"
                  name="address"
                  value={settings.address}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Nhập địa chỉ cửa hàng"
                />
              </div>

              <div className={styles.grid}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Số điện thoại</label>
                  <input
                    type="text"
                    name="phone"
                    value={settings.phone}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="0987 654 321"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={settings.email}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Giờ mở cửa</label>
                <input
                  type="text"
                  name="openingHours"
                  value={settings.openingHours}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="07:00 - 21:00"
                />
              </div>

              <div className={styles.grid}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Ngôn ngữ</label>
                  <input
                    type="text"
                    name="language"
                    value={settings.language}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Đơn vị tiền tệ</label>
                  <input
                    type="text"
                    name="currency"
                    value={settings.currency}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Tab Thanh toán */}
          {tab === "payment" && (
            <div className={styles.tabContent}>
              <label className={styles.label}>Phương thức thanh toán</label>
              <div className={styles.checkboxGroup}>
                <label className={styles.checkboxLabel}>
                  <input type="checkbox" className={styles.checkbox} checked readOnly /> 
                  COD (Khi nhận hàng)
                </label>
                <label className={styles.checkboxLabel}>
                  <input type="checkbox" className={styles.checkbox} /> 
                  Chuyển khoản ngân hàng
                </label>
                <label className={styles.checkboxLabel}>
                  <input type="checkbox" className={styles.checkbox} /> 
                  Ví điện tử (Momo, ZaloPay)
                </label>
                <label className={styles.checkboxLabel}>
                  <input type="checkbox" className={styles.checkbox} /> 
                  VNPay/PayPal
                </label>
              </div>
            </div>
          )}

          {/* Tab Vận chuyển */}
          {tab === "shipping" && (
            <div className={styles.tabContent}>
              <label className={styles.label}>Hình thức giao hàng</label>
              <select
                name="shipping"
                value={settings.shipping}
                onChange={handleChange}
                className={styles.select}
              >
                <option>Nội thành HCM</option>
                <option>Toàn quốc (Giao Hàng Nhanh, Viettel Post)</option>
                <option>Miễn phí đơn từ 300K</option>
              </select>
            </div>
          )}

          {/* Tab SEO */}
          {tab === "seo" && (
            <div className={`${styles.tabContent} ${styles.form}`}>
              <div className={styles.formGroup}>
                <label className={styles.label}>SEO Title</label>
                <input
                  type="text"
                  name="seoTitle"
                  value={settings.seoTitle}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Ví dụ: Tiệm bánh kem Ngọt Ngào"
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Meta Description</label>
                <textarea
                  name="seoDescription"
                  value={settings.seoDescription}
                  onChange={handleChange}
                  className={styles.textarea}
                  rows="3"
                  placeholder="Mô tả ngắn về cửa hàng để hiển thị trên Google..."
                ></textarea>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Từ khóa</label>
                <input
                  type="text"
                  name="keywords"
                  value={settings.keywords}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="bánh sinh nhật, bánh kem, tiramisu..."
                />
              </div>
            </div>
          )}

          {/* Tab Thông báo */}
          {tab === "notify" && (
            <div className={styles.tabContent}>
              <div className={styles.checkboxGroup}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="notifyEmail"
                    className={styles.checkbox}
                    checked={settings.notifyEmail}
                    onChange={handleChange}
                  />
                  Gửi email khi có đơn hàng mới
                </label>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="notifySMS"
                    className={styles.checkbox}
                    checked={settings.notifySMS}
                    onChange={handleChange}
                  />
                  Gửi SMS thông báo cho khách
                </label>
              </div>
            </div>
          )}

          {/* Button lưu */}
          <div>
            <button
              type="submit"
              className={styles.submitButton}
            >
              💾 Lưu cài đặt
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}