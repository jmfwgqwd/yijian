window.onload = function() {
	//获得外层以及每一个盒子
	var container = document.getElementById('wrap');
	var boxes = container.getElementsByTagName('div');
    //运行瀑布流主函数
    waterfall(container, boxes);

    //模拟数据
    var data = [{
        "src": "1.gif",
        "title": "1"
    }, {
        "src": "2.jpg",
        "title": "2"
    }, {
        "src": "3.jpg",
        "title": "3"
    }, {
        "src": "4.jpg",
        "title": "4"
    }, {
        "src": "5.jpg",
        "title": "5"
    }, {
        "src": "6.jpg",
        "title": "6"
    }, {
        "src": "7.jpg",
        "title": "7"
    }, {
        "src": "8.jpg",
        "title": "8"
    }, {
        "src": "9.jpg",
        "title": "9"
    }, {
        "src": "10.jpg",
        "title": "0"
    }, {
        "src": "11.jpg",
        "title": "11"
    }, {
        "src": "12.jpg",
        "title": "12"
    }, {
        "src": "13.gif",
        "title": "13"
    }, {
        "src": "14.jpg",
        "title": "14"
    }, {
        "src": "15.jpg",
        "title": "15"
    }, {
        "src": "16.jpg",
        "title": "16"
    }, {
        "src": "17.jpg",
        "title": "17"
    }, {
        "src": "18.gif",
        "title": "18"
    }];

    //设置滚动加载
    window.onscroll = function() {
        //校验数据请求
        if (getCheck()) {
            var wrap = container;
            for (i in data) {
                //创建figure
                var figure = document.createElement('div');
                wrap.appendChild(figure);
                //创建img
                var img = document.createElement('img');
                img.src = 'images/' + data[i].src;
                img.style.height = 'auto';
                figure.appendChild(img);
                //创建a标记
                var a = document.createElement('a');
                a.href = "img.html";
                a.target = "_self";
                a.innerHTML = data[i].title;
                figure.appendChild(a);
            };
            waterfall(container, boxes);
        };
    };
};

// 瀑布流主函数
function waterfall(wrap, figures) {
    //	获得屏幕可显示的列数
    var figureW = figures[0].offsetWidth + 20;
    var colsNum = Math.floor(document.documentElement.clientWidth / figureW);
    wrap.style.width = figureW * colsNum + 'px'; //为外层赋值宽度
    //	循环出所有的figure并按照瀑布流排列
    var everyH = []; //定义一个数组存储每一列的高度
    for (var i = 0; i < figures.length; i++) {
        if (i < colsNum) {
            everyH[i] = figures[i].offsetHeight + 20;
        } else {
            var minH = Math.min.apply(null, everyH); //获得最小的列的高度
            var minIndex = getIndex(minH, everyH); //获得最小列的索引
            getStyle(figures[i], minH, figures[minIndex].offsetLeft - 10, i);
            everyH[minIndex] += figures[i].offsetHeight + 20; //更新最小列的高度
        };
        figures[i].onmouseover = function() {
            this.style.opacity = "0.5";
        };
        figures[i].onmouseout = function() {
            this.style.opacity = "1";
        };
    };
};

// 获取最小列的索引
function getIndex(minH, everyH) {
    for (index in everyH) {
        if (everyH[index] == minH) return index;
    };
};

// 数据请求检验
function getCheck() {
    var documentH = document.documentElement.clientHeight;
    var scrollH = document.documentElement.scrollTop || document.body.scrollTop;
    return documentH + scrollH >= getLastH() ? true : false;
};

// 获得最后一个figure所在列的高度
function getLastH() {
    var wrap = document.getElementById('wrap');
    var figures = document.getElementsByTagName('div');
    return figures[figures.length - 1].offsetTop + figures[figures.length - 1].offsetHeight;
};

// 设置加载样式
var getStartNum = 0; //设置请求加载的条数的位置
function getStyle(figure, top, left, index) {
    if (getStartNum >= index) return;
    $(figure).css({
        'position': 'absolute',
        'top': top,
        "left": left,
        "opacity": "0"
    });
    $(figure).stop().animate({
        "opacity": "1"
    }, 999);
    getStartNum = index; //更新请求数据的条数位置
};
