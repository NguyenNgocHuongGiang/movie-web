export interface infoLogin {
    taiKhoan: string,
    matKhau: string
}

export interface infoRegister{
    taiKhoan: string,
    matKhau: string,
    email: string,
    soDt: string,
    maNhom: string,
    hoTen: string
  }

export interface infoLoginResponse{
    taiKhoan: string,
    hoTen: string,
    email: string,
    soDT: string,
    maNhom: string,
    maLoaiNguoiDung: string,
    accessToken: string
}