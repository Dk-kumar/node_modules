/** @license MUI v5.6.1
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import scStyled from 'styled-components';
export default function styled(tag, options) {
  let stylesFactory;

  if (options) {
    stylesFactory = scStyled(tag).withConfig({
      displayName: options.label,
      shouldForwardProp: options.shouldForwardProp
    });
  } else {
    stylesFactory = scStyled(tag);
  }

  if (process.env.NODE_ENV !== 'production') {
    const fn = (...styles) => {
      const component = typeof tag === 'string' ? `"${tag}"` : 'component';

      if (styles.length === 0) {
        console.error([`MUI: Seems like you called \`styled(${component})()\` without a \`style\` argument.`, 'You must provide a `styles` argument: `styled("div")(styleYouForgotToPass)`.'].join('\n'));
      } else if (styles.some(style => style === undefined)) {
        console.error(`MUI: the styled(${component})(...args) API requires all its args to be defined.`);
      }

      return stylesFactory(...styles);
    };

    fn.withConfig = stylesFactory.withConfig;
    return fn;
  }

  return stylesFactory;
}
export { ThemeContext, keyframes, css } from 'styled-components';
export { default as StyledEngineProvider } from './StyledEngineProvider';
export { default as GlobalStyles } from './GlobalStyles';