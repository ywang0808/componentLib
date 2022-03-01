/** 路由页 - 真正意义上的根组件，已挂载到redux上，可获取store中的内容 **/

/** 所需的各种插件 **/
import React, {useEffect, useState} from "react";

import {
  Routes,
  Route,
  Navigate, useLocation, Link
} from "react-router-dom";

// antd的多语言
import {Breadcrumb, Layout} from "antd";
const { Header, Content, Footer, Sider } = Layout;
import Loadable from "react-loadable"; // 用于代码分割时动态加载模块

/** 普通组件 **/
import Menu from "../components/Menu";
import Loading from "@/components/loading"; // loading动画，用于动态加载模块进行中时显示
import "./index.less";


/** 下面是代码分割异步加载的方式引入各页面 webpackChunkName设置生成后的js名字 **/
const Home = Loadable({
  loader: () => import(/* webpackChunkName:'home' */ "@/pages/home"),
  loading: Loading, // 自定义的Loading动画组件
  timeout: 10000, // 可以设置一个超时时间(s)来应对网络慢的情况（在Loading动画组件中可以配置error信息）
});
const Test = Loadable({
  loader: () => import(/* webpackChunkName:'test' */ "@/pages/test"),
  loading: Loading,
});
const Page1 = Loadable({
  loader: () =>
    import(/* webpackChunkName:'testclass' */ "../pages/test/container/page1"),
  loading: Loading,
});
const Page2 = Loadable({
  loader: () =>
    import(/* webpackChunkName:'testclass' */ "../pages/test/container/page2"),
  loading: Loading,
});
const Page3 = Loadable({
  loader: () =>
    import(/* webpackChunkName:'testclass' */ "../pages/test/container/page3"),
  loading: Loading,
});
const NotFound = Loadable({
  loader: () => import(/* webpackChunkName:'notfound' */ "../pages/notfound"),
  loading: Loading,
});

const breadcrumbNameMap = {
  '/apps': 'Application List',
  '/apps/1': 'Application1',
  '/apps/2': 'Application2',
  '/apps/1/detail': 'Detail',
  '/apps/2/detail': 'Detail',
};


/** 组件 **/
export default function RootRouterContainer(props) {
  const [collapsed, setCollapsed] = useState(false); // 模态框隐藏和显示
  // 在组件加载完毕后触发
  useEffect(() => {
    // 可以手动在此预加载指定的模块：
    // Features.preload(); // 预加载Features页面
    // Test.preload(); // 预加载Test页面
    // 也可以直接预加载所有的异步模块
    // Loadable.preloadAll();
  }, []);

  /** 简单权限控制 路由守卫 **/
  function onEnter(Component) {
    // 例子：如果没有登录，直接跳转至login页
    // if (sessionStorage.getItem('userInfo')) {
    //   return Component;
    // } else {
    //   return <Redirect to='/login' />;
    // }
    return Component;
  }
  function onCollapse (collapsed)  {
    console.log(collapsed);
    setCollapsed(collapsed)
  };
  const location = useLocation();
  const pathSnippets = location.pathname.split('/').filter(i => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    return (
        <Breadcrumb.Item key={url}>
          <Link to={url}>{breadcrumbNameMap[url]}</Link>
        </Breadcrumb.Item>
    );
  });
  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/">Home</Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems);


  return (
      <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
              <Menu />
            </Sider>
            <Layout className="site-layout">
              <Header className="site-layout-background" style={{ padding: 0 }} />
              <Content style={{ margin: '0 16px' }}>
                {/*<Breadcrumb>{breadcrumbItems}</Breadcrumb>*/}
                <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                  <Routes>
                    <Route path="/" element={<Navigate replace to="/home" />} />
                    <Route path="/home" element={onEnter(<Home />)} />
                    <Route path="/test" element={onEnter(<Test />)}>
                      <Route path="page1" element={onEnter(<Page1 />)} />
                      <Route path="page2" element={onEnter(<Page2 />)} />
                      <Route path="page3" element={onEnter(<Page3 />)} />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </div>
              </Content>
              <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
      </Layout>



  );
}
