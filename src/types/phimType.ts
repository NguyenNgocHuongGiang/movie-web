export interface PhimType {
    heThongRapChieu: CinemaSystem[];
    maPhim: number;
    tenPhim: string;
    biDanh: string;
    trailer: string;
    hinhAnh: string;
    moTa: string;
    maNhom: string;
    hot: boolean;
    dangChieu: boolean;
    sapChieu: boolean;
    ngayKhoiChieu: string; // ISO 8601 format date
    danhGia: number;
}

export interface CinemaSystem {
    cumRapChieu: Cinema[];
    maHeThongRap: string;
    tenHeThongRap: string;
    logo: string;
}

export interface Cinema {
    lichChieuPhim: ShowTime[];
    maCumRap: string;
    tenCumRap: string;
    hinhAnh: string;
    diaChi: string;
}

export interface ShowTime {
    maLichChieu: string;
    maRap: string;
    tenRap: string;
    ngayChieuGioChieu: string; // ISO 8601 format date
    giaVe: number;
    thoiLuong: number; // thời lượng phim (phút)
}
