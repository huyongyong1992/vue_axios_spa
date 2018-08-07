import Vue from "vue";
/**
 * 存储/获取localStorage
 */
export const operateStorage = (name, content) => {
  if (!name) return;
  if (typeof content !== "string") {
    content = JSON.stringify(content);
  }
  if (!content) {
    //content不存在，getStorage
    return window.localStorage.getItem(name);
  } else if (content === "remove") {
    //content 为`remove`时 removeStorage
    window.localStorage.removeItem(name);
  } else {
    window.localStorage.setItem(name, content);
  }
};
/**
 * 获取url ?后面的传值
 */
export const getQuery = key => {
  const location = window.location;
  const query = {};
  const params = location.href.split("?")[1] || "";
  if (params) {
    params.split("&").forEach(item => {
      const queryPair = item.split("=");
      query[queryPair[0]] = queryPair[1];
    });
  }
  const rst = query[key];
  //解码一个编码的 URI。
  return rst ? window.decodeURIComponent(query[key]) : "";
};

/**
 * 去掉空格
 */
export const trim = String => {
  const result = String.replace(/\s/g, "");
  return result;
};
