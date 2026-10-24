import * as stylex from '@stylexjs/stylex';
import {reproConsts} from './reproConsts.stylex';

const styles = stylex.create({
  root: {transitionProperty: {default: 'color', [reproConsts.touch]: 'none'}},
});

export function MediaKeyConsumer() {
  return <div {...stylex.props(styles.root)}>media key</div>;
}
