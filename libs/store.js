var STORAGE_KEY = 'BIKETO11·11';
module.exports = {

    todoSessStorage: {
        fetch: function(key) {
            return sessionStorage.getItem(STORAGE_KEY + key) || '';
        },
        save: function(key, val) {
            sessionStorage.setItem(STORAGE_KEY + key, val);
        }
    },
    todoCookieStorage: {
        fetch: function(key) {
            var arr, reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)");  
            arr = document.cookie.match(reg);      
            if (arr) {    
                return unescape(arr[2]);    
            } else {    
                return null;      
            }
        },
        save: function(key, val) {
            var Days = 30;  
            var exp = new Date();  
            exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);

            document.cookie = key + "=" + escape(val) + ";expires=" + exp.toGMTString();   
            // document.cookie = name + "=" + escape(value) ;
        }
        
    },
    todoLocalStorage: {
        fetch: function(key) {
            return localStorage.getItem(STORAGE_KEY + key) || '';
        },
        save: function(key, val) {
            localStorage.setItem(STORAGE_KEY + key, val);
        }
    }
}
