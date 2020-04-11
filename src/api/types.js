import ajax from './ajax'

const Base = "http://47.112.132.177:8081"
const Base1 = "http://47.112.132.177:8084"

//风采
export const reqElegants = (pageNum,pageSize,year) => ajax(Base+"/elegant/age",{pageNum,pageSize,year},'POST')  //获取对应年份对应页码的风采列表
export const reqElegantYears = () => ajax(Base+"/elegant/ages",{},'POST')  //获取风采年份列表
export const reqElegantDetails = (id) => ajax(Base+"/elegant/details",{id},'POST')  //获取风采详情

//视频
export const reqGroups = () => ajax(Base+"/group/all",{},'POST')  //获取组别
export const reqGroupsVideos = (group,pageNum,pageSize) => ajax(Base+"/video/group",{group,pageNum,pageSize},'POST')  //获取组别视频
export const reqVideos = (pageNum,pageSize,year) => ajax(Base+"/video/age",{pageNum,pageSize,year},'POST')  //获取对应年份对应页码的视频列表
export const reqVideoYears = () => ajax(Base+"/video/ages",{},'POST')  //获取是视频年份列表
export const reqVideoDetails = (id) => ajax(Base+"/video/details",{id},'POST')  //获取视频详情

export const ReqTypes = () => ajax("http://47.112.132.177:8092/form/find/all",{},'POST')  //获取分类类型
