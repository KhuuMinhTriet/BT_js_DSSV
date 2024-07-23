const list = document.getElementById('tbodySinhVien');
const ds_SinhVien = new SinhVienList();

var data = localStorage.getItem('DS_SinhVien');
DSSV = JSON.parse(data);
hienThiDS();

const maSV = document.getElementById('txtMaSV');
const tenSV = document.getElementById('txtTenSV');
const email = document.getElementById('txtEmail');
const matKhau = document.getElementById('txtPass');
const ngaySinh = document.getElementById('txtNgaySinh');
const khoaHoc = document.getElementById('khSV');
const dToan = document.getElementById('txtDiemToan');
const dLy = document.getElementById('txtDiemLy');
const dHoa = document.getElementById('txtDiemHoa');

const nutThemSV = document.getElementById('themSV');
const nutReset = document.getElementById('reset');
// const nutXoaSV = document.getElementById('xoaSV');
const nutTimSV = document.getElementById('btnSearch');
const nutCapNhatSV = document.getElementById('update');

let updateIndex = -1;

nutThemSV.addEventListener('click', function(e) {
    e.preventDefault();
    themSV();
});

nutReset.addEventListener('click', function(e) {
    e.preventDefault();
    resetDS();
})

nutTimSV.addEventListener('click', function(e) {
    e.preventDefault();
    timSV();
})

nutCapNhatSV.addEventListener('click', function(e) {
    e.preventDefault();
    suaSV();
})

list.addEventListener('click', function(e) {
    if(e.target && e.target.classList.contains('suaSV')) {
        const index = e.target.getAttribute('data-index');
        updateIndex = index;
        fillSV(ds_SinhVien.list[index]);
    }
})

function themSV() {
    var idSV = maSV.value;
    var nameSV = tenSV.value;
    var mail = email.value;
    var password = matKhau.value;
    var bornDate = ngaySinh.value;
    var classCase = khoaHoc.value;
    var math = Number(dToan.value);
    var physics = Number(dLy.value);
    var chemical = Number(dHoa.value);

    var sv = new SinhVien(idSV, nameSV, mail, password, bornDate, classCase, math, physics, chemical);

    var jsonSV = JSON.stringify(ds_SinhVien);
    localStorage.setItem('DS_SinhVien', jsonSV);

    ds_SinhVien.addSV(sv);
    hienThiDS();
}

function timSV() {
    var filterName = document.getElementById('txtSearch').value.toLowerCase();
    hienThiDS(filterName);
}

function suaSV() {
    var idSV = maSV.value;
    var nameSV = tenSV.value;
    var mail = email.value;
    var password = matKhau.value;
    var bornDate = ngaySinh.value;
    var classCase = khoaHoc.value;
    var math = Number(dToan.value);
    var physics = Number(dLy.value);
    var chemical = Number(dHoa.value);

    var sv = ds_SinhVien.list[updateIndex];

    sv.maSV = idSV;
    sv.tenSV = nameSV;
    sv.email = mail;
    sv.matKhau = password;
    sv.ngaySinh = bornDate;
    sv.khoaHoc = classCase;
    sv.dToan = math;
    sv.dHoa = chemical;
    sv.dLy = physics;

    hienThiDS();
}

function hienThiDS(filterName = '') {
    var content = '';
    ds_SinhVien.list.map(function(sv, index) {
        var locSV = sv.tenSV.toLowerCase();
        if(filterName === '' || locSV.includes(filterName)) {
            content += `
                <tr>
                    <td>${sv.maSV}</td>
                    <td>${sv.tenSV}</td>
                    <td>${sv.email}</td>
                    <td>${sv.ngaySinh}</td>
                    <td>${sv.khoaHoc}</td>
                    <td>${sv.tinhDTB()}</td>
                    <td><button class='text-white bg-danger xoaSV' onclick='xoaSV(${index})'>Xóa</button></td>
                    <td><button class='text-white bg-success suaSV' data-index='${index}'>Sửa</button></td>
                </tr>
        `;
        }    
    });

    list.innerHTML = content;
}

function resetDS() {
    maSV.value = '';
    tenSV.value = '';
    email.value = '';
    matKhau.value = '';
    ngaySinh.value = 'dd/mm/yyyy';
    khoaHoc.value = 'Chọn khóa học';
    dToan.value = '';
    dLy.value = '';
    dHoa.value = '';
}

function fillSV(sv) {
    maSV.value = sv.maSV;
    tenSV.value = sv.tenSV;
    email.value = sv.email;
    matKhau.value = sv.matKhau;
    ngaySinh.value = sv.ngaySinh;
    khoaHoc.value = sv.khoaHoc;
    dToan.value = sv.dToan;
    dLy.value = sv.dLy;
    dHoa.value = sv.dHoa;
}

function xoaSV(index) {
    if (confirm('Bạn có chắc chắn muốn xóa sinh viên này?')) {
        ds_SinhVien.list.splice(index, 1);  

        var jsonSV = JSON.stringify(ds_SinhVien);
        localStorage.setItem('DS_SinhVien', jsonSV);

        hienThiDS();
    }
}
