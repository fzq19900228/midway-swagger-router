import { Application, Router } from 'egg';
import { WrapperOptions } from './interface';
import swaggerHTML from './swagger-html';
import { swaggerJSON, apiObjects } from './swagger-json';

/**
 * swagger路由注册绑定
 * @param router
 * @param options
 */
const handleSwagger = (router: Router, options: WrapperOptions) => {
  const {
    // 声明json路由 (swagger)
    swaggerJsonEndpoint = '/swagger-json',
    // 声明html路由 (swagger)
    swaggerHtmlEndpoint = '/swagger-html',
    prefix = '',
  } = options;
  router.get(swaggerJsonEndpoint, async (ctx: any) => {
    const swaggerJson = swaggerJSON(options, apiObjects);
    ctx.body = swaggerJson;
  });
  router.get(swaggerHtmlEndpoint, async (ctx: any) => {
    ctx.body = swaggerHTML(
      `${prefix}${swaggerJsonEndpoint}`.replace('//', '/')
    );
  });
};

/**
 * swagger注册
 * @param app
 * @param options
 */
const wrapper = (app: Application, options?: WrapperOptions) => {
  // 参数配置
  const opts: WrapperOptions = {
    title: 'API DOC',
    description: 'API DOC',
    version: 'v1.0.0',
    prefix: '',
    swaggerJsonEndpoint: '/swagger-json',
    swaggerHtmlEndpoint: '/swagger-html',
    makeSwaggerRouter: false,
  };
  Object.assign(opts, options || {});
  const { router } = app;
  // 配置是否开启swagger
  if (app.config.swagger) {
    handleSwagger(router, opts);
  }
};

export { wrapper };
