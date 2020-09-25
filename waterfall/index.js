

var lock = false;

function getData(){

    if(lock){
        return;
    }
    lock = true;

    ajax({
        url: "./data.json",
        type: 'GET',
        data: '',
        success:function(data){
            data = JSON.parse(data);
           console.log(data);
            renderDom(data);
            lock = false;
        },
        
    })
  
}


    // 将数据渲染到页面上
    function renderDom(data){
       var oLi = document.getElementsByClassName('col');
       var domWidth = oLi[0].offsetWidth -20 -20;

       data.forEach(function(item,index){
            var Div = document.createElement('div');
            Div.className = 'item';
            

            var Img = new Image();
            Img.height = (domWidth * item.height) / item.width;
            Img.src = item.img;

            Div.appendChild(Img);
            
            // oLi.appendChild(Div);

            

            var oP = document.createElement('p');
            oP.innerText = item.desc;
            Div.appendChild(oP);

            oLi[index % 4].appendChild(Div);
            var minIndex = getMinLi().minIndex; //获取最短元素height索引
            oLi[minIndex].appendChild(Div);
       })
    }


    function getMinLi(){
        var oLi = document.getElementsByClassName('col');
        var minIndex = 0;   //获取最小索引值

        var minHeight = oLi[0].offsetHeight;
        // console.log(minHeight);

        for(var i = 0; i<oLi.length; i++){
            if (oLi[i].offsetHeight < minHeight) {
                minHeight = oLi[i].offsetHeight;
                minIndex = i;
            }
        }
        return{
            minIndex:minIndex,
            minHeight:minHeight
        }
    }

getData();



window.onscroll = function(e){
    // console.log('123');
    
    var scrollTop = document.documentElement.scrollTop; //获取滚动条滚动距离
    var clientHeight = window.innerHeight;  //获取视口高度
    var minHeight = getMinLi().minHeight;  //最小的li元素的高度
    // console.log(minHeight);
    if(minHeight < scrollTop + clientHeight){   // 判断最小的li元素的高度，小于滚动条的高度 + 可视区域的高度时，再次请求数据   
            getData();
    }
}


