class NhanVien {
  constructor(maNV, hoTen, email, matKhau, ngayLamViec, chucVu) {
    this.maNV = maNV;
    this.hoTen = hoTen;
    this.email = email;
    this.matKhau = matKhau;
    this.ngayLamViec = ngayLamViec;
    this.chucVu = chucVu;

    this.mangDoiChieu = [
      this.maNV,
      this.hoTen,
      this.email,
      this.ngayLamViec,
      this.chucVu,
    ];
  }
}
