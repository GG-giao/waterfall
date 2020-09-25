
/**
 * 
 * url: 请求地址
 * type: 请求方式
 * data: 请求参数
 * success: 请求成功的回调函数
 * async: 当前请求是够运输异步 true为允许异步 false为不允许异步
 *  
 */


    function ajax(options){
        var xhr = '';
        if(window.XMLHttpRequest){
            xhr = new XMLHttpRequest();
        }else if(window.ActiveXObject){
            xhr = new ActiveXObject('Microsoft.XMLHTTP')
        }else{
            alert('当前浏览器不支持XMLHttpRequest!')
        }



        var datastr = '';
        if(typeof options.data == 'object'){    //判断传来的数据是否为对象类型
            for(var prop in options.data){     
                if(options.data.hasOwnProperty(prop)){      //去除原型链上的数据
                    datastr += prop + '=' + options.data[prop] + '&';    //将数据拼接为字符串类型
                }
            }
        }else if(typeof options.data == 'string'){  
            datastr = options.data;
        }else{
            return alert('空');
        }

        options.type = options.type.toUpperCase();

        // 在发送请求之前监测
        xhr.onreadystatechange = function(e){
            if(xhr.status === 200 && xhr.readyState === 4 ){
                options.success(xhr.responseText);
            }
        }

        if(options.type == 'GET'){
            xhr.open(options.type, options.url + '?' + datastr, options.async);
            xhr.send();
        }else if(options.style == 'POST'){
            xhr.open(options.type, options.url ,options.async);
            xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
            xhr.send(datastr);
        }


    }