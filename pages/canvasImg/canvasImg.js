
const app = getApp();
const base64src=require("../../utils/base64src");
let width;
wx.getSystemInfo({
    success: function (res) {
        width=res.screenWidth;
    },
}),
    Page({
        data: {
            baseImg:'',
            imgWidth:width*19/90+'px',
            imgHeight:width*19/180+'px',
            top:'120px',
            left:'200px'
        },
        onLoad: function (options) {

            let base64Image = "data:image/jpeg;base64,"+app.globalData.contractParam.base64Image;
            console.log(app.globalData.contractParam);
            console.log(base64Image);
            // let signPictureWidth=this.data.windowWidth*19/90;
            // let signPictureHeight=this.data.windowWidth*19/180;
            // this.setData({
            //     signPictureWidth:signPictureWidth,
            //     signPictureHeight:signPictureHeight,
            // });
            base64src(base64Image, data => {
                this.setData({
                    baseImg:data,
                });
            });


        },
    });
