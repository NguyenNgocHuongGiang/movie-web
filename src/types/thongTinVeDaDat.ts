export interface Ghe {
    maCumRap: string;
    maGhe: number;
    maHeThongRap: string;
    maRap: number;
    tenCumRap: string;
    tenGhe: string;
    tenHeThongRap: string;
    tenRap: string;
};

export interface Ve{
    tenHeThongRap: string;
    tenRap: string;
    maVe: string;
    ngayDat: string;
    giaVe: number;
    tenPhim: string;
    thoiLuongPhim: number;
    danhSachGhe: Ghe[];
};

export interface SelectedGroup {
    maVe: string;
    tenPhim: string;
    tenHeThongRap: string;
    tenRap: string;
    danhSachGhe: { tenGhe: string }[];
    ngayDat: string; // Adjust type as necessary
    giaVe: number;
}

export interface Acc{
    [key: string]: Ve;
};
