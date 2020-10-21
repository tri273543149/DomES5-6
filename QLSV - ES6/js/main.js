var congty = new CongTy();

goiModal = (modal_title, readonly = false, type = 1) => {
  document.getElementById("header-title").innerHTML = modal_title;
  document.getElementById("msnv").readOnly = readonly;

  switch (type) {
    case 1:
      document.getElementById("btnThemNV").style.display = "block";
      document.getElementById("btnCapNhatNV").style.display = "none";
      break;
    case 2:
      document.getElementById("btnThemNV").style.display = "none";
      document.getElementById("btnCapNhatNV").style.display = "block";
      break;
  }
};

xoaForm = () => {
  let elements = document.getElementsByClassName("input-sm");
  for (let element of elements) {
    element.value = "";
  }
  document.getElementById("chucvu").selectedIndex = 0;
};

let trangHienTai = 1;
hienThiDanhSach = (dsnv) => {
  let tbody = document.getElementById("tableDanhSach");
  tbody.innerHTML = "";
  let soNV = dsnv.length;
  let nv, tr, td;
  let ulPhanTrang = document.getElementById("ulPhanTrang");
  ulPhanTrang.innerHTML = "";
  let soDong = 2;
  let soTran = Math.ceil(soNV / soDong);

  for (let i = 1; i <= soTran; i++) {
    let li = document.createElement("li");
    li.setAttribute("class", "page-item ");
    ulPhanTrang.appendChild(li);
    let a = document.createElement("a");
    a.setAttribute("class", "page-link");
    a.setAttribute("id", "trang_" + i);
    a.innerHTML = i;
    li.appendChild(a);

    chuyenTrang("trang_" + i);
  }
  let batDau = (trangHienTai - 1) * soDong;
  let ketThuc = trangHienTai * soDong;
  if (soNV < ketThuc) {
    ketThuc = soNV;
  }
  for (let i = batDau; i < ketThuc; i++) {
    nv = dsnv[i];
    tr = document.createElement("tr");
    tbody.appendChild(tr);
    for (let j = 0; j < nv.mangDoiChieu.length; j++) {
      td = document.createElement("td");
      td.innerHTML = nv.mangDoiChieu[j];
      tr.appendChild(td);
    }

    let btnSua = `<a id="sua_${nv.maNV}" class="btn btn-primary text-white" data-toggle="modal" href="#myModal"><em class="fa fa-pencil"></em></a>`;

    let btnXoa = `<a id="xoa_${nv.maNV}" class="btn btn-danger text-white ml-2" ><em class="fa fa-trash"></em></a>`;
    td = document.createElement("td");
    td.innerHTML = btnSua + btnXoa;
    td.setAttribute("align", "center");
    tr.appendChild(td);

    suaNhanVien("sua_" + nv.maNV);
  }
};

document.getElementById("btnThem").addEventListener("click", () => {
  xoaForm();
  goiModal("Them nhan vien");
});

document.getElementById("btnThemNV").addEventListener("click", () => {
  let maNV = document.getElementById("msnv").value;
  let hoTen = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let matKhau = document.getElementById("password").value;
  let ngayLam = document.getElementById("datepicker").value;
  let chucVu = document.getElementById("chucvu").selectedIndex;

  let nhanVienMoi = new NhanVien(maNV, hoTen, email, matKhau, ngayLam, chucVu);
  congty.ThemNhanVien(nhanVienMoi);
  swal("ok!", "Them nhan vien thanh cong!", "success");
  hienThiDanhSach(congty.DanhSachNhanVien);
});

suaNhanVien = (idButton) => {
  document.getElementById(idButton).addEventListener("click", () => {
    let id = idButton;
    let mangTam = id.split("_");
    let maNV = mangTam[1];

    let nhanvien = congty.TimNhanVienTheoMa(maNV);

    document.getElementById("msnv").value = maNV;
    document.getElementById("name").value = nhanvien.hoTen;
    document.getElementById("email").value = nhanvien.email;
    document.getElementById("password").value = nhanvien.matKhau;
    document.getElementById("datepicker").value = nhanvien.ngayLamViec;
    document.getElementById("chucvu").selectedIndex = nhanvien.chucVu;

    goiModal("Cap nhat thong tin", true, 2);
  });
};

document.getElementById("btnCapNhatNV").addEventListener("click", () => {
  let maNV = document.getElementById("msnv").value;
  let hoTen = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let matKhau = document.getElementById("password").value;
  let ngayLamViec = document.getElementById("datepicker").value;
  let chucVu = document.getElementById("chucvu").selectedIndex;
  let nhanvienmoi = new NhanVien(
    maNV,
    hoTen,
    email,
    matKhau,
    ngayLamViec,
    chucVu
  );
  console.log(nhanvienmoi);
  congty.SuaNhanVien(nhanvienmoi);

  swal("ok!", "Sua nhan vien thanh cong!", "success");
  hienThiDanhSach(congty.DanhSachNhanVien);
});

document.getElementById("searchName").addEventListener("keyup", () => {
  let tukhoa = document.getElementById("searchName").value;
  let dskq = congty.TimNhanVienTheoTen(tukhoa);
  hienThiDanhSach(dskq.DanhSachNhanVien);
});

document.getElementById("SapXepTang").addEventListener("click", () => {
  document.getElementById("SapXepTang").style.display = "none";
  document.getElementById("SapXepGiam").style.display = "inline";

  congty.SapXepNhanVien(1);
  hienThiDanhSach(congty.DanhSachNhanVien);
});

chuyenTrang = (idButton) => {
  document.getElementById(idButton).addEventListener("click", () => {
    let id = idButton;
    let mangTam = id.split("_");
    trangHienTai = mangTam[1];
    hienThiDanhSach(congty.DanhSachNhanVien);
  });
};

hienThiDanhSach(congty.DanhSachNhanVien);
