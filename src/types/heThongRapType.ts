export interface LichChieuTheoPhimType {
    maLichChieu: number;
    maRap: string;
    tenRap: string;
    ngayChieuGioChieu: string;
    giaVe: number;
}

export interface PhimRapType {
    maPhim: number;
    tenPhim: string;
    hinhAnh: string;
    hot: boolean;
    dangChieu: boolean;
    sapChieu: boolean;
    lstLichChieuTheoPhim: LichChieuTheoPhimType[];
}

export interface CumRapType {
    maCumRap: string;
    tenCumRap: string;
    hinhAnh: string;
    diaChi: string;
    danhSachPhim: PhimRapType[];
}

export interface HeThongRapType {
    maHeThongRap: string;
    tenHeThongRap: string;
    logo: string;
    mahom: string;
    lstCumRap: CumRapType[];
}
