
let base64src=require("../../utils/base64src");
let width;
wx.getSystemInfo({
    success: function (res) {
        width=res.screenWidth;
    },
}),
    Page({
        data: {
            baseImg:width+'px',
            imgWidth:width*19/90+'px',
            imgHeight:width*19/180+'px',
            top:'120px',
            left:'200px'
        },
        onLoad: function (options) {

            let that=this;
            wx.getStorage({
                key:"base64",
                success(res) {
                    let result="data:image/jpeg;base64,"+res.data;
                    // console.log(result)
                    base64src(result, res => {

                        that.setData({
                            baseImg:res
                        })
                    });
                }
            });


        },
    });
