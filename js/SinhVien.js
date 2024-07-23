function SinhVien(maSV, tenSV, email, matKhau, ngaySinh, khoaHoc, dToan, dLy, dHoa) {
    this.maSV = maSV;
    this.tenSV = tenSV;
    this.email = email;
    this.matKhau = matKhau;
    this.ngaySinh = ngaySinh;
    this.khoaHoc = khoaHoc;
    this.dToan = dToan;
    this.dLy = dLy;
    this.dHoa = dHoa;
    this.tinhDTB = function() {
        return ((this.dToan + this.dHoa + this.dLy) / 3).toFixed(2);
    }
}