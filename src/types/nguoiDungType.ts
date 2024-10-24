export interface infoLogin {
    taiKhoan: string,
    matKhau: string
}

export interface infoRegister{
    taiKhoan: string,
    matKhau: string,
    email: string,
    soDT: string,
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

export interface updateUser{
    taiKhoan: string,
    matKhau: string,
    email: string,
    soDT: string,
    maNhom: string,
    maLoaiNguoiDung: string,
    hoTen: string
  }

export interface userList {
  taiKhoan:        string;
  hoTen:           string;
  email:           string;
  soDt:            string;
  matKhau:         string;
  maLoaiNguoiDung: string;
}