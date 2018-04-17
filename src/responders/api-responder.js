import BaseResponder from 'core/base-responder';
import nx from 'next-js-core2';
import mixin from 'mixin-decorator';
import 'next-delete';
import controllers from 'controllers';

@mixin(controllers)
export default class extends BaseResponder{
  *doJob(){
    const { query } = this.$app.parameters;
    const { __cmd__ } = query;
    const data = nx.delete(query, ['__cmd__']);
    return yield this[__cmd__](data);
  }
}
