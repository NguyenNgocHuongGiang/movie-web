// Kiểu dữ liệu cho thongTinPhim
export interface ThongTinPhim {
    maLichChieu: number;
    tenCumRap: string;
    tenRap: string;
    diaChi: string;
    tenPhim: string;
    hinhAnh: string;
    ngayChieu: string;
    gioChieu: string;
}

export interface Ghe {
    maGhe: number;
    tenGhe?: string;
    maRap?: number;
    loaiGhe?: string;
    stt?: string;
    giaVe: number;
    daDat?: boolean;
    taiKhoanNguoiDat?: string;
}

export interface LichChieuPhim {
    thongTinPhim: ThongTinPhim;
    danhSachGhe: Ghe[];
}

export interface DanhSachVeDat{
    maGhe: number,
    giaVe:number
}

export interface ThongTinDatVe{
    maLichChieu: number | undefined,
    danhSachVe: DanhSachVeDat[]
}