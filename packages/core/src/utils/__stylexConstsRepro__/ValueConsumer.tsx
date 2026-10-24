import * as stylex from '@stylexjs/stylex';
import {reproConsts} from './reproConsts.stylex';

const styles = stylex.create({
  root: {minHeight: reproConsts.rowHeight},
});

export function ValueConsumer() {
  return <div {...stylex.props(styles.root)}>value</div>;
}
