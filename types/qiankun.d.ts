interface Window {
  /**
   * Qiankun 注入的全局变量，表示当前是否在微前端环境中
   */
  __POWERED_BY_QIANKUN__?: boolean;

  /**
   * Qiankun 注入的全局变量，用于子应用沙箱销毁时调用
   * 仅在 strictMode 模式下有效
   */
  __QIANKUN_DEVELOPMENT_INFO__?: {
    // 根据 Qiankun 实际注入的类型，这里可以更具体
    // 例如：
    // masterApp: string;
    // container: HTMLElement;
  };

  /**
   * Qiankun 注入的全局变量，用于子应用沙箱环境下获取原始的 fetch
   */
  __QIANKUN_ORIGIN_FETCH__?: typeof fetch;

  /**
   * Qiankun 注入的全局变量，用于子应用沙箱环境下获取原始的 window
   */
  __QIANKUN_WINDOW_ORIGIN_WINDOW__?: Window;

  // 如果你使用了qiankun的通信API，可能还需要声明以下类型
  // __QIANKUN_GLOBAL_STATE_CHANGE__?: (callback: (state: any, prevState: any) => void, fireImmediately?: boolean) => void;
  // __QIANKUN_SET_GLOBAL_STATE__?: (state: any) => void;
}
