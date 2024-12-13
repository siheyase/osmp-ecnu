/*
 * @Author: lyt
 * @Date: 2024-12-01 14:45:12
 * @LastEditTime: 2024-12-12 16:34:56
 * @LastEditors: lyt
 * @Description: lyt
 * @FilePath: /osmp-demo/jeecgboot-vue3/mock/demo/form-demo.ts
 *
 */
import { MockMethod } from 'vite-plugin-mock';
import { resultSuccess, baseUrl } from '../_util';

const getApiSelectData = (keyword, count = 20) => {
  const result = [] as any[];
  for (let index = 0; index < count; index++) {
    //根据搜索关键词做一下匹配
    const name = `选项${index}`;
    if (keyword && name.indexOf(keyword) != -1) {
      result.push({
        name: `选项${index}`,
        id: `${index}`,
      });
    } else if (!keyword) {
      result.push({
        name: `选项${index}`,
        id: `${index}`,
      });
    }
  }
  return result;
};

export default [
  {
    url: `${baseUrl}/demo/form/apiSelectData`,
    timeout: 1000,
    method: 'get',
    response: ({ query }) => {
      const { keyword, count } = query;
      console.log('查询条件：', keyword);
      return resultSuccess(getApiSelectData(keyword, count));
    },
  },
] as MockMethod[];
