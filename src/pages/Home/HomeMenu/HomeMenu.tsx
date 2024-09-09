import { Tabs } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import { Fragment, useEffect, useState } from 'react';
import { getThongTinHeThongRap } from '../../../apis/apiRap/rapDetail';
import TabPane from 'antd/es/tabs/TabPane';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import "./HomeMenu.css"

export default function HomeMenu() {
  const dispatch = useDispatch<AppDispatch>()
  const thongTinHeThongRap = useSelector((state: RootState) => state.rapReducer.heThongRap);

  useEffect(() => {
    dispatch(getThongTinHeThongRap())
  }, [dispatch])

  const [activeTab, setActiveTab] = useState('0');

  const handleTabChange = (key: any) => {
    setActiveTab(key);
  };

  const renderHeThongRap = () => {
    return thongTinHeThongRap.map((item, index) => {
      return <TabPane tab={<img src={item.logo} className='rounded-full border border-gray-500' width={50} />} key={index}>
        <Tabs tabPosition='left' activeKey={activeTab} onChange={handleTabChange}>
          {item.lstCumRap?.slice(0, 5).map((cumRap, index) => {
            return <TabPane tab={
              <div className={activeTab === `${index}` ? 'text-white' : 'text-gray-600'}>
                <div style={{ width: '400px', display: 'flex' }}>
                  <img src='https://s3img.vcdn.vn/123phim/2018/09/ddc-dong-da-15379624326697.jpg' style={{ width: '60px', height: '60px' }} />
                  <div className='ml-3 text-left'>
                    <div>{cumRap.tenCumRap}</div>
                    <div>
                      {cumRap.diaChi.length > 50
                        ? cumRap.diaChi.split(' ').reduce((acc: any, word: any) => {
                          if (acc.length === 0 || acc[acc.length - 1].length + word.length + 1 > 50) {
                            acc.push(word);
                          } else {
                            acc[acc.length - 1] += ` ${word}`;
                          }
                          return acc;
                        }, []).map((line: any, index: number) => (
                          <div key={index}>{line}</div>
                        ))
                        : cumRap.diaChi}
                    </div>
                  </div>
                </div>
              </div>
            } key={index}>
              {cumRap.danhSachPhim.slice(0, 5).map((phim, index: number) => {
                return <Fragment key={index}>
                  <div className='my-5 text-gray-200' style={{ display: 'flex' }} >
                    <div>
                      <img src={phim.hinhAnh} alt={phim.tenPhim} style={{ width: '100px', height: '150px' }} />
                    </div>
                    <div className='ml-5 text-left'>
                      <h1 style={{ fontWeight: 'bold', fontSize: '20px' }}>{phim.tenPhim}</h1>
                      <div className='mt-5 grid grid-cols-5 gap-5'>
                        {phim.lstLichChieuTheoPhim?.slice(0, 10).map((lichChieu, index: number) => {
                          return <NavLink to={`/checkout/${lichChieu.maLichChieu}`} key={index} className='border border-gray-200 py-1 px-1 rounded-lg hover:bg-yellow-400 hover:font-medium hover:text-black hover:border-yellow-400'>
                            {moment(lichChieu.ngayChieuGioChieu).format('hh:mm A')}
                          </NavLink>
                        })}
                      </div>
                    </div>
                  </div>
                  <hr />
                </Fragment>
              })}
            </TabPane>
          })}
        </Tabs>
      </TabPane>
    })
  }

  return (
    <div id='MenuRap'>
      <h1 className='text-center mb-16 font-medium text-4xl text-white'>CỤM RẠP</h1>
      <div className="overflow-x-auto">
        <Tabs tabPosition='left' className="whitespace-nowrap">
          {renderHeThongRap()}
        </Tabs>
      </div>
    </div>
  )
}
