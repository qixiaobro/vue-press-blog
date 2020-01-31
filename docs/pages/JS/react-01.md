## react项目创建与配置

1. 使用以下代码创建项目
```javascript
npx create-react-app 项目名
```

2. 安装```styled-components```  
[styled-components](https://styled-components.com/)能够让我们在js文件里编写css代码
```javascript
npm install --save styled-components
```

3. 重置浏览器样式  
在```src```目录下新建```style.js```文件,在文件中引入```styled-components```
```javascript
import {createGlobalStyle} from 'styled-components'
```
并添加以下重置浏览器样式代码
```javascript
export const GlobalStyled = createGlobalStyle `
    /* http://meyerweb.com/eric/tools/css/reset/ 
    v2.0 | 20110126
    License: none (public domain)
    */

    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed, 
    figure, figcaption, footer, header, hgroup, 
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure, 
    footer, header, hgroup, menu, nav, section {
        display: block;
    }
    body {
        line-height: 1;
    }
    ol, ul {
        list-style: none;
    }
    blockquote, q {
        quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }
`
```
在```App.js```文件中引入```style.js```文件，并作为组建标签在最外层```div```标签内使用
```javascript
  return (
      <div>
        <GlobalStyled/>
         //其它code
      </div>
  );
```

4. 安装```redux```  
[redux](https://www.redux.org.cn/)是 JavaScript 状态容器，提供可预测化的状态管理。
```javascript
npm install --save redux
```
推荐以下引入附加包
```javascript
npm install --save react-redux//能够派发store、props、dispatch等
npm install --save-dev redux-devtools//调试工具
```

5. 创建```store```  
在```src```文件夹下创建```store```文件夹，在文件夹内创建```index.js```文件

