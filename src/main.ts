import 'uno.css';
import '/@/design/index.less';
import 'ant-design-vue/dist/reset.css';
// 注册图标
import 'virtual:svg-icons-register';
import App from './App.vue';
import { createApp, type App as VueApp } from 'vue';
import { initAppConfigStore } from '/@/logics/initAppConfig';
import { setupErrorHandle } from '/@/logics/error-handle';
import { router, setupRouter } from '/@/router'; // 保持 router 导入
import { setupRouterGuard } from '/@/router/guard';
import { setupStore } from '/@/store';
import { setupGlobDirectives } from '/@/directives';
import { setupI18n } from '/@/locales/setupI18n';
import { registerGlobComp } from '/@/components/registerGlobComp';
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper';
import { useUserStore } from '/@/store/modules/user';

let app: VueApp;

function render(props: any) {
  try {
    const { container, data } = props || {};
    // 兼容 qiankun 和主应用场景
    const targetContainer = container ? container.querySelector('#app') || container : document.querySelector('#app') || '#app';
    if (!targetContainer) {
      throw new Error('未找到应用挂载容器 #app');
    }
    app = createApp(App);
    setupStore(app);
    initAppConfigStore();
    registerGlobComp(app);
    setupRouter(app);
    setupRouterGuard(router);
    setupGlobDirectives(app);
    setupI18n(app)
      .then(() => {
        app.mount(targetContainer);
      })
      .catch((err) => {
        // 国际化初始化失败
        console.error('i18n 初始化失败:', err);
      });
    setupErrorHandle(app);
    // 存储用户信息
    const userStore = useUserStore();
    userStore.setUserInfo(data?.userInfo || {});
  } catch (error) {
    console.error('应用渲染异常:', error);
    const fallback = document.createElement('div');
    fallback.style.color = 'red';
    fallback.innerText = '应用加载失败，请刷新页面或联系开发人员。';
    const root = document.querySelector('#app');
    if (root) {
      root.innerHTML = '';
      root.appendChild(fallback);
    }
  }
}

function unmount() {
  app?.unmount();
}

renderWithQiankun({
  mount(props) {
    console.log('osmp_ecnu mounted', props);
    render(props);
  },
  bootstrap() {
    console.log('osmp_ecnu bootstraped');
  },
  unmount() {
    console.log('osmp_ecnu unmounted');
    unmount();
  },
  update(props: any) {
    console.log('osmp_ecnu updated', props);
    console.log(props);
  },
});

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render({});
}
