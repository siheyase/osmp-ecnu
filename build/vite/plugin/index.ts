import { PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import purgeIcons from 'vite-plugin-purge-icons';
import UnoCSS from 'unocss/vite';
import { presetTypography, presetUno } from 'unocss';
import qiankun from 'vite-plugin-qiankun';
import VitePluginCertificate from 'vite-plugin-mkcert';
import vueSetupExtend from 'vite-plugin-vue-setup-extend-plus';
import { configHtmlPlugin } from './html';
import { configMockPlugin } from './mock';
import { configCompressPlugin } from './compress';
import { configVisualizerConfig } from './visualizer';
import { configThemePlugin } from './theme';
import { configSvgIconsPlugin } from './svgSprite';

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const { VITE_USE_MOCK, VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE } = viteEnv;

  // 从 package.json 获取应用名称，如果主应用注册时用了其他名称，请确保这里也用那个名称
  const appName = 'osmp_ecnu';
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    vue(),
    vueJsx(),

    // 添加 qiankun 插件
    // 第一个参数是子应用的名称，必须与主应用注册时的名称一致
    // 第二个参数的 useDevMode: true 会在开发模式下共享 Vite dev server，而不是每个子应用都单独构建
    qiankun(appName, {
      useDevMode: !isBuild,
    }),

    // support name
    vueSetupExtend(),
    // @ts-ignore
    VitePluginCertificate({
      source: 'coding',
    }),
  ];

  vitePlugins.push(UnoCSS({ presets: [presetUno(), presetTypography()] }));

  // vite-plugin-html
  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild));

  // vite-plugin-svg-icons
  vitePlugins.push(configSvgIconsPlugin(isBuild));

  // vite-plugin-mock
  VITE_USE_MOCK && vitePlugins.push(configMockPlugin(isBuild));

  // vite-plugin-purge-icons
  vitePlugins.push(purgeIcons());

  // rollup-plugin-visualizer
  vitePlugins.push(configVisualizerConfig());

  // vite-plugin-theme
  vitePlugins.push(configThemePlugin(isBuild));

  // The following plugins only work in the production environment
  if (isBuild) {
    // rollup-plugin-gzip
    vitePlugins.push(configCompressPlugin(VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE));
  }

  // //vite-plugin-theme【预编译加载插件，解决vite首次打开界面加载慢问题】
  // vitePlugins.push(PkgConfig());
  // vitePlugins.push(OptimizationPersist());
  return vitePlugins;
}
