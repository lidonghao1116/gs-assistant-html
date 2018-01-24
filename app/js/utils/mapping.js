
var publicPath = "http://"+window.location.host + "/fbeeConsole_web";
  // var publicPath = "http://ysc-b.jiacer.com"+"/fbeeConsole_web";
  window.global_config = {
    getServiceManageDetails: publicPath + "/api/website/getServiceManageDetails",
    staffRecommend: publicPath + "/api/staffs/staffRecommend",
    queryAboutUsInfo: publicPath + "/api/website/queryAboutUsInfo",
    saveAboutUsInfo: publicPath + "/api/website/saveAboutUsInfo",
    updateServiceItem: publicPath + "/api/website/updateServiceManageDetalisInfo",
    getIndexInfo: publicPath + "/api/website/getIndexInfo",
  };
