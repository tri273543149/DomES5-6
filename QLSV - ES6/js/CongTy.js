class CongTy{
    constructor(){
        this.DanhSachNhanVien = new Array();
    }
    ThemNhanVien(nhanVienMoi){
        this.DanhSachNhanVien = [...this.DanhSachNhanVien, nhanVienMoi];
    }
    TimViTriTheoMa(maNV){
        for(let vitri in this.DanhSachNhanVien){
            if(this.DanhSachNhanVien[vitri].maNV === maNV){
                return vitri;
                break;
            }
        }
    }
    TimNhanVienTheoMa(maNV){
        for(let nhanvien of this.DanhSachNhanVien){
            if(nhanvien.maNV === maNV){
                return nhanvien;
                break;
            }
        }
    }
    XoaNhanVien(maNV){
        let vitri = this.TimViTriTheoMa(maNV);
        this.DanhSachNhanVien.splice(vitri, 1);
    }
    SuaNhanVien(nhanVien){
        let vitri = this.TimViTriTheoMa(nhanVien.maNV);
        this.DanhSachNhanVien[vitri] = nhanVien;
    }
    TimNhanVienTheoTen(hoTen){
        let danhSachKetQua = new CongTy();
        hoTen = hoTen.trim().toUpperCase();
        for(let nhanvien of this.DanhSachNhanVien){
            let hoTenNV = nhanvien.hoTen.trim().toUpperCase();
            if(hoTenNV.search(hoTen) !== -1){
                danhSachKetQua.DanhSachNhanVien = [...danhSachKetQua.DanhSachNhanVien, nhanvien];
            }
        }
        return danhSachKetQua;
    }
    SapXepNhanVien(type){
        if (tang === 1){ // Sắp xếp tăng dần
			this.DanhSachNhanVien.sort((a,b) => {
				var x = a.maNV.toLowerCase();
				var y = b.maNV.toLowerCase();
				if (x < y) {return -1;}
				if (x > y) {return 1;}
				return 0;				
			});
		}
		else { // Sắp xếp giảm dần
			this.DanhSachNhanVien.sort((a,b) => {
				var x = a.maNV.toLowerCase();
				var y = b.maNV.toLowerCase();
				if (x < y) {return 1;}
				if (x > y) {return -1;}
				return 0;				
			});
		}
    }
}